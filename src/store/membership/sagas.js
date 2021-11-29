import { put, takeEvery, call } from 'redux-saga/effects'
import * as actionTypes from './action-types'
import {
  getIsUserEPDRMemberSuccess,
  getIsUserEPQFIMemberSuccess,
  getEPDRMembersError,
  getEPDRMembersSuccess,
  getEPQFIMembersError,
  getEPQFIMembersSuccess
} from 'store/membership/action-creators'

import ErrorHandler from 'func/ErrorHandler'
import { getEpdrMembershipInstance, getEpqfiMembershipInstance } from 'contracts/contract-instance'

function * isUserEPDRMember ({ address }) {
  try {
    const contract = yield call(getEpdrMembershipInstance)
    const data = yield contract.isMember(address)
    yield put(getIsUserEPDRMemberSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * isUserEPQFIMember ({ address }) {
  try {
    const contract = yield call(getEpqfiMembershipInstance)
    const data = yield contract.isMember(address)
    yield put(getIsUserEPQFIMemberSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getEPDRMembers () {
  try {
    const contract = yield call(getEpdrMembershipInstance)
    const data = yield contract.getMembers()
    yield put(getEPDRMembersSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getEPDRMembersError(error))
  }
}

function * getEPQFIMembers () {
  try {
    const contract = yield call(getEpqfiMembershipInstance)
    const data = yield contract.getMembers()
    yield put(getEPQFIMembersSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getEPQFIMembersError(error))
  }
}

export default [
  takeEvery(actionTypes.IS_USER_EPDR_MEMBER, isUserEPDRMember),
  takeEvery(actionTypes.IS_USER_EPQFI_MEMBER, isUserEPQFIMember),

  takeEvery(actionTypes.GET_EPDR_MEMBERS, getEPDRMembers),
  takeEvery(actionTypes.GET_EPQFI_MEMBERS, getEPQFIMembers)
]
