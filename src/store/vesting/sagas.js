import { put, takeEvery, call, select } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import { setVestingBalance, setMinimumVestingTimeLock, setVestingTimeLocks } from './action-creators'

import { toWei, fromWei } from 'func/balance'
import { addIndex } from 'func/useful'
import { getNowTimestamp } from 'func/convertDate'
import { getVestingInstance } from 'contracts/contract-instance'

import {
  setTransactionLoadingError,
  setTransactionLoading,
  setTransactionLoadingSuccess
} from 'store/transaction-handler/action-creators'
import ErrorHandler from 'func/ErrorHandler'
import { getAmountOnContract } from 'store/locked-amount/sagas'
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
    yield put(setMinimumVestingTimeLock(Number(fromWei(data))))
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
    yield put(setTransactionLoading())
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setTransactionLoadingError(errorMsg))
  }
}

function * setVestingWithdrawGenerator ({ amountQ }) {
  try {
    yield put(setTransactionLoading())

    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getVestingInstance)

    yield contract.withdraw(toWei(amountQ), { from: userAddress })

    yield call(getAmountOnContract, CONTRACT_TYPES.vesting, userAddress)
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setTransactionLoadingError(errorMsg))
  }
}

export default [
  takeEvery(actionTypes.GET_VESTING_BALANCE, getVestingBalanceGenerator),
  takeEvery(actionTypes.GET_VESTING_MINIMUM_TIME_LOCK, getMinimumVestingTimeLockGenerator),
  takeEvery(actionTypes.GET_VESTING_TIME_LOCKS, getVestingTimeLocksGenerator),

  takeEvery(actionTypes.SET_VESTING_WITHDRAW, setVestingWithdrawGenerator),
  takeEvery(actionTypes.SET_VESTING_DEPOSIT, setVestingDepositGenerator)
]
