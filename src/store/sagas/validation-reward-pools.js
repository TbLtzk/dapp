import { put, takeEvery } from 'redux-saga/effects'
import * as actionTypes from 'store/actions/action-types/validation-reward-pools'

import { setError, setBalance, getVRPBalanceSuccess } from 'store/actions/action-creaters/validation-reward-pools'
import ValidationRewardPools from 'contracts/src/ValidationRewardPools'
import ErrorHandler from 'func/ErrorHandler'

let contractInstance = null

function getContractInstance () {
  if (contractInstance === null) {
    contractInstance = new ValidationRewardPools()
  }
  return contractInstance
}

function * getBalanceGenerator ({ address }) {
  try {
    yield put({ type: actionTypes.SET_VRP_DATA_IS_LOADING })

    const contract = getContractInstance()
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
    const contract = getContractInstance()
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
