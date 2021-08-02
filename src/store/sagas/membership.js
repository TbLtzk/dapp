import { put, takeEvery } from 'redux-saga/effects'
import * as actionTypes from 'store/actions/action-types/membership'
import {
  getIsUserEPDRMemberSuccess, getIsUserEPQFIMemberSuccess,
  getEPDRMembersError, getEPDRMembersSuccess, getEPQFIMembersError,
  getEPQFIMembersSuccess
} from 'store/actions/action-creaters/membership'

import EPDRMembership from 'contracts/src/membership/EPDR_Membership'
import EPQFIMembership from 'contracts/src/membership/EPQFI_Membership'

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
  } catch (err) {
    console.error('isUserValidator.Error', err)
  }
}

function * isUserEPQFIMember ({ address }) {
  try {
    const contract = getContractEPQFIMembership()
    const data = yield contract.isMember(address)
    yield put(getIsUserEPQFIMemberSuccess(data))
  } catch (err) {
    console.error('isUserValidator.Error', err)
  }
}

function * getEPDRMembers () {
  try {
    const contract = getContractEPDRMembership()
    const data = yield contract.getMembers()
    yield put(getEPDRMembersSuccess(data))
  } catch (err) {
    console.error('getEPDRMembers.Error', err)
    yield put(getEPDRMembersError(err))
  }
}

function * getEPQFIMembers () {
  try {
    const contract = getContractEPQFIMembership()
    const data = yield contract.getMembers()
    yield put(getEPQFIMembersSuccess(data))
  } catch (err) {
    console.error('getEPQFIMembers.Error', err)
    yield put(getEPQFIMembersError(err))
  }
}

export default [
  takeEvery(actionTypes.IS_USER_EPDR_MEMBER, isUserEPDRMember),
  takeEvery(actionTypes.IS_USER_EPQFI_MEMBER, isUserEPQFIMember),

  takeEvery(actionTypes.GET_EPDR_MEMBERS, getEPDRMembers),
  takeEvery(actionTypes.GET_EPQFI_MEMBERS, getEPQFIMembers)
]
