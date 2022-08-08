import { call, put, select, takeEvery } from 'redux-saga/effects';

import { getOutstandingDebt, getSavingAssets, getTotalSavingBalance } from '../borrowing-core/actions';

import {
  getSavingAllowance,
  getSavingAviableToDeposit,
  getSavingBalanceDetails,
  setSavingAllowance,
  setSavingAviableToDeposit,
  setSavingBalanceDetails,
} from './action-creators';
import * as actionTypes from './action-types';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/actions';

import { getSavingInstance, getStableCoinInstance } from 'contracts/contract-instance';
import { getSavingBalanceDetailsHelper } from 'contracts/helpers/saving-assets-helper';

import { MAX_APPROVE_AMOUNT } from 'constants/boundaries';
import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { fromWei, toWei } from 'utils/balance';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';

function* getSavingAllowanceGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);

    const stableCoinInstance = yield call(getStableCoinInstance);
    const savingInstance = yield call(getSavingInstance);
    const allowance = yield stableCoinInstance.allowance(userAddress, savingInstance.address);

    yield put(setSavingAllowance(allowance));
  } catch (error) {
    captureError(error);
  }
}

function* getSavingBalanceDetailsGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getSavingInstance);
    const balanceDetails = yield contract.getBalanceDetails(userAddress);
    const result = yield call(getSavingBalanceDetailsHelper, balanceDetails);
    yield put(setSavingBalanceDetails(result));
  } catch (error) {
    captureError(error);
  }
}

function* getSavingAviableToDepositGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getStableCoinInstance);
    const result = yield contract.balanceOf(userAddress);
    yield put(setSavingAviableToDeposit(fromWei(result)));
  } catch (error) {
    captureError(error);
  }
}

function* setSavingDepositGenerator ({ amount, label }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getSavingInstance);
    const transaction = yield contract.deposit(toWei(amount), { from: userAddress });

    yield put(getSavingBalanceDetails());

    yield put(getOutstandingDebt());
    yield put(getSavingAllowance());
    yield put(getTotalSavingBalance());
    yield put(getSavingAviableToDeposit());

    yield put(getSavingAssets());

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.savingAssetDeposit, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setSavingWithdrawGenerator ({ amount, label }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getSavingInstance);
    const transaction = yield contract.withdraw(toWei(amount), { from: userAddress });

    yield put(getSavingBalanceDetails());

    yield put(getOutstandingDebt());
    yield put(getSavingAllowance());
    yield put(getTotalSavingBalance());
    yield put(getSavingAviableToDeposit());

    yield put(getSavingAssets());

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.savingAssetWithdraw, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setSavingAproveGenerator ({ label }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getStableCoinInstance);
    const contractSaving = yield call(getSavingInstance);
    const transaction = yield contract.approve(contractSaving.address, MAX_APPROVE_AMOUNT, { from: userAddress });

    yield put(getSavingBalanceDetails());

    yield put(getOutstandingDebt());
    yield put(getSavingAllowance());
    yield put(getTotalSavingBalance());
    yield put(getSavingAviableToDeposit());

    yield put(getSavingAssets());

    yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

export default [
  takeEvery(actionTypes.SET_SAVING_DEPOSIT, setSavingDepositGenerator),
  takeEvery(actionTypes.SET_SAVING_WITHDRAW, setSavingWithdrawGenerator),
  takeEvery(actionTypes.SET_SAVING_APROVE, setSavingAproveGenerator),

  takeEvery(actionTypes.GET_SAVING_BALANCE_DETAILS, getSavingBalanceDetailsGenerator),
  takeEvery(actionTypes.GET_SAVING_AVIABLE_TO_DEPOSIT, getSavingAviableToDepositGenerator),
  takeEvery(actionTypes.GET_SAVING_ALLOWANCE, getSavingAllowanceGenerator),
];
