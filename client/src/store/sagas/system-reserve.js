import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from 'store/actions/action-types/system-reserve';
import {
  getAvailableAmountSuccess, getAvailableAmountError
} from 'store/actions/action-creaters/system-reserve';
import SystemReserve from 'contracts/src/SystemReserve';

function* getAvailableAmount() {
  try {
    const contract = new SystemReserve();
    const data = yield contract.availableAmount();

    console.log('getAvailableAmount', data);
    yield put(getAvailableAmountSuccess(data));
  } catch (err) {
    console.error('getAvailableAmount.Error', err);
    yield put(getAvailableAmountError(0));
  }
}

export default [
  takeEvery(actionTypes.GET_AVAILABLE_AMOUNT, getAvailableAmount),
];
