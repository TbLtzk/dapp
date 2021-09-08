import { put, takeEvery, call } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/root-contract'
// import { SET_TRANSACTION_COUNTER } from '../actions/action-types/transaction-handler'
import {
  getRootMembersDataSuccess,
  getRootMembersDataError,
  stakeToPanelSuccess,
  stakeToPanelError,
  checkIsUserRootNodeSuccess,
  checkIsUserRootNodeError,
  getRootNodeStakesSuccess,
  getRootNodeStakesError,
  announceWithdrawalSuccess,
  announceWithdrawalError,
  withdrawSuccess,
  withdrawError,
  getWithdrawalsSuccess,
  getWithdrawalsError,
  getRootMembersData,
  setRootTimeLocks,
  setMinimumRootTimeLock
} from 'store/actions/action-creaters/root-contract'
import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess
} from '../actions/action-creaters/transaction-handler'

import RootService from 'contracts/src/Root'
import { addIndex } from 'func/useful'
import { getNowTimestamp } from 'func/convertDate'
import { fromWei } from 'func/balance'
import ErrorHandler from 'func/ErrorHandler'

import { getRootNodesInstance } from 'contracts/contract-instance'

function * getRootMembers ({ contract }) {
  try {
    const data = yield contract.getRootCalc()
    yield put(getRootMembersDataSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getRootMembersDataError(error.message))
  }
}

function * stakeToPanel ({ contract, data, callBack }) {
  try {
    yield put(setTransactionLoading())
    yield contract.stakeToPanel(data)

    yield put(stakeToPanelSuccess('success'))
    yield put(setTransactionLoadingSuccess())
    yield put(getRootMembersData(contract))
    yield callBack()
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(stakeToPanelError(error.message))
    yield put(setTransactionLoadingError(error.message))
  }
}

function * announceWithdrawal ({ contract, amount, paymentInf, callBack }) {
  try {
    yield put(setTransactionLoading())
    yield contract.announceWithdrawal(amount, paymentInf)

    yield put(announceWithdrawalSuccess('success'))
    yield put(setTransactionLoadingSuccess())
    yield callBack()
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(announceWithdrawalError(error.message))
    yield put(setTransactionLoadingError(error.message))
  }
}

function * withdraw ({ contract, amount, payTo, paymentInf, callBack }) {
  try {
    yield put(setTransactionLoading())
    yield contract.withdraw(amount, payTo, paymentInf)

    yield put(withdrawSuccess('success'))
    yield put(setTransactionLoadingSuccess())
    yield callBack()
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(withdrawError(error.message))
    yield put(setTransactionLoadingError(error.message))
  }
}

function * checkIsUserRootNode ({ contract, address }) {
  try {
    const data = yield contract.checkMemberIsRoot(address)
    yield put(checkIsUserRootNodeSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(checkIsUserRootNodeError(error.message))
  }
}

function * getRootNodeStakes ({ contract, address }) {
  try {
    const contract = new RootService()
    const data = yield contract.getRootNodeStake(address)
    yield put(getRootNodeStakesSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getRootNodeStakesError(error.message))
  }
}

function * getWithdrawals ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance)
    const data = yield contract.getWithdrawalInfo(address)
    yield put(getWithdrawalsSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getWithdrawalsError(error.message))
  }
}

function * getMinimumRootTimeLockGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance)
    const data = yield contract.getMinimumBalance(address, getNowTimestamp())
    yield put(setMinimumRootTimeLock(fromWei(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getRootTimeLocksGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance)
    const data = yield contract.getTimeLocks(address)
    yield put(setRootTimeLocks(addIndex(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [
  takeEvery(actionTypes.GET_ROOT_MEMBERS_DATA, getRootMembers),
  takeEvery(actionTypes.STAKE_TO_PANEL, stakeToPanel),
  takeEvery(actionTypes.ANNOUNCE_WITHDRAWAL, announceWithdrawal),
  takeEvery(actionTypes.WITHDRAW, withdraw),

  takeEvery(actionTypes.CHECK_IS_USER_ROOT_NODE, checkIsUserRootNode),
  takeEvery(actionTypes.GET_ROOT_NODE_STAKES, getRootNodeStakes),
  takeEvery(actionTypes.GET_WITHDRAWALS, getWithdrawals),

  takeEvery(actionTypes.GET_ROOT_MINIMUM_TIME_LOCK, getMinimumRootTimeLockGenerator),
  takeEvery(actionTypes.GET_ROOT_TIME_LOCKS, getRootTimeLocksGenerator)
]
