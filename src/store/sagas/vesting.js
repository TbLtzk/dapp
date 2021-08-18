import { put, takeEvery, call, select } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/vesting'
import { SET_TRANSACTION_COUNTER } from '../actions/action-types/transaction-handler'
import {
  setVestingBalance,
  setMinimumVestingTimeLock,
  setVestingTimeLocks,
  setVestingWithdraw
} from 'store/actions/action-creaters/vesting'

import { toWei, fromWei } from 'func/balance'
import { addIndex } from 'func/useful'
import { getNowTimestamp } from 'func/convertDate'
import { contractRegistryInstance } from 'contracts/contracts'

let vestingInstance = null

const getVestingInstance = async () => {
  if (vestingInstance === null) {
    vestingInstance = await contractRegistryInstance.vesting()
  }
  return vestingInstance
}

function * getVestingBalanceGenerator ({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const contract = yield call(getVestingInstance)
    const data = yield contract.balanceOf(address)
    yield put(setVestingBalance(fromWei(data)))
  } catch (err) {
    console.error('QV.Error', err)
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * getMinimumVestingTimeLockGenerator ({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getVestingInstance)
    const data = yield contract.getMinimumBalance(address, getNowTimestamp())
    yield put(setMinimumVestingTimeLock(fromWei(data)))
  } catch (err) {
    console.error('QV.Error', err)
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * getVestingTimeLocksGenerator ({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const contract = yield call(getVestingInstance)
    const data = yield contract.getTimeLocks(address)
    yield put(setVestingTimeLocks(addIndex(data)))
  } catch (err) {
    console.error('QV.Error', err)
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setVestingDepositGenerator ({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
  } catch (err) {
    console.error('VestingDeposit.Error', err)
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
    if (data.status === true) {
      yield put(setVestingWithdraw(userAddress))
    }
  } catch (err) {
    console.error('VestingWithdraw.Error', err)
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
