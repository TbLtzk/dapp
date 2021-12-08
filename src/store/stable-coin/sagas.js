import { put, takeEvery, call } from 'redux-saga/effects'
import * as actionTypes from './action-types'
import { getAllowanceSuccess, getSymbolSuccess } from './action-creators'

import ErrorHandler from 'func/ErrorHandler'
import { getStableCoinInstance } from 'contracts/contract-instance'

function * getAllowance ({ userAddress, contractAddress }) {
  try {
    const contract = yield call(getStableCoinInstance)
    const data = yield contract.allowance(userAddress, contractAddress)

    yield put(getAllowanceSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getSymbol () {
  try {
    const contract = yield call(getStableCoinInstance)
    const data = yield contract.symbol()
    yield put(getSymbolSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [takeEvery(actionTypes.GET_ALLOWANCE, getAllowance), takeEvery(actionTypes.GET_SYMBOL, getSymbol)]
