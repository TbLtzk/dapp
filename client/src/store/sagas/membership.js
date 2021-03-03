import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from 'store/actions/action-types/membership';
import {
  getIsUserEPDRMemberSuccess, getIsUserEPQFIMemberSuccess,
  getEPDRMembersError, getEPDRMembersSuccess, getEPQFIMembersError,
  getEPQFIMembersSuccess
} from 'store/actions/action-creaters/membership';

import EPDR_Membership from 'contracts/src/membership/EPDR_Membership';
import EPQFI_Membership from 'contracts/src/membership/EPQFI_Membership';

function getContract_EPDR_Membership() {
  return new EPDR_Membership();
}

function getContract_EPQFI_Membership() {
  return new EPQFI_Membership();
}

function* isUserEPDRMember({ address }) {
  try {
    const contract = getContract_EPDR_Membership();
    const data = yield contract.isMember(address);
    // console.log("data", data);
    yield put(getIsUserEPDRMemberSuccess(data));
  } catch (err) {
    console.error('isUserValidator.Error', err);
  }
}

function* isUserEPQFIMember({ address }) {
  try {
    const contract = getContract_EPQFI_Membership();
    const data = yield contract.isMember(address);
    // console.log("data", data);
    yield put(getIsUserEPQFIMemberSuccess(data));
  } catch (err) {
    console.error('isUserValidator.Error', err);
  }
}

function* getEPDR_Members() {
  try {
    const contract = getContract_EPDR_Membership();
    const data = yield contract.getMembers();
    // console.log("getEPDR_Members", data);
    yield put(getEPDRMembersSuccess(data));
  } catch (err) {
    console.error('getEPDR_Members.Error', err);
    yield put(getEPDRMembersError(err));
  }
}

function* getEPQFI_Members() {
  try {
    const contract = getContract_EPQFI_Membership();
    const data = yield contract.getMembers();
    // console.log("data", data);
    yield put(getEPQFIMembersSuccess(data));
  } catch (err) {
    console.error('getEPQFI_Members.Error', err);
    yield put(getEPQFIMembersError(err));
  }
}

export default [
  takeEvery(actionTypes.IS_USER_EPDR_MEMBER, isUserEPDRMember),
  takeEvery(actionTypes.IS_USER_EPQFI_MEMBER, isUserEPQFIMember),

  takeEvery(actionTypes.GET_EPDR_MEMBERS, getEPDR_Members),
  takeEvery(actionTypes.GET_EPQFI_MEMBERS, getEPQFI_Members),
];
