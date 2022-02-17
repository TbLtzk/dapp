import { put, takeEvery, call, select } from 'redux-saga/effects'
import * as actionTypes from './action-types'
import {
  getIsUserEPDRMemberSuccess,
  getIsUserEPQFIMemberSuccess,
  getEPDRMembersError,
  getEPDRMembersSuccess,
  getEPQFIMembersError,
  getEPQFIMembersSuccess,
  getIsUserEPRSMemberSuccess,
  getEPRSMembersError,
  getEPRSMembersSuccess
} from 'store/membership/action-creators'

import ErrorHandler from 'func/ErrorHandler'
import {
  getEpdrMembershipInstance,
  getEpqfiMembershipInstance,
  getEprsMembershipInstance
} from 'contracts/contract-instance'

function * isUserEPDRMember () {
  try {
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getEpdrMembershipInstance)
    const data = yield contract.isMember(userAddress)
    yield put(getIsUserEPDRMemberSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * isUserEPQFIMember () {
  try {
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getEpqfiMembershipInstance)
    const data = yield contract.isMember(userAddress)
    yield put(getIsUserEPQFIMemberSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * isUserEPRSMember () {
  try {
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getEprsMembershipInstance)
    const data = yield contract.isMember(userAddress)
    yield put(getIsUserEPRSMemberSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getEPRSMembers () {
  try {
    const contract = yield call(getEprsMembershipInstance)
    const data = yield contract.getMembers()
    yield put(getEPRSMembersSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getEPRSMembersError(error.message))
  }
}

function * getEPDRMembers () {
  try {
    const contract = yield call(getEpdrMembershipInstance)
    const data = yield contract.getMembers()
    yield put(getEPDRMembersSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getEPDRMembersError(error.message))
  }
}

function * getEPQFIMembers () {
  try {
    const contract = yield call(getEpqfiMembershipInstance)
    const data = yield contract.getMembers()
    yield put(getEPQFIMembersSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getEPQFIMembersError(error.message))
  }
}

export default [
  takeEvery(actionTypes.IS_USER_EPDR_MEMBER, isUserEPDRMember),
  takeEvery(actionTypes.IS_USER_EPQFI_MEMBER, isUserEPQFIMember),
  takeEvery(actionTypes.IS_USER_EPRS_MEMBER, isUserEPRSMember),

  takeEvery(actionTypes.GET_EPDR_MEMBERS, getEPDRMembers),
  takeEvery(actionTypes.GET_EPQFI_MEMBERS, getEPQFIMembers),
  takeEvery(actionTypes.GET_EPRS_MEMBERS, getEPRSMembers)
]
