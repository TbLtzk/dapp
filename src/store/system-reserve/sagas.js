import { put, takeEvery } from 'redux-saga/effects'
import * as actionTypes from './action-types'

import {
  getAvailableAmountSuccess, getAvailableAmountError
} from './action-creators'

import SystemReserve from 'contracts/src/SystemReserve'
import ErrorHandler from 'func/ErrorHandler'

function * getAvailableAmount () {
  try {
    const contract = new SystemReserve()
    const data = yield contract.availableAmount()

    yield put(getAvailableAmountSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getAvailableAmountError(0))
  }
}

export default [
  takeEvery(actionTypes.GET_AVAILABLE_AMOUNT, getAvailableAmount)
]
