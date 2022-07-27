import { call, put, select, takeEvery } from 'redux-saga/effects';

import { setMinimumVestingTimeLock, setVestingBalance, setVestingTimeLocks } from './action-creators';
import * as actionTypes from './action-types';

import { getAmountOnContract } from 'store/locked-amount/sagas';
import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/action-creators';

import { getVestingInstance } from 'contracts/contract-instance';

import { CONTRACT_TYPES } from 'constants/contracts';
import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { fromWei, toWei } from 'func/balance';
import { getNowTimestamp } from 'func/convertDate';
import { captureError, getErrorMessage } from 'func/errors';
import { addIndex } from 'func/useful';

function* getVestingBalanceGenerator ({ address }) {
  try {
    const contract = yield call(getVestingInstance);
    const data = yield contract.balanceOf(address);
    yield put(setVestingBalance(fromWei(data)));
  } catch (error) {
    captureError(error);
  }
}

function* getMinimumVestingTimeLockGenerator ({ address }) {
  try {
    const contract = yield call(getVestingInstance);
    const data = yield contract.getMinimumBalance(address, getNowTimestamp());
    yield put(setMinimumVestingTimeLock(Number(fromWei(data))));
  } catch (error) {
    captureError(error);
  }
}

function* getVestingTimeLocksGenerator ({ address }) {
  try {
    const contract = yield call(getVestingInstance);
    const data = yield contract.getTimeLocks(address);
    yield put(setVestingTimeLocks(addIndex(data)));
  } catch (error) {
    captureError(error);
  }
}

function* setVestingDepositGenerator () {
  try {
    yield put(setTransactionLoading());
    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setVestingWithdrawGenerator ({ amountQ }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getVestingInstance);

    yield contract.withdraw(toWei(amountQ), { from: userAddress });

    yield call(getAmountOnContract, CONTRACT_TYPES.vesting, userAddress);
    yield put(setTransactionLoadingSuccess({ type: formTypes.vestingWithdraw }));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

export default [
  takeEvery(actionTypes.GET_VESTING_BALANCE, getVestingBalanceGenerator),
  takeEvery(actionTypes.GET_VESTING_MINIMUM_TIME_LOCK, getMinimumVestingTimeLockGenerator),
  takeEvery(actionTypes.GET_VESTING_TIME_LOCKS, getVestingTimeLocksGenerator),

  takeEvery(actionTypes.SET_VESTING_WITHDRAW, setVestingWithdrawGenerator),
  takeEvery(actionTypes.SET_VESTING_DEPOSIT, setVestingDepositGenerator),
];
