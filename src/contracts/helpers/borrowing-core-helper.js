import { ethereum } from 'components/Custom/LoadingMetaMask/LoadingMetaMask'
import {
  getBorrowingCoreInstance,
  getSavingInstance,
  getStableCoinInstance,
  getCompoundRateKeeperBorrowingInstance,
  getCompoundRateKeeperSavingInstance,
  getGovernedEpdrQbtcAddressInstance
} from 'contracts/contract-instance'

import { fromWei } from 'func/balance'
import { remainDateTimeSince } from 'func/convertDate'
import ErrorHandler from 'func/ErrorHandler'
import { BN, uintPerSecondToPerYearNumber } from 'func/useful'
import { setErrorMessage } from 'store/transaction-handler/action-creators'

export async function addQBTCToken (setQbtcToken) {
  const { _address } = await getGovernedEpdrQbtcAddressInstance()
  ethereum
    .request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: _address,
          symbol: 'QBTC',
          decimals: 18
        }
      }
    })
    .then((result) => {
      if (result) {
        localStorage.setItem('qbtcTokenAdded', '0')
        setQbtcToken('0')
      }
    })
}

export async function addQUSDToken (setQusdToken) {
  const { address } = await getStableCoinInstance()

  ethereum
    .request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: address,
          symbol: 'QUSD',
          decimals: 18
        }
      }
    })
    .then((result) => {
      if (result) {
        localStorage.setItem('qusdTokenAdded', '0')
        setQusdToken('0')
      }
    })
}

export function getOutstandingDebtHelper (vaultsStats) {
  const amount = vaultsStats.reduce((sum, item) => sum.plus(BN(item?.stcStats?.outstandingDebt)), BN(0))
  return fromWei(amount.toFixed())
}

export function getTotalCollateralLockedHelper (vaultsStats) {
  if (!vaultsStats.length) {
    return '0'
  } else {
    const vaultsLoc = vaultsStats.map((vaultInfo) => {
      const balance = vaultInfo?.colStats?.balance ? vaultInfo.colStats.balance / 10 ** 8 : 0
      const price = vaultInfo?.colStats?.price ? fromWei(vaultInfo.colStats.price) : 0
      const collLock = balance * price
      return collLock
    })
    if (vaultsLoc.length > 0) {
      const totalValue = vaultsLoc.reduce((acc, curr) => acc + curr)
      return totalValue.toString()
    } else {
      return '0'
    }
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

export async function generateVaultData (contract, userAddress, vault, vaultNum) {
  const vaultStats = await contract.getVaultStats(userAddress, vaultNum)
  const borrowingFee = uintPerSecondToPerYearNumber(vaultStats.stcStats.borrowingFee)
  return { ...vault, vaultNum, borrowingFee }
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
    await contract.updateCompoundRate({ from: userAddress, gasBuffer: 1.2 })
    getTimeSinceRefreshBalance(setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance)
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
    await contract.updateCompoundRate('QBTC', { from: userAddress, gasBuffer: 1.2 })
    getTimeSinceOutstandingDebt(setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance)
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    dispatch(setErrorMessage(errorMsg))
  } finally {
    setLoading(false)
  }
}
