import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from 'store/actions/action-types/membership';
import {
  getIsUserEPDRMemberSuccess, getIsUserEPQFIMemberSuccess
} from 'store/actions/action-creaters/membership';
import EPDR_Membership from 'contracts/src/membership/EPDR_Membership';
import EPQFI_Membership from 'contracts/src/membership/EPQFI_Membership';

function* isUserEPDRMember({address}) {
  try {
    const contract = new EPDR_Membership("EPDR_Membership");
    const data = yield contract.isMember(address);
    // console.log("data", data);
    yield put(getIsUserEPDRMemberSuccess(data));
  } catch (err) {
    console.error('isUserValidator.Error', err);
  }
}

function* isUserEPQFIMember({address}) {
  try {
    const contract = new EPQFI_Membership("EPQFI_Membership");
    const data = yield contract.isMember(address);
    // console.log("data", data);
    yield put(getIsUserEPQFIMemberSuccess(data));
  } catch (err) {
    console.error('isUserValidator.Error', err);
  }
}

export default [
  takeEvery(actionTypes.IS_USER_EPDR_MEMBER, isUserEPDRMember),
  takeEvery(actionTypes.IS_USER_EPQFI_MEMBER, isUserEPQFIMember),
];
