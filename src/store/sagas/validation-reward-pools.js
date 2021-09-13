/* eslint-disable */
import { put, takeEvery } from 'redux-saga/effects'
import * as actionTypes from 'store/actions/action-types/validation-reward-pools'

import { setError, setBalance, getVRPBalanceSuccess } from 'store/actions/action-creaters/validation-reward-pools'
import ValidationRewardPools from 'contracts/src/ValidationRewardPools'
import ErrorHandler from 'func/ErrorHandler'

import { getValidationRewardPoolsInstance } from 'contracts/contract-instance'

function * setDelegatorsShareGenerator ({ address, uintPercent }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance)
    const data = yield contract.setDelegatorsShare(address, uintPercent)
    if (data.status === true) {
      yield put(getDelegatorsShare(address))
    }
  } catch (err) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setError(err.message))
  }
}

function * getInterestRateGenerator ({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance)
    const data = yield contract.getInterestRate(address)
    yield put(setInterestRate(data))
  } catch (err) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setError(err.message))
  }
}

function * getDelegatorsShareGenerator ({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance)
    const data = yield contract.getDelegatorsShare(address)
    yield put(setDelegatorsShare(data))
  } catch (err) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setError(err.message))
  }
}

function * getBalanceGenerator ({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance)
    const data = yield contract.getBalance(address)
    yield put(setBalance(data))
    yield put({ type: actionTypes.SET_VRP_DATA_IS_LOADED })
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setError(error.message))
  }
}

function * getBalanceDashboard ({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance)
    const data = yield contract.getBalance(address)
    yield put(getVRPBalanceSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [
  takeEvery(actionTypes.GET_VRP_BALANCE, getBalanceGenerator),
  takeEvery(actionTypes.GET_VRP_BALANCE_DASHBOARD, getBalanceDashboard)
]
