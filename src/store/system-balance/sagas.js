import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  getStableCoinTotalSupplyError,
  getStableCoinTotalSupplySuccess,
  getSystemBalanceDebtError,
  getSystemBalanceDebtSuccess,
  getSystemBalanceError,
  getSystemBalanceSuccess,
  getSystemBalanceSurplusError,
  getSystemBalanceSurplusSuccess,
  getSystemReserveAvailableAmountError,
  getSystemReserveAvailableAmountSuccess,
  getSystemReserveBalanceError,
  getSystemReserveBalanceSuccess
} from './action-creators';
import * as actionTypes from './action-types';

import { setTransactionLoadingError, setTransactionLoadingSuccess } from 'store/transaction-handler/action-creators';

import { getStableCoinInstance, getSystemBalanceInstance, getSystemReserveInstance } from 'contracts/contract-instance';

import { TRANSACTION_TYPES } from 'constants/statuses';
import { fromWei } from 'func/balance';
import { captureError, getErrorMessage } from 'func/errors';

function* setPerformNettingGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getSystemBalanceInstance);
    yield contract.performNetting({ from: userAddress });

    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* getStableCoinTotalSupplyGenerator () {
  try {
    const contract = yield call(getStableCoinInstance);
    const amount = yield contract.totalSupply();
    yield put(getStableCoinTotalSupplySuccess(fromWei(amount)));
  } catch (error) {
    yield put(getStableCoinTotalSupplyError(error));
    captureError(error);
  }
}

function* getSystemBalanceGenerator () {
  try {
    const contract = yield call(getSystemBalanceInstance);
    const data = yield contract.getBalance();
    yield put(getSystemBalanceSuccess(fromWei(data)));
  } catch (error) {
    yield put(getSystemBalanceError(error));
    captureError(error);
  }
}

function* getSystemBalanceDebtGenerator () {
  try {
    const contract = yield call(getSystemBalanceInstance);
    const data = yield contract.getDebt();
    yield put(getSystemBalanceDebtSuccess(fromWei(data)));
  } catch (error) {
    yield put(getSystemBalanceDebtError(error));
    captureError(error);
  }
}

function* getSystemBalanceSurplusGenerator () {
  try {
    const contract = yield call(getSystemBalanceInstance);
    const data = yield contract.getSurplus();
    yield put(getSystemBalanceSurplusSuccess(fromWei(data)));
  } catch (error) {
    yield put(getSystemBalanceSurplusError(0));
    captureError(error);
  }
}

function* getSystemReserveAvailableAmountGenerator () {
  try {
    const contract = yield call(getSystemReserveInstance);
    const availableAmount = yield contract.availableAmount();
    yield put(getSystemReserveAvailableAmountSuccess(fromWei(availableAmount)));
  } catch (error) {
    yield put(getSystemReserveAvailableAmountError(0));
    captureError(error);
  }
}

function* getSystemReserveBalanceGenerator () {
  try {
    const contract = yield call(getSystemReserveInstance);
    const balance = yield window.web3.eth.getBalance(contract.address);
    yield put(getSystemReserveBalanceSuccess(fromWei(balance)));
  } catch (error) {
    captureError(error);
    yield put(getSystemReserveBalanceError(error));
  }
}

export default [
  takeEvery(actionTypes.SET_PERFORM_NETTING, setPerformNettingGenerator),

  takeEvery(actionTypes.GET_SC_TOTAL_SUPPLY, getStableCoinTotalSupplyGenerator),

  takeEvery(actionTypes.GET_SB_DEBT, getSystemBalanceDebtGenerator),
  takeEvery(actionTypes.GET_SB_BALANCE, getSystemBalanceGenerator),
  takeEvery(actionTypes.GET_SB_SURPLUS, getSystemBalanceSurplusGenerator),

  takeEvery(actionTypes.GET_SR_BALANCE, getSystemReserveBalanceGenerator),
  takeEvery(actionTypes.GET_SR_AVAILABLE_AMOUNT, getSystemReserveAvailableAmountGenerator),
];
