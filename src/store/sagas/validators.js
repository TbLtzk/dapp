import { put, takeEvery } from 'redux-saga/effects'
import Validators from '../../contracts/src/Validators'
import * as actionTypes from 'store/actions/action-types/validators'
import { SET_TRANSACTION_COUNTER } from '../actions/action-types/transaction-handler'

import {
  setError,
  setDelegatorsShare,
  getDelegatorsShare,
  setTotalStake,
  setSelfStake,
  setOwnStake,
  setDelegatedStake,
  setAccTotalStake,
  setInterestRate,
  getInterestRate,
  getValidatorMembersSuccess,
  getValidatorMembersError,
  isUserValidatorSuccess,
  setMinimumValidatorsTimeLock,
  setValidatorsTimeLocks
} from 'store/actions/action-creaters/validators'
import { fromWei } from 'func/balance'
import { addIndex } from 'func/useful'
import { getNowTimestamp } from 'func/convertDate'

import { validatorsInstance, validationRewardPoolsInstance } from 'contracts/contracts'
import { setErrorMessage } from 'store/actions/action-creaters/transaction-handler'
import ErrorHandler from 'func/ErrorHandler'

let contractInstance = null

function getContractInstance () {
  if (contractInstance === null) {
    contractInstance = new Validators()
  }
  return contractInstance
}

function * getDelegatorsShareGenerator ({ address }) {
  try {
    const data = yield validationRewardPoolsInstance.getDelegatorsShare(address)
    yield put(setDelegatorsShare(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setError(error.message))
  }
}

function * getTotalStakeGenerator ({ address }) {
  try {
    const contract = getContractInstance()
    let data = yield contract.getValidatorTotalStake(address)
    data = fromWei(data)
    yield put(setTotalStake(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setError(error.message))
  }
}

function * getOwnStakeGenerator ({ address }) {
  try {
    let data = yield validatorsInstance.getAccountableSelfStake(address)
    data = fromWei(data)
    yield put(setOwnStake(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setError(error.message))
  }
}

function * getDelegatedStakeGenerator ({ address }) {
  try {
    const contract = getContractInstance()
    let data = yield contract.getValidatorDelegatedStake(address)
    data = fromWei(data)

    yield put(setDelegatedStake(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setError(error.message))
  }
}

function * getAccTotalStakeGenerator ({ address }) {
  try {
    const contract = getContractInstance()
    let data = yield contract.getAccountableTotalStake(address)
    data = fromWei(data)
    yield put(setAccTotalStake(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setError(error.message))
  }
}

function * getAccountableSelfStake ({ address }) {
  try {
    const data = yield validatorsInstance.getAccountableSelfStake(address)
    yield put(setSelfStake(fromWei(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setError(error.message))
  }
}

function * getInterestRateGenerator ({ address }) {
  try {
    const data = yield validationRewardPoolsInstance.getInterestRate(address)
    yield put(setInterestRate(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setError(error.message))
  }
}

function * setDelegatorsShareGenerator ({ address, uintPercent }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const data = yield validationRewardPoolsInstance.setDelegatorsShare(address, uintPercent)
    if (data.status) {
      yield put(getDelegatorsShare(address))
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

function * setInterestRateGenerator ({ address, uintPercent }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const contract = getContractInstance()
    const data = yield contract.setInterestRate(address, uintPercent)
    if (data.status) {
      yield put(getInterestRate(address))
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

function * getValidatorsMembers () {
  try {
    const contract = getContractInstance()
    const data = yield contract.getMembersList()
    yield put(getValidatorMembersSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getValidatorMembersError(error.message))
  }
}

function * isUserValidator ({ address }) {
  try {
    const data = yield validatorsInstance.isInShortList(address)
    yield put(isUserValidatorSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getMinimumValidatorsTimeLockGenerator ({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const data = yield validatorsInstance.getMinimumBalance(address, getNowTimestamp())
    yield put(setMinimumValidatorsTimeLock(fromWei(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * getValidatorsTimeLocksGenerator ({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const data = yield validatorsInstance.getTimeLocks(address)
    yield put(setValidatorsTimeLocks(addIndex(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

export default [
  takeEvery(actionTypes.GET_VAL_DELEGATORS_SHARE, getDelegatorsShareGenerator),
  takeEvery(actionTypes.GET_VAL_TOTAL_STAKE, getTotalStakeGenerator),
  takeEvery(actionTypes.GET_VAL_OWN_STAKE, getOwnStakeGenerator),
  takeEvery(actionTypes.GET_VAL_DELEGATED_STAKE, getDelegatedStakeGenerator),
  takeEvery(actionTypes.GET_VAL_ACC_TOTAL_STAKE, getAccTotalStakeGenerator),
  takeEvery(actionTypes.GET_VAL_INTEREST_RATE, getInterestRateGenerator),
  takeEvery(actionTypes.GET_VAL_SELF_STAKE, getAccountableSelfStake),
  takeEvery(actionTypes.SET_VAL_DELEGATORS_SHARE_SEND, setDelegatorsShareGenerator),
  takeEvery(actionTypes.SET_VAL_INTEREST_RATE_SEND, setInterestRateGenerator),

  takeEvery(actionTypes.GET_VALIDATORS_MEMBERS, getValidatorsMembers),
  takeEvery(actionTypes.IS_USER_VALIDATOR, isUserValidator),

  // sdk
  takeEvery(actionTypes.GET_VALIDATORS_MINIMUM_TIME_LOCK, getMinimumValidatorsTimeLockGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_TIME_LOCKS, getValidatorsTimeLocksGenerator)
]
