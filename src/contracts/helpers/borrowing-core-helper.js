import {
  getBorrowingCoreInstance, getSavingInstance, getStableCoinInstance,
  getCompoundRateKeeperBorrowingInstance,
  getCompoundRateKeeperSavingInstance,
  getGovernedEpdrQbtcAddressInstance
} from 'contracts/contract-instance'

import { fromWei } from 'func/balance'
import { remainDateTimeSince } from 'func/convertDate'
import ErrorHandler from 'func/ErrorHandler'
import { BN, uintPerSecondToPerYearNumber } from 'func/useful'
import { setErrorMessage } from 'store/transaction-handler/action-creators'

export async function addCoinsToMetamask () {
  const getAddressQUSD = await getStableCoinInstance()
  const getAddressQBTC = await getGovernedEpdrQbtcAddressInstance()
  const tokenAddressQUSD = getAddressQUSD.address

  const tokenSymbolQUSD = 'QUSD'
  const tokenAddressQBTC = getAddressQBTC._address
  const tokenSymbolQBTC = 'QBTC'
  const tokenDecimals = 18

  const QUSD = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddressQUSD,
        symbol: tokenSymbolQUSD,
        decimals: tokenDecimals
      }
    }
  })
  const QBTC = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddressQBTC,
        symbol: tokenSymbolQBTC,
        decimals: tokenDecimals
      }
    }
  })
  return Promise.all([QUSD, QBTC])
}

export async function getOutstandingDebtHelper (userAddress, userVaultsCount, contract) {
  const promises = []

  for (let i = 0; i < Number(userVaultsCount); i++) {
    promises[i] = await contract.getVaultStats(userAddress, i)
  }

  const vaultStats = await Promise.all(promises)

  const amount = vaultStats.reduce((sum, item) => sum.plus(BN(item?.stcStats?.outstandingDebt)), BN(0))

  return fromWei(amount.toFixed())
}

export async function getTotalCollateralLockedHelper (userAddress, userVaultsCount, contract) {
  const vaultsLoc = []
  if (userVaultsCount > 0) {
    for (let i = 0; i < userVaultsCount; i += 1) {
      const vaultInfo = await contract.getVaultStats(userAddress, i)
      const balance = vaultInfo?.colStats?.balance ? vaultInfo.colStats.balance / 10 ** 8 : 0
      const price = vaultInfo?.colStats?.price ? fromWei(vaultInfo.colStats.price) : 0
      const collLock = balance * price
      vaultsLoc.push(collLock)
    }
    if (vaultsLoc.length > 0) {
      const totalValue = vaultsLoc.reduce((acc, curr) => acc + curr)
      return totalValue
    } else {
      return 0
    }
  } else {
    return 0
  }
}

export function getBalanceDetailsHelper (balanceDetails) {
  const rate = uintPerSecondToPerYearNumber(balanceDetails.interestRate)

  return [
    {
      depositAsset: 'QUSD',
      interestAsset: 'QUSD',
      rate: rate
    }
  ]
}

export async function getBorrowingVaultsHelper (userAddress, userVaultsCount, contract) {
  const count = new Array(Number(userVaultsCount)).fill('')
  const vaults = await Promise.all(count.map((i, index) => getAdditionalData(index, contract, userAddress)))
  return vaults
}

async function getAdditionalData (index, contract, userAddress) {
  const res = await Promise.all([
    await contract.userVaults(userAddress, index),
    await contract.getVaultStats(userAddress, index)
  ])
  const fee = res[1]?.stcStats?.borrowingFee ? uintPerSecondToPerYearNumber(res[1]?.stcStats?.borrowingFee) : 0
  const vaultInfo = res[0]
  vaultInfo.borrowingFee = fee
  vaultInfo.vaultNum = index
  return vaultInfo
}

export async function getTimeSinceRefreshBalance (setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance) {
  try {
    const contract = await getCompoundRateKeeperSavingInstance()
    const res = await contract.getLastUpdate()
    setTimeSinceUnixTimestampRefreshBalance(res)
    const transformTime = remainDateTimeSince(res)
    setTimeSinceRefreshBalance(transformTime)
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export async function refreshTimeSinceRefreshBalance (
  setTimeSinceRefreshBalance,
  setLoading,
  setTimeSinceUnixTimestampRefreshBalance,
  userAddress,
  dispatch
) {
  try {
    setLoading(true)
    const contract = await getSavingInstance()
    const res = await contract.updateCompoundRate({ from: userAddress, gasBuffer: 1.2 })
    if (res) {
      getTimeSinceRefreshBalance(setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance)
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    dispatch(setErrorMessage(errorMsg))
  } finally {
    setLoading(false)
  }
}

export async function getTimeSinceOutstandingDebt (setTimeSinceOutstandingDeb, setTimeSinceUnixTimestampOutstandingDeb) {
  try {
    const contract = await getCompoundRateKeeperBorrowingInstance()
    const res = await contract.getLastUpdate()
    setTimeSinceUnixTimestampOutstandingDeb(res)
    const transformTime = remainDateTimeSince(res)
    setTimeSinceOutstandingDeb(transformTime)
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export async function refreshTimeSinceOutstandingDebt (
  setTimeSinceRefreshBalance,
  setLoading,
  setTimeSinceUnixTimestampRefreshBalance,
  userAddress,
  dispatch
) {
  try {
    setLoading(true)
    const contract = await getBorrowingCoreInstance()
    const res = await contract.updateCompoundRate('QBTC', { from: userAddress, gasBuffer: 1.2 })
    if (res) {
      getTimeSinceOutstandingDebt(setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance)
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    dispatch(setErrorMessage(errorMsg))
  } finally {
    setLoading(false)
  }
}
