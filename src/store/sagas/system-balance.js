import { put, select, takeEvery, call } from 'redux-saga/effects'
import * as actionTypes from 'store/actions/action-types/system-balance'
import {
  getDebtError, getDebtSuccess,
  getSurplusError, getSurplusSuccess,
  getSystemBalanceError, getSystemBalanceSuccess,
  onPerformNettingSuccess, onPerformNettingError
} from 'store/actions/action-creaters/system-balance'
import { getSystemBalanceInstance } from 'contracts/contract-instance'
import ErrorHandler from 'func/ErrorHandler'
import { fromWei } from 'func/balance'

function * getSurplusGenerator () {
  try {
    const contract = yield call(getSystemBalanceInstance)
    const data = yield contract.getSurplus()
    yield put(getSurplusSuccess(fromWei(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getSurplusError(0))
  }
}

function * getDebtGenerator () {
  try {
    const contract = yield call(getSystemBalanceInstance)
    const data = yield contract.getDebt()
    yield put(getDebtSuccess(fromWei(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getDebtError(0))
  }
}

function * getSystemBalanceGenerator () {
  try {
    const contract = yield call(getSystemBalanceInstance)
    const data = yield contract.getBalance()
    yield put(getSystemBalanceSuccess(fromWei(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getSystemBalanceError(0))
  }
}

function * onPerformNettingGenerator () {
  try {
    const { userAddress } = yield select(state => state.userInf)
    const contract = yield call(getSystemBalanceInstance)
    const data = yield contract.instance.methods.performNetting().send({ from: userAddress })
    yield put(onPerformNettingSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(onPerformNettingError(error))
  }
}

export default [
  takeEvery(actionTypes.GET_SURPLUS, getSurplusGenerator),
  takeEvery(actionTypes.GET_DEBT, getDebtGenerator),
  takeEvery(actionTypes.GET_SYSTEM_BALANCE, getSystemBalanceGenerator),
  takeEvery(actionTypes.ON_PERFORM_NETTING, onPerformNettingGenerator)
]
