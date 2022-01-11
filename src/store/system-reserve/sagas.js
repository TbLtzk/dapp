import { put, takeEvery, call } from 'redux-saga/effects'
import * as actionTypes from './action-types'
import { getAvailableAmountSuccess, getAvailableAmountError, setSystemReserveBalance } from './action-creators'

import ErrorHandler from 'func/ErrorHandler'
import { fromWei } from 'func/balance'
import { BN, fN } from 'func/useful'
import { getSystemReserveInstance } from 'contracts/contract-instance'

function * getSystemReserveBalanceGenerator () {
  try {
    const contract = yield call(getSystemReserveInstance)
    const balance = yield window.web3.eth.getBalance(contract.address)
    let transf = fromWei(balance)
    transf = fN(BN(transf).toFixed())
    yield put(setSystemReserveBalance(transf))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getAvailableAmountGenerator () {
  try {
    const contract = yield call(getSystemReserveInstance)
    const data = yield contract.availableAmount()
    yield put(getAvailableAmountSuccess(fN(fromWei(data))))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getAvailableAmountError(0))
  }
}

export default [
  takeEvery(actionTypes.GET_AVAILABLE_AMOUNT, getAvailableAmountGenerator),
  takeEvery(actionTypes.GET_SYSTEM_RESERVE_BALANCE, getSystemReserveBalanceGenerator)
]
