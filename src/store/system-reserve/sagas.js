import { call, put, takeEvery } from 'redux-saga/effects';

import { getAvailableAmountError, getAvailableAmountSuccess, setSystemReserveBalance } from './action-creators';
import * as actionTypes from './action-types';

import { getSystemReserveInstance } from 'contracts/contract-instance';

import { fromWei, trimNumber } from 'func/balance';
import ErrorHandler from 'func/ErrorHandler';
import { fN } from 'func/useful';

function * getSystemReserveBalanceGenerator () {
  try {
    const contract = yield call(getSystemReserveInstance);
    const balance = yield window.web3.eth.getBalance(contract.address);
    yield put(setSystemReserveBalance(trimNumber(fromWei(balance))));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getAvailableAmountGenerator () {
  try {
    const contract = yield call(getSystemReserveInstance);
    const data = yield contract.availableAmount();
    yield put(getAvailableAmountSuccess(fN(fromWei(data))));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    yield put(getAvailableAmountError(0));
  }
}

export default [
  takeEvery(actionTypes.GET_AVAILABLE_AMOUNT, getAvailableAmountGenerator),
  takeEvery(actionTypes.GET_SYSTEM_RESERVE_BALANCE, getSystemReserveBalanceGenerator),
];
