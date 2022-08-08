
import { put, takeEvery } from 'typed-redux-saga';

import * as types from './types';

import { getAccountBalance, getUserBalance } from 'store/q-vault/action-creators';
import { getBaseVotingWeightInfo } from 'store/voting/proposals/actions';

import { captureError } from 'utils/errors';

function* getBalancesGenerator () {
  try {
    yield* put(getAccountBalance());
    yield* put(getUserBalance());
    yield* put(getBaseVotingWeightInfo());
  } catch (error) {
    captureError(error);
  }
}

export default [
  takeEvery<types.GetUserBalances>('GET_USER_BALANCES', getBalancesGenerator),
];
