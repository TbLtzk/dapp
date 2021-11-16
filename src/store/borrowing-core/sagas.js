import { put, takeEvery, call, select } from 'redux-saga/effects'
import ErrorHandler from 'func/ErrorHandler'
import * as actionTypes from './action-types'

import { addCoinsToMetamask } from 'contracts/helpers/borrowing-core-helper'
import { getBorrowingCoreInstance } from 'contracts/contract-instance'
import { setShoulAddCoins } from './action-creators'
import { setErrorMessage, setTransactionCounter } from 'store/transaction-handler/action-creators'

function * setAddCoinsToMetamaskGenerator () {
  try {
    yield put(setTransactionCounter(1))
    yield call(addCoinsToMetamask)
    yield put(setShoulAddCoins())
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
