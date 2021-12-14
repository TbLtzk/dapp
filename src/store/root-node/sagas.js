import { put, takeEvery, call, select, all } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import {
  getRootMembersData,
  setRootMembersData,
  setCheckIsUserRootNode,
  getRootNodeStakes,
  setRootNodeStakes,
  getRootWithdrawals,
  setRootWithdrawals,
  getMinimumRootTimeLock,
  setMinimumRootTimeLock,
  setRootTimeLocks
} from './action-creators'
import { setErrorMessage } from 'store/transaction-handler/action-creators'
import { SET_TRANSACTION_COUNTER } from 'store/transaction-handler/action-types'

import { addIndex } from 'func/useful'
import { getNowTimestamp } from 'func/convertDate'
import { fromWei } from 'func/balance'
import ErrorHandler from 'func/ErrorHandler'
import { getMemberStake, getRootCalc } from 'contracts/helpers/root-node-helper'
import { getRootNodesInstance } from 'contracts/contract-instance'
import { getAccountBalance } from 'store/q-vault/action-creators'

function * setRootStakeToPanelGenerator ({ data }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const { userAddress } = yield select((state) => state.userInf)

    const contract = yield call(getRootNodesInstance)
    const res = yield contract.commitStake(data)

    if (res) {
      yield put(getAccountBalance(userAddress))
      yield put(getRootNodeStakes(userAddress))
      yield put(getRootWithdrawals(userAddress))
      yield put(getMinimumRootTimeLock(userAddress))
      yield put(getRootMembersData())
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setRootAnnounceWithdrawalGenerator ({ amount, paymentInf }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const contract = yield call(getRootNodesInstance)
    const { userAddress } = yield select((state) => state.userInf)

    const data = yield contract.announceWithdrawal(amount, paymentInf)

    if (data) {
      yield put(getAccountBalance(userAddress))
      yield put(getRootNodeStakes(userAddress))
      yield put(getRootWithdrawals(userAddress))
      yield put(getMinimumRootTimeLock(userAddress))
      yield put(getRootMembersData())
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setRootWithdrawGenerator ({ amount, payTo, paymentInf }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const { userAddress } = yield select((state) => state.userInf)

    const contract = yield call(getRootNodesInstance)

    const data = yield contract.withdraw(amount, payTo, paymentInf)

    if (data) {
      yield put(getAccountBalance(userAddress))
      yield put(getRootNodeStakes(userAddress))
      yield put(getRootWithdrawals(userAddress))
      yield put(getMinimumRootTimeLock(userAddress))
      yield put(getRootMembersData())
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * getRootMembersGenerator () {
  try {
    const contract = yield call(getRootNodesInstance)
    const members = yield contract.getMembers()
    const rootStakes = yield all(members.map((member) => getMemberStake(contract, member)))
    yield put(setRootMembersData(getRootCalc(rootStakes)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getCheckIsUserRootNodeGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance)
    const data = yield contract.instance.methods.isMember(address).call()
    yield put(setCheckIsUserRootNode(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getRootNodeStakesGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance)
    const data = yield contract.getRootNodeStake(address)
    yield put(setRootNodeStakes(Number(fromWei(data))))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getRootWithdrawalsGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance)
    const data = yield contract.getWithdrawalInfo(address)
    yield put(setRootWithdrawals(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
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
  takeEvery(actionTypes.SET_ROOT_STAKE_TO_PANEL, setRootStakeToPanelGenerator),
  takeEvery(actionTypes.SET_ROOT_ANNOUNCE_WITHDRAWAL, setRootAnnounceWithdrawalGenerator),
  takeEvery(actionTypes.SET_ROOT_WITHDRAW, setRootWithdrawGenerator),

  takeEvery(actionTypes.GET_ROOT_MEMBERS_DATA, getRootMembersGenerator),
  takeEvery(actionTypes.GET_CHECK_IS_USER_ROOT_NODE, getCheckIsUserRootNodeGenerator),
  takeEvery(actionTypes.GET_ROOT_NODE_STAKES, getRootNodeStakesGenerator),
  takeEvery(actionTypes.GET_ROOT_WITHDRAWALS, getRootWithdrawalsGenerator),
  takeEvery(actionTypes.GET_ROOT_MINIMUM_TIME_LOCK, getMinimumRootTimeLockGenerator),
  takeEvery(actionTypes.GET_ROOT_TIME_LOCKS, getRootTimeLocksGenerator)
]
