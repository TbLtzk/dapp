import { put, takeEvery, call, select } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/vesting'
import { SET_TRANSACTION_COUNTER } from '../actions/action-types/transaction-handler'
import {
  setVestingBalance,
  setMinimumVestingTimeLock,
  setVestingTimeLocks
} from 'store/actions/action-creaters/vesting'

import { toWei, fromWei } from 'func/balance'
import { addIndex } from 'func/useful'
import { getNowTimestamp } from 'func/convertDate'
import { getVestingInstance } from 'contracts/contract-instance'

import { setErrorMessage } from 'store/actions/action-creaters/transaction-handler'
import ErrorHandler from 'func/ErrorHandler'
import { getAmountOnContract } from './locked-amount'
import { CONTRACT_TYPES } from 'constants/contracts'

function * getVestingBalanceGenerator ({ address }) {
  try {
    const contract = yield call(getVestingInstance)
    const data = yield contract.balanceOf(address)
    yield put(setVestingBalance(fromWei(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getMinimumVestingTimeLockGenerator ({ address }) {
  try {
    const contract = yield call(getVestingInstance)
    const data = yield contract.getMinimumBalance(address, getNowTimestamp())
    yield put(setMinimumVestingTimeLock(fromWei(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getVestingTimeLocksGenerator ({ address }) {
  try {
    const contract = yield call(getVestingInstance)
    const data = yield contract.getTimeLocks(address)
    yield put(setVestingTimeLocks(addIndex(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * setVestingDepositGenerator ({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
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

function * setVestingWithdrawGenerator ({ amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getVestingInstance)
    const data = yield contract.withdraw(toWei(amountQ), { from: userAddress })

    if (data.status) {
      yield call(getAmountOnContract, CONTRACT_TYPES.vesting, userAddress)
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

export default [
  takeEvery(actionTypes.GET_VESTING_BALANCE, getVestingBalanceGenerator),
  takeEvery(actionTypes.GET_VESTING_MINIMUM_TIME_LOCK, getMinimumVestingTimeLockGenerator),
  takeEvery(actionTypes.GET_VESTING_TIME_LOCKS, getVestingTimeLocksGenerator),

  takeEvery(actionTypes.SET_VESTING_WITHDRAW, setVestingWithdrawGenerator),
  takeEvery(actionTypes.SET_VESTING_DEPOSIT, setVestingDepositGenerator)
]
