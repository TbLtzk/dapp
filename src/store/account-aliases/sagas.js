import { call, put, takeEvery } from 'redux-saga/effects';

import { setAliases, setAliasesLoading, setAliasEvents, setEventsLoading } from './action-creators';
import * as actionTypes from './action-types';

import { setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess } from 'store/transaction-handler/action-creators';

import { getAccountAliasesInstance } from 'contracts/contract-instance';
import { getAliasEvents } from 'contracts/helpers/account-aliases-helper';

import { TRANSACTION_TYPES } from 'constants/statuses';
import ErrorHandler from 'func/ErrorHandler';

function* getAliasesGenerator ({ address }) {
  try {
    yield put(setAliasesLoading(true));
    const contract = yield call(getAccountAliasesInstance);
    const aliases = yield contract.getAliases(address);
    yield put(setAliases(aliases));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
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
    ErrorHandler.processWithoutFeedback(error);
    yield put(setAliasEvents([]));
  } finally {
    yield put(setEventsLoading(false));
  }
}

function* setAliasGenerator ({ address, purpose }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getAccountAliasesInstance);
    yield contract.setAlias(address, purpose);

    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function* reserveAliasGenerator ({ address }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getAccountAliasesInstance);
    yield contract.reserve(address);

    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

export default [
  takeEvery(actionTypes.GET_ALIASES, getAliasesGenerator),
  takeEvery(actionTypes.GET_ALIAS_EVENTS, getAliasEventsGenerator),
  takeEvery(actionTypes.SET_ALIAS, setAliasGenerator),
  takeEvery(actionTypes.RESERVE_ALIAS, reserveAliasGenerator),
];
