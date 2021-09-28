import { put, takeEvery, call, select } from 'redux-saga/effects'
import ErrorHandler from 'func/ErrorHandler'
import * as actionTypes from 'store/actions/action-types/borrowing-core'
import { setErrorMessage, setTransactionCounter } from 'store/actions/action-creaters/transaction-handler'

import { getBorrowingCoreInstance } from 'contracts/contract-instance'

let checkCoins =
  !localStorage.getItem('shouldAddCoin') || Boolean(JSON.parse(localStorage.getItem('shouldAddCoin')))

const shouldAutomaticAddCoin = () => {
  localStorage.setItem('shouldAddCoin', false)
  checkCoins = false
}

async function addCoins () {
  const tokenAddressQUSD = '0xdC98b08363f3BfC73195dc6b532e39C51EC3c3bC'
  const tokenSymbolQUSD = 'QUSD'
  const tokenAddressQBTC = '0x1115Ab7257e47Ef97Ea0E8254E999a8be8981952'
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
  return Promise.all([await QUSD, await QBTC])
}

function * setAddCoinsToMetamaskGenerator () {
  try {
    if (checkCoins) {
      yield put(setTransactionCounter(1))
      yield call(shouldAutomaticAddCoin)
      yield call(addCoins)
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

function * setCreateQBTCVaultGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getBorrowingCoreInstance)
    yield contract.createVault('QBTC', { from: userAddress })
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

export default [
  takeEvery(actionTypes.SET_CREATE_QBTC_VAULT, setCreateQBTCVaultGenerator),
  takeEvery(actionTypes.SET_ADD_COINS_TO_METAMASK, setAddCoinsToMetamaskGenerator)
]
