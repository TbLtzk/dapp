import { put, takeEvery, call } from 'redux-saga/effects'
import * as actionTypes from 'store/actions/action-types/validators'
import { SET_TRANSACTION_COUNTER } from '../actions/action-types/transaction-handler'

import {
  setTotalStake,
  setSelfStake,
  setOwnStake,
  setDelegatedStake,
  setAccountableTotalStake,
  getInterestRate,
  getValidatorMembersSuccess,
  getValidatorMembersError,
  setIsUserValidator,
  getIsUserValidator,
  setMinimumValidatorsTimeLock,
  setValidatorsTimeLocks,
  setValidatorShortList,
  setValidatorWithdrawalInfo,
  getValidatorWithdrawalInfo,
  getValidatorMembers,
  getValidatorShortList,
  getAccountableTotalStake
} from 'store/actions/action-creaters/validators'

import { fromWei, toWei } from 'func/balance'
import { addIndex } from 'func/useful'
import { getNowTimestamp } from 'func/convertDate'

import { getValidatorsInstance, getContractInstance } from 'contracts/contract-instance'
import {
  getMembersList,
  getValidatorDelegatedStake,
  getAccountableTotalStakeFunction
} from 'contracts/helpers/validators-helper'
import { getAccountBalance } from 'store/actions/action-creaters/q-vault'

function * getValidatorsShortListGenerator () {
  try {
    const contract = yield call(getValidatorsInstance)
    const data = yield contract.instance.methods.getValidatorShortList().call()
    if (data) {
      yield put(setValidatorShortList(data))
    }
  } catch (error) {
    console.error(error)
  }
}
function * getValidatorsWithdrawalInfoGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance)
    const data = yield contract.getWithdrawalInfo(address)
    if (data) {
      yield put(setValidatorWithdrawalInfo(data))
    }
  } catch (error) {
    console.error(error)
    yield put(setValidatorWithdrawalInfo({}))
  }
}
function * getValidatorsTotalStakeGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance)
    let data = yield contract.getValidatorTotalStake(address)
    data = fromWei(data)
    yield put(setTotalStake(data))
  } catch (err) {
    console.error('Validators.Error', err)
  }
}
function * getValidatorsOwnStakeGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance)
    let data = yield contract.getAccountableSelfStake(address)
    data = fromWei(data)
    yield put(setOwnStake(data))
  } catch (err) {
    console.error('Validators.Error', err)
  }
}
function * getValidatorsDelegatedStakeGenerator ({ address }) {
  try {
    let data = yield call(getValidatorDelegatedStake, address)
    data = fromWei(data)
    yield put(setDelegatedStake(data))
  } catch (err) {
    console.error('Validators.Error', err)
  }
}
function * getValidatorsAccountableTotalStakeGenerator ({ address }) {
  try {
    let data = yield call(getAccountableTotalStakeFunction, address)
    data = fromWei(data)
    yield put(setAccountableTotalStake(data))
  } catch (err) {
    console.error('Validators.Error', err)
  }
}
function * getValidatorsAccountableSelfStake ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance)
    const data = yield contract.getAccountableSelfStake(address)
    yield put(setSelfStake(fromWei(data)))
  } catch (err) {
    console.error('Validators.Error', err)
  }
}
function * getValidatorsMembers () {
  try {
    const data = yield call(getMembersList)
    yield put(getValidatorMembersSuccess(data))
  } catch (err) {
    console.error('ValidatorsMember.Error', err)
    yield put(getValidatorMembersError(err.message))
  }
}
function * getIsUserValidatorGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance)
    const data = yield contract.isInShortList(address)
    yield put(setIsUserValidator(data))
  } catch (err) {
    console.error('isUserValidator.Error', err)
    yield put(setIsUserValidator(false))
  }
}
function * getValidatorsMinimumTimeLockGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance)
    const data = yield contract.getMinimumBalance(address, getNowTimestamp())
    yield put(setMinimumValidatorsTimeLock(fromWei(data)))
  } catch (err) {
    console.error('getMinimumValidatorsTimeLockGenerator.Error', err)
  }
}
function * getValidatorsTimeLocksGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance)
    const data = yield contract.getTimeLocks(address)
    yield put(setValidatorsTimeLocks(addIndex(data)))
  } catch (err) {
    console.error('getValidatorsTimeLocksGenerator.Error', err)
  }
}
function * setValidatorsInterestRateGenerator ({ address, uintPercent }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const contract = getContractInstance()
    const data = yield contract.setInterestRate(address, uintPercent)
    if (data.status === true) {
      yield put(getInterestRate(address))
    }
  } catch (err) {
    console.error('Validators.Error', err)
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}
function * setValidatorsCommitStakeGenerator ({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getValidatorsInstance)
    const data = yield contract.commitStake({
      from: address,
      value: toWei(amountQ)
    })

    if (data) {
      yield put(getIsUserValidator(address))
      yield put(getAccountableTotalStake(address))
      yield put(getValidatorShortList())
      yield put(getAccountBalance(address))
      yield put(getValidatorMembers(address))
    }
  } catch (error) {
    console.error(error, 'withdraw')
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}
function * setValidatorsEnterShortListGenerator ({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const contract = yield call(getValidatorsInstance)
    yield contract.enterShortList({ from: address })
    yield put(getIsUserValidator(address))
  } catch (error) {
    console.error(error)
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}
function * setValidatorsAnnounceWithdrawalGenerator ({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getValidatorsInstance)
    const data = yield contract.announceWithdrawal(toWei(amountQ), { from: address })

    if (data) {
      yield put(getAccountableTotalStake(address))
      yield put(getValidatorWithdrawalInfo(address))
    }
  } catch (error) {
    console.error(error, 'withdraw')
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}
function * setValidatorsWithdrawGenerator ({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const contract = yield call(getValidatorsInstance)
    const data = yield contract.withdraw(toWei(amountQ), address)
    if (data) {
      yield put(getIsUserValidator(address))
      yield put(getAccountableTotalStake(address))
      yield put(getValidatorShortList())
      yield put(getAccountBalance(address))
      yield put(getValidatorMembers(address))
      yield put(getValidatorWithdrawalInfo(address))
    }
  } catch (error) {
    console.error(error, 'withdraw')
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

export default [
  takeEvery(actionTypes.GET_VALIDATORS_SHORT_LIST, getValidatorsShortListGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_WITHDRAWAL_INFO, getValidatorsWithdrawalInfoGenerator),

  takeEvery(actionTypes.SET_VALIDATORS_COMMIT_STAKE, setValidatorsCommitStakeGenerator),
  takeEvery(actionTypes.SET_VALIDATORS_ANNOUNCE_WITHDRAWAL, setValidatorsAnnounceWithdrawalGenerator),
  takeEvery(actionTypes.SET_VALIDATORS_WITHDRAW, setValidatorsWithdrawGenerator),
  takeEvery(actionTypes.SET_VALIDATORS_ENTER_SHORT_LIST, setValidatorsEnterShortListGenerator),
  takeEvery(actionTypes.SET_VALIDATORS_INTEREST_RATE_SEND, setValidatorsInterestRateGenerator),

  takeEvery(actionTypes.GET_VALIDATORS_TOTAL_STAKE, getValidatorsTotalStakeGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_OWN_STAKE, getValidatorsOwnStakeGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_DELEGATED_STAKE, getValidatorsDelegatedStakeGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_ACCOUNTABLE_TOTAL_STAKE, getValidatorsAccountableTotalStakeGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_SELF_STAKE, getValidatorsAccountableSelfStake),

  takeEvery(actionTypes.GET_VALIDATORS_MEMBERS, getValidatorsMembers),
  takeEvery(actionTypes.GET_IS_USER_VALIDATOR, getIsUserValidatorGenerator),

  takeEvery(actionTypes.GET_VALIDATORS_MINIMUM_TIME_LOCK, getValidatorsMinimumTimeLockGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_TIME_LOCKS, getValidatorsTimeLocksGenerator)
]
