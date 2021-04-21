import { MoonRatAirdrop } from './moonrat-airdrop'

export const MoonRat = {
  address: process.env.VUE_APP_MOONRAT_CONTRACT_ADDRESS,
  jsonInterface: require('../assets/contracts/MoonRatToken.json')
}

export const MoonRatLiquidityPool = {
  jsonInterface: require('../assets/contracts/PancakePair.json')
}

const GasLimit = 1000000

export const getMoonRatContract = async(web3Client) => {
  const accounts = await web3Client.eth.getAccounts()
  return new web3Client.eth.Contract(
    MoonRat.jsonInterface.abi,
    MoonRat.address,
    {
      gas: GasLimit,
      from: accounts[0]
    }
  )
}

export const getMoonRatPoolContract = async(web3Client) => {
  const accounts = await web3Client.eth.getAccounts()
  const contract = await getMoonRatContract(web3Client)
  const pairContractAddress = await contract.methods.pancakePair().call()

  return new web3Client.eth.Contract(
    MoonRatLiquidityPool.jsonInterface.abi,
    pairContractAddress,
    {
      gas: 100000,
      from: accounts[0]
    }
  )
}

export const getMoonRatAirdropBalance = async(web3Client) => {
  const contract = await getMoonRatContract(web3Client)
  const balance = await contract.methods.balanceOf(MoonRatAirdrop.address).call()
  const decimals = await contract.methods.decimals().call()
  return balance / (10 ** decimals)
}

export const getMoonRatBalance = async(web3Client) => {
  const accounts = await web3Client.eth.getAccounts()
  const contract = await getMoonRatContract(web3Client)
  const balance = await contract.methods.balanceOf(accounts[0]).call()
  return Number(web3Client.utils.fromWei(balance.toString(), 'gwei'))
}

export const getContractInfo = async(web3Client) => {
  const accounts = await web3Client.eth.getAccounts()

  const contract = await getMoonRatContract(web3Client)
  const poolContract = await getMoonRatPoolContract(web3Client)

  const maxTXAmount = await contract.methods._maxTxAmount().call()
  const reserves = await poolContract.methods.getReserves().call()

  const nextAvailableClaimDate = await contract.methods.nextAvailableClaimDate(accounts[0]).call()
  const estimatedBNBReward = await contract.methods.calculateBNBReward(accounts[0]).call()
  const rewardCycleBlock = await contract.methods.rewardCycleBlock().call()
  const bnbRewardPool = await web3Client.eth.getBalance(MoonRat.address)

  const {
    '0': mratBalance, '1': bnbBalance, '2': timeStamp
  } = reserves

  const rate = bnbBalance / mratBalance
  const maxBNBAmount = (rate * maxTXAmount).toFixed(0)

  return {
    mratBalance: Number(web3Client.utils.fromWei(mratBalance.toString(), 'gwei')),
    maxTxAmount: Number(web3Client.utils.fromWei(maxTXAmount.toString(), 'gwei')),
    bnbBalance: Number(web3Client.utils.fromWei(bnbBalance.toString(), 'ether')),
    maxBNBAmount: Number(web3Client.utils.fromWei(maxBNBAmount.toString(), 'ether')),
    timeStamp: Number(timeStamp) * 1000,
    nextAvailableClaimDate: Number(nextAvailableClaimDate) * 1000,
    estimatedBNBReward: Number(web3Client.utils.fromWei(estimatedBNBReward.toString(), 'ether')) || 0,
    rewardCycleBlock: Number(rewardCycleBlock) * 1000,
    bnbInPool: Number(web3Client.utils.fromWei(bnbRewardPool.toString(), 'ether')) || 0
  }
}

export const claimBNBReward = async(web3Client) => {
  const contract = await getMoonRatContract(web3Client)
  await contract.methods.claimBNBReward().send({
    gas: GasLimit
  })
}

export const disruptiveTransfer = async(web3Client, recipient, amount) => {
  const contract = await getMoonRatContract(web3Client)
  return contract.methods.disruptiveTransfer(
    recipient.toString(),
    web3Client.utils.toWei(amount.toString(), 'gwei')
  ).send({
    gas: GasLimit,
    value: web3Client.utils.toWei('2', 'ether')
  })
}

const subscribeEventChange = async(web3Client, eventName, callback) => {
  const dealerContract = await getMoonRatContract(web3Client)

  const eventJsonInterface = web3Client.utils._.find(
    dealerContract._jsonInterface,
    o => o.name === eventName && o.type === 'event'
  )

  console.log(dealerContract._jsonInterface)
  console.log(eventJsonInterface)

  const subscription = web3Client.eth.subscribe('logs', {
    address: MoonRat.address,
    topics: [eventJsonInterface.signature]
    // eslint-disable-next-line handle-callback-err
  }, function(error, result) {
    const eventObj = web3Client.eth.abi.decodeLog(
      eventJsonInterface.inputs,
      result.data,
      result.topics.slice(1)
    )

    // console.log(`New ${eventName}!`, eventObj)
    if (typeof callback === 'function') callback(eventObj)
  })

  return () => subscription.unsubscribe()
}

export const subscribeClaimBNBSuccessfully = (web3Client, callback) => {
  return subscribeEventChange(web3Client, 'ClaimBNBSuccessfully', (eventObj) => {
    callback(parseClaimBNBData(web3Client, eventObj))
  })
}

export const parseClaimBNBData = (web3Client, eventObj) => {
  const {
    '0': recipient, '1': ethReceived, '2': nextAvailableClaimDate
  } = eventObj

  return {
    recipient: recipient,
    ethReceived: Number(web3Client.utils.fromWei(ethReceived.toString(), 'ether')),
    nextAvailableClaimDate: Number(nextAvailableClaimDate) * 1000
  }
}
