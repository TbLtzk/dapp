import { call, put, takeEvery } from 'redux-saga/effects';

import { setAliases, setAliasesLoading, setAliasEvents, setEventsLoading } from './action-creators';
import * as actionTypes from './action-types';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/actions';

import { getAccountAliasesInstance } from 'contracts/contract-instance';
import { getAliasEvents } from 'contracts/helpers/account-aliases-helper';

import { TRANSACTION_TYPES } from 'constants/statuses';
import { captureError, getErrorMessage, getSuccessMessage } from 'func/errors';

function* getAliasesGenerator ({ address }) {
  try {
    yield put(setAliasesLoading(true));
    const contract = yield call(getAccountAliasesInstance);
    const aliases = yield contract.getAliases(address);
    yield put(setAliases(aliases));
  } catch (error) {
    captureError(error);
    yield put(setAliases([]));
  } finally {
    yield put(setAliasesLoading(false));
  }
}

function* getAliasEventsGenerator () {
  try {
    yield put(setEventsLoading(true));
    const events = yield call(getAliasEvents);
    yield put(setAliasEvents(events));
  } catch (error) {
    captureError(error);
    yield put(setAliasEvents([]));
  } finally {
    yield put(setEventsLoading(false));
  }
}

function* setAliasGenerator ({ address, purpose, label }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getAccountAliasesInstance);
    const transaction = yield contract.setAlias(address, purpose);

    yield put(
      setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label))
    );
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* reserveAliasGenerator ({ address, label }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getAccountAliasesInstance);
    const transaction = yield contract.reserve(address);

    yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

export default [
  takeEvery(actionTypes.GET_ALIASES, getAliasesGenerator),
  takeEvery(actionTypes.GET_ALIAS_EVENTS, getAliasEventsGenerator),
  takeEvery(actionTypes.SET_ALIAS, setAliasGenerator),
  takeEvery(actionTypes.RESERVE_ALIAS, reserveAliasGenerator),
];
