import { put, takeEvery } from 'redux-saga/effects';

import * as actionTypes from './action-types';

import { getAccountBalance, getUserBalance } from 'store/q-vault/action-creators';
import { getBaseVotingWeightInfo } from 'store/voting/proposals/actions';

import { captureError } from 'func/errors';

function* getBalancesGenerator () {
  try {
    yield put(getAccountBalance());
    yield put(getUserBalance());
    yield put(getBaseVotingWeightInfo());
  } catch (error) {
    captureError(error);
  }
}

export default [
  takeEvery(actionTypes.GET_BALANCES, getBalancesGenerator),
];
