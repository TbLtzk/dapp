import { put, takeEvery } from 'redux-saga/effects'
import * as actionTypes from 'store/actions/action-types/membership'
import {
  getIsUserEPDRMemberSuccess,
  getIsUserEPQFIMemberSuccess,
  getEPDRMembersError,
  getEPDRMembersSuccess,
  getEPQFIMembersError,
  getEPQFIMembersSuccess
} from 'store/actions/action-creaters/membership'

import EPDRMembership from 'contracts/src/membership/EPDR_Membership'
import EPQFIMembership from 'contracts/src/membership/EPQFI_Membership'
import ErrorHandler from 'func/ErrorHandler'

function getContractEPDRMembership () {
  return new EPDRMembership()
}

function getContractEPQFIMembership () {
  return new EPQFIMembership()
}

function * isUserEPDRMember ({ address }) {
  try {
    const contract = getContractEPDRMembership()
    const data = yield contract.isMember(address)
    yield put(getIsUserEPDRMemberSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * isUserEPQFIMember ({ address }) {
  try {
    const contract = getContractEPQFIMembership()
    const data = yield contract.isMember(address)
    yield put(getIsUserEPQFIMemberSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getEPDRMembers () {
  try {
    const contract = getContractEPDRMembership()
    const data = yield contract.getMembers()
    yield put(getEPDRMembersSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getEPDRMembersError(error))
  }
}

function * getEPQFIMembers () {
  try {
    const contract = getContractEPQFIMembership()
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
