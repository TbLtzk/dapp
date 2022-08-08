import { call, put, select, takeEvery } from 'redux-saga/effects';

import * as actionTypes from './action-types';

import {
  getEPDRMembersError,
  getEPDRMembersSuccess,
  getEPQFIMembersError,
  getEPQFIMembersSuccess,
  getEPRSMembersError,
  getEPRSMembersSuccess,
  getIsUserEPDRMemberSuccess,
  getIsUserEPQFIMemberSuccess,
  getIsUserEPRSMemberSuccess
} from 'store/membership/action-creators';

import {
  getEpdrMembershipInstance,
  getEpqfiMembershipInstance,
  getEprsMembershipInstance
} from 'contracts/contract-instance';

import { captureError } from 'utils/errors';

function* isUserEPDRMember () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getEpdrMembershipInstance);
    const data = yield contract.isMember(userAddress);
    yield put(getIsUserEPDRMemberSuccess(data));
  } catch (error) {
    captureError(error);
  }
}

function* isUserEPQFIMember () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getEpqfiMembershipInstance);
    const data = yield contract.isMember(userAddress);
    yield put(getIsUserEPQFIMemberSuccess(data));
  } catch (error) {
    captureError(error);
  }
}

function* isUserEPRSMember () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getEprsMembershipInstance);
    const data = yield contract.isMember(userAddress);
    yield put(getIsUserEPRSMemberSuccess(data));
  } catch (error) {
    captureError(error);
  }
}

function* getEPRSMembers () {
  try {
    const contract = yield call(getEprsMembershipInstance);
    const data = yield contract.getMembers();
    yield put(getEPRSMembersSuccess(data));
  } catch (error) {
    captureError(error);
    yield put(getEPRSMembersError(error.message));
  }
}

function* getEPDRMembers () {
  try {
    const contract = yield call(getEpdrMembershipInstance);
    const data = yield contract.getMembers();
    yield put(getEPDRMembersSuccess(data));
  } catch (error) {
    captureError(error);
    yield put(getEPDRMembersError(error.message));
  }
}

function* getEPQFIMembers () {
  try {
    const contract = yield call(getEpqfiMembershipInstance);
    const data = yield contract.getMembers();
    yield put(getEPQFIMembersSuccess(data));
  } catch (error) {
    captureError(error);
    yield put(getEPQFIMembersError(error.message));
  }
}

export default [
  takeEvery(actionTypes.IS_USER_EPDR_MEMBER, isUserEPDRMember),
  takeEvery(actionTypes.IS_USER_EPQFI_MEMBER, isUserEPQFIMember),
  takeEvery(actionTypes.IS_USER_EPRS_MEMBER, isUserEPRSMember),

  takeEvery(actionTypes.GET_EPDR_MEMBERS, getEPDRMembers),
  takeEvery(actionTypes.GET_EPQFI_MEMBERS, getEPQFIMembers),
  takeEvery(actionTypes.GET_EPRS_MEMBERS, getEPRSMembers)
];
