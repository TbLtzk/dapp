import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  getDebt,
  getDebtError,
  getDebtSuccess,
  getSurplus,
  getSurplusError,
  getSurplusSuccess,
  getSystemBalance,
  getSystemBalanceError,
  getSystemBalanceSuccess,
  onPerformNettingError,
  onPerformNettingSuccess
} from './action-creators';
import * as actionTypes from './action-types';

import { getAccountBalance, getUserBalance } from 'store/q-vault/action-creators';
import { getSavingAviableToDeposit } from 'store/saving-assets/action-creators';
import { getSymbol } from 'store/stable-coin/action-creators';
import { getAvailableAmount, getSystemReserveBalance } from 'store/system-reserve/action-creators';
import { setTransactionLoadingError, setTransactionLoadingSuccess } from 'store/transaction-handler/action-creators';

import { getSystemBalanceInstance } from 'contracts/contract-instance';

import { TRANSACTION_TYPES } from 'constants/statuses';
import { fromWei } from 'func/balance';
import ErrorHandler from 'func/ErrorHandler';

function* getSurplusGenerator () {
  try {
    const contract = yield call(getSystemBalanceInstance);
    const data = yield contract.getSurplus();
    yield put(getSurplusSuccess(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    yield put(getSurplusError(0));
  }
}

function* getDebtGenerator () {
  try {
    const contract = yield call(getSystemBalanceInstance);
    const data = yield contract.getDebt();
    yield put(getDebtSuccess(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    yield put(getDebtError(0));
  }
}

function* getSystemBalanceGenerator () {
  try {
    const contract = yield call(getSystemBalanceInstance);
    const data = yield contract.getBalance();
    yield put(getSystemBalanceSuccess(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    yield put(getSystemBalanceError(0));
  }
}

function* onPerformNettingGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getSystemBalanceInstance);
    const data = yield contract.performNetting({ from: userAddress });
    yield put(onPerformNettingSuccess(data));
    yield put(getSystemBalance());
    yield put(getDebt());
    yield put(getSurplus());

    yield put(getAccountBalance(userAddress));
    yield put(getAvailableAmount());
    yield put(getSavingAviableToDeposit());
    yield put(getUserBalance(userAddress));
    yield put(getSymbol());
    yield put(getSystemReserveBalance());

    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
    yield put(onPerformNettingError(error));
  }
}

export default [
  takeEvery(actionTypes.GET_SURPLUS, getSurplusGenerator),
  takeEvery(actionTypes.GET_DEBT, getDebtGenerator),
  takeEvery(actionTypes.GET_SYSTEM_BALANCE, getSystemBalanceGenerator),
  takeEvery(actionTypes.ON_PERFORM_NETTING, onPerformNettingGenerator)
];
