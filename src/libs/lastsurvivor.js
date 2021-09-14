import { getXBCAllowance, getXBCBalanceForAddress, approveLS } from '@/libs/moonrat'

export const LastSurvivor = {
  address: process.env.VUE_APP_LS_CONTRACT_ADDRESS,
  jsonInterface: require('../assets/contracts/LastSurvivor.json')
}

export const XBC = {
  address: process.env.VUE_APP_XBC_CONTRACT_ADDRESS || '0x0321394309CaD7E0E424650844c3AB3b659315d3',
  jsonInterface: require('../assets/contracts/XBCToken.json')
}

export const XBCMigration = {
  address: process.env.VUE_APP_XBCMigration_CONTRACT_ADDRESS || '0x77C6BB15eac53C710964b19911A59DA473412847',
  jsonInterface: require('../assets/contracts/XbcMigration.json')
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

export const getXBCMigrationContract = async(web3Client) => {
  const accounts = await web3Client.eth.getAccounts()
  return new web3Client.eth.Contract(
    XBCMigration.jsonInterface.abi,
    XBCMigration.address,
    {
      gas: GasLimit,
      from: accounts[0]
    }
  )
}

export const getXBCContract = async(web3Client) => {
  const accounts = await web3Client.eth.getAccounts()
  return new web3Client.eth.Contract(
    XBC.jsonInterface.abi,
    XBC.address,
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
export const getXBCBNBPoolContract = async(web3Client) => {
  const accounts = await web3Client.eth.getAccounts()
  // const contract = await getLastSurvivorContract(web3Client)
  // const pairContractAddress = await contract.methods.pancakePair().call()
  const pairContractAddress = '0x22dbeC803129009931Bc18a9AEf034510Ce88a51' // XBC BNB pool

  return new web3Client.eth.Contract(
    LastSurvivorLiquidityPool.jsonInterface.abi,
    pairContractAddress,
    {
      gas: 100000,
      from: accounts[0]
    }
  )
}

export const getLastSurivorInfo = async(web3Client) => {
  // const accounts = await web3Client.eth.getAccounts()

  const contract = await getLastSurvivorContract(web3Client)
  const poolContract = await getLastSurvivorPoolContract(web3Client)

  const lastBidTime = await contract.methods.lastBidTime().call()
  const lastBidder = await contract.methods.lastBidder().call()
  const collapseDelay = await contract.methods.collapseDelay().call()
  // const estimatedBNBReward = await contract.methods.calculateBNBReward(accounts[0]).call()
  // const rewardCycleBlock = await contract.methods.rewardCycleBlock().call()
  const lsPool = await getXBCBalanceForAddress(web3Client, LastSurvivor.address) / Math.pow(10, 9)

  const reserves = await poolContract.methods.getReserves().call()

  const {
    '0': xbcBalance, '1': busdBalance
  } = reserves
  const lsPoolUSD = (lsPool * busdBalance / xbcBalance / Math.pow(10, 9)).toFixed(3)

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
  let playAmount = Math.round(await getXBCBalanceForAddress(web3Client, LastSurvivor.address) * 0.013) // 1.3%
  if (playAmount < 1000000000 * Math.pow(10, 9)) {
    playAmount = 1000000000 * Math.pow(10, 9)
  }
  if (using_xbc) {
    const accounts = await web3Client.eth.getAccounts()

    const allowance = await getXBCAllowance(web3Client, accounts[0])
    console.info(`allowance ${allowance}`)

    if (allowance < playAmount * 5) {
      // approveS
      console.info('start approve')
      const tx = await approveLS(web3Client, (playAmount * 10).toString())
      console.info(`end approve ${tx}`)
    }
    console.info(`playAmount ${playAmount} XBC`)
    const ptx = await contract.methods.participate(playAmount.toString()).send({
      gas: GasLimit
    })
    console.info(`participatee ${ptx}`)
  } else {
    const poolBNBContract = await getXBCBNBPoolContract(web3Client)
    const reservesBNB = await poolBNBContract.methods.getReserves().call()
    const {
      '0': xbcBNBBalance, '1': BNBBalance
    } = reservesBNB

    const amountBNB = Math.round(playAmount * BNBBalance / xbcBNBBalance)
    console.info(`amountBNB ${amountBNB}`)

    await contract.methods.participate(0).send({
      gas: GasLimit,
      value: amountBNB.toString()
    })
  }
}

export const claimLS = async(web3Client) => {
  const contract = await getLastSurvivorContract(web3Client)

  await contract.methods.claimReward().send({
    gas: GasLimit
  })
}

export const _migrateXBC = async(web3Client) => {
  const contract = await getXBCMigrationContract(web3Client)
  const XBCContract = await getXBCContract(web3Client)
  const accounts = await web3Client.eth.getAccounts()

  const allowance = await XBCContract.methods.allowance(accounts[0], XBCMigration.address).call()
  const amount = 1000 * 10 ** 9 * 10 ** 9

  if (BigInt(allowance) < amount) {
    await XBCContract.methods.approve(XBCMigration.address, web3Client.utils.toWei('1000000', 'ether')).send({
      gas: 100000
    })
  }

  let _gasLimit = GasLimit
  try {
    _gasLimit = await contract.methods.migrate().estimateGas({gas : GasLimit * 10 })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }

  await contract.methods.migrate().send({
    gas: _gasLimit * 2
  })
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
