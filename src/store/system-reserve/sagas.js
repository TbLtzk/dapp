import { call, put, takeEvery } from 'redux-saga/effects';

import { getAvailableAmountError, getAvailableAmountSuccess, setSystemReserveBalance } from './action-creators';
import * as actionTypes from './action-types';

import { getSystemReserveInstance } from 'contracts/contract-instance';

import { fromWei } from 'func/balance';
import ErrorHandler from 'func/ErrorHandler';

function* getSystemReserveBalanceGenerator () {
  try {
    const contract = yield call(getSystemReserveInstance);
    const balance = yield window.web3.eth.getBalance(contract.address);
    yield put(setSystemReserveBalance(fromWei(balance)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function* getAvailableAmountGenerator () {
  try {
    const contract = yield call(getSystemReserveInstance);
    const data = yield contract.availableAmount();
    yield put(getAvailableAmountSuccess(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    yield put(getAvailableAmountError(0));
  }
}

export default [
  takeEvery(actionTypes.GET_AVAILABLE_AMOUNT, getAvailableAmountGenerator),
  takeEvery(actionTypes.GET_SYSTEM_RESERVE_BALANCE, getSystemReserveBalanceGenerator),
];
