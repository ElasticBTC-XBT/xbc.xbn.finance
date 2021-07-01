import { getXBCAllowance, getXBCBalanceForAddress, approveLS } from '@/libs/moonrat'

export const LastSurvivor = {
  address: process.env.VUE_APP_LS_CONTRACT_ADDRESS,
  jsonInterface: require('../assets/contracts/LastSurvivor.json')
}

export const LastSurvivorLiquidityPool = {
  jsonInterface: require('../assets/contracts/PancakePair.json')
}

const GasLimit = 1500000

export const getLastSurvivorContract = async(web3Client) => {
  const accounts = await web3Client.eth.getAccounts()
  return new web3Client.eth.Contract(
    LastSurvivor.jsonInterface.abi,
    LastSurvivor.address,
    {
      gas: GasLimit,
      from: accounts[0]
    }
  )
}

export const getLastSurvivorPoolContract = async(web3Client) => {
  const accounts = await web3Client.eth.getAccounts()
  // const contract = await getLastSurvivorContract(web3Client)
  // const pairContractAddress = await contract.methods.pancakePair().call()
  const pairContractAddress = '0x21465f97adF0d080D298a8BB498fA4373d811233' // XBC BUSD pool

  return new web3Client.eth.Contract(
    LastSurvivorLiquidityPool.jsonInterface.abi,
    pairContractAddress,
    {
      gas: 100000,
      from: accounts[0]
    }
  )
}

// export const getLastSurvivorAirdropBalance = async(web3Client) => {
//   const contract = await getLastSurvivorContract(web3Client)
//   const balance = await contract.methods.balanceOf(LastSurvivorAirdrop.address).call()
//   const decimals = await contract.methods.decimals().call()
//   return balance / (10 ** decimals)
// }
//
// export const getLastSurvivorBalance = async(web3Client) => {
//   const accounts = await web3Client.eth.getAccounts()
//   const contract = await getLastSurvivorContract(web3Client)
//   const balance = await contract.methods.balanceOf(accounts[0]).call()
//   return Number(web3Client.utils.fromWei(balance.toString(), 'gwei'))
// }

export const getLastSurivorInfo = async(web3Client) => {
  // const accounts = await web3Client.eth.getAccounts()

  const contract = await getLastSurvivorContract(web3Client)
  const poolContract = await getLastSurvivorPoolContract(web3Client)

  const reserves = await poolContract.methods.getReserves().call()

  const lastBidTime = await contract.methods.lastBidTime().call()
  const lastBidder = await contract.methods.lastBidder().call()
  const collapseDelay = await contract.methods.collapseDelay().call()
  // const estimatedBNBReward = await contract.methods.calculateBNBReward(accounts[0]).call()
  // const rewardCycleBlock = await contract.methods.rewardCycleBlock().call()
  const lsPool = await getXBCBalanceForAddress(web3Client, LastSurvivor.address) / Math.pow(10,9)

  const {
    '0': xbcBalance, '1': busdBalance
  } = reserves

  const lsPoolUSD = (lsPool * busdBalance / xbcBalance / Math.pow(10, 9)).toFixed(3)
  // lsPoolUSD = Number(web3Client.utils.fromWei(lsPoolUSD.toString(), 'gwei'))

  // const rate = xbcBalance / busdBalance

  // console.log('lsPoolUSD')
  // console.log(lsPoolUSD)

  return {
    lastBidTime: Number(lastBidTime) * 1000,
    lastBidder: lastBidder,
    collapseDelay: collapseDelay,
    lsPool: lsPool,
    lsPoolUSD: lsPoolUSD

  }
}

export const participateLS = async(web3Client, using_xbc = true) => {
  const contract = await getLastSurvivorContract(web3Client)
  if (using_xbc) {
    const accounts = await web3Client.eth.getAccounts()
    const playAmount = Math.round(await getXBCBalanceForAddress(web3Client, LastSurvivor.address) * 0.013) // 1.3%

    const allowance = await getXBCAllowance(web3Client, accounts[0])
    console.info(`allowance ${allowance}`)

    if (allowance < playAmount) {
      // approveS
      console.info('start approve')
      const tx = await approveLS(web3Client, playAmount * 10)
      console.info(`end approve ${tx}`)
    }

    const ptx = await contract.methods.participate(playAmount.toString()).send({
      gas: GasLimit
    })
    console.info(`participatee ${ptx}`)
  } else {
    await contract.methods.participate(0).send({
      gas: GasLimit,
      value: web3Client.utils.toWei('0.00011', 'ether') + 1
    })
  }
}

const subscribeEventChange = async(web3Client, eventName, callback) => {
  const dealerContract = await getLastSurvivorContract(web3Client)

  const eventJsonInterface = web3Client.utils._.find(
    dealerContract._jsonInterface,
    o => o.name === eventName && o.type === 'event'
  )

  console.log(dealerContract._jsonInterface)
  console.log(eventJsonInterface)

  const subscription = web3Client.eth.subscribe('logs', {
    address: LastSurvivor.address,
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
