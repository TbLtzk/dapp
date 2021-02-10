import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from 'store/actions/action-types/system-balance';
import {
  getDebtError, getDebtSuccess,
  getSurplusError, getSurplusSuccess,
  getSystemBalanceError, getSystemBalanceSuccess
} from 'store/actions/action-creaters/system-balance';
import SystemBalance from 'contracts/src/SystemBalance';

function* getSurplus() {
  try {
    const contract = new SystemBalance();
    const data = yield contract.getSurplus();

    console.log('getSurplus', data);
    yield put(getSurplusSuccess(data));
  } catch (err) {
    console.error('getSurplus.Error', err);
    yield put(getSurplusError(0));
  }
}

function* getDebt() {
  try {
    const contract = new SystemBalance();
    const data = yield contract.getDebt();

    console.log('getDebt', data);
    yield put(getDebtSuccess(data));
  } catch (err) {
    console.error('getDebt.Error', err);
    yield put(getDebtError(0));
  }
}

function* getSystemBalance() {
  try {
    const contract = new SystemBalance();
    const data = yield contract.getBalance();

    console.log('getSystemBalance', data);
    yield put(getSystemBalanceSuccess(data));
  } catch (err) {
    console.error('getSystemBalance.Error', err);
    yield put(getSystemBalanceError(0));
  }
}
export default [
  takeEvery(actionTypes.GET_SURPLUS, getSurplus),
  takeEvery(actionTypes.GET_DEBT, getDebt),
  takeEvery(actionTypes.GET_SYSTEM_BALANCE, getSystemBalance),
];
