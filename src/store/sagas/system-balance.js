import { put, select, takeEvery } from 'redux-saga/effects'
import * as actionTypes from 'store/actions/action-types/system-balance'
import {
  getDebtError, getDebtSuccess,
  getSurplusError, getSurplusSuccess,
  getSystemBalanceError, getSystemBalanceSuccess,
  onPerformNettingSuccess, onPerformNettingError
} from 'store/actions/action-creaters/system-balance'

import SystemBalance from 'contracts/src/SystemBalance'

function * getSurplus () {
  try {
    const contract = new SystemBalance()
    const data = yield contract.getSurplus()

    yield put(getSurplusSuccess(data))
  } catch (err) {
    console.error('getSurplus.Error', err)
    yield put(getSurplusError(0))
  }
}

function * getDebt () {
  try {
    const contract = new SystemBalance()
    const data = yield contract.getDebt()

    yield put(getDebtSuccess(data))
  } catch (err) {
    console.error('getDebt.Error', err)
    yield put(getDebtError(0))
  }
}

function * getSystemBalance () {
  try {
    const contract = new SystemBalance()
    const data = yield contract.getBalance()

    yield put(getSystemBalanceSuccess(data))
  } catch (err) {
    console.error('getSystemBalance.Error', err)
    yield put(getSystemBalanceError(0))
  }
}

function * onPerformNetting () {
  try {
    const { userAddress } = yield select(state => state.userInf)
    const contract = new SystemBalance()
    const data = yield contract.performNetting(userAddress)

    yield put(onPerformNettingSuccess(data))
  } catch (err) {
    console.error('onPerformNetting.Error', err)
    yield put(onPerformNettingError(err))
  }
}

export default [
  takeEvery(actionTypes.GET_SURPLUS, getSurplus),
  takeEvery(actionTypes.GET_DEBT, getDebt),
  takeEvery(actionTypes.GET_SYSTEM_BALANCE, getSystemBalance),
  takeEvery(actionTypes.ON_PERFORM_NETTING, onPerformNetting)
]
