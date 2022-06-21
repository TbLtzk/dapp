import { call, put, takeEvery } from 'redux-saga/effects';

import * as actionTypes from './action-types';

import { getMinimumQVaultTimeLock, getQVaultTimeLocks, getUserBalance } from 'store/q-vault/action-creators';
import { getMinimumRootTimeLock, getRootNodeStakes, getRootTimeLocks } from 'store/root-node/action-creators';
import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/action-creators';
import { getMinimumValidatorsTimeLock, getSelfStake, getValidatorsTimeLocks } from 'store/validators/action-creators';
import { getMinimumVestingTimeLock, getVestingBalance, getVestingTimeLocks } from 'store/vesting/action-creators';

import {
  getQVaultInstance,
  getRootNodesInstance,
  getValidatorsInstance,
  getVestingInstance,
} from 'contracts/contract-instance';

import { CONTRACT_TYPES } from 'constants/contracts';
import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { toWei } from 'func/balance';
import { dateToTimestamp } from 'func/convertDate';
import ErrorHandler from 'func/ErrorHandler';

/* eslint-disable */
async function getContractInstance(instanceType) {
  switch (instanceType) {
    case CONTRACT_TYPES.qVault:
      return await getQVaultInstance();
    case CONTRACT_TYPES.root:
      return await getRootNodesInstance();
    case CONTRACT_TYPES.validators:
      return await getValidatorsInstance();
    case CONTRACT_TYPES.vesting:
      return await getVestingInstance();
    default:
      return {};
  }
}

export function* getAmountOnContract(instanceType, address) {
  switch (instanceType) {
    case CONTRACT_TYPES.qVault: {
      yield put(getUserBalance(address));
      yield put(getMinimumQVaultTimeLock(address));
      yield put(getQVaultTimeLocks(address));
    }
    case CONTRACT_TYPES.root: {
      yield put(getRootNodeStakes(address));
      yield put(getMinimumRootTimeLock(address));
      yield put(getRootTimeLocks(address));
    }
    case CONTRACT_TYPES.validators: {
      yield put(getSelfStake(address));
      yield put(getMinimumValidatorsTimeLock(address));
      yield put(getValidatorsTimeLocks(address));
    }
    case CONTRACT_TYPES.vesting: {
      yield put(getMinimumVestingTimeLock(address));
      yield put(getVestingTimeLocks(address));
      yield put(getVestingBalance(address));
    }
    default:
      return {};
  }
}

function* setPurgeTimeLocksAmount({ payload }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getContractInstance, payload.contract);
    yield contract.purgeTimeLocks(payload.address);

    yield call(getAmountOnContract, payload.contract, payload.address);
    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function* setDepositLockedAmount({ payload }) {
  try {
    yield put(setTransactionLoading());
    const contract = yield call(getContractInstance, payload.contract);
    yield contract.depositOnBehalfOf(
      payload.address,
      dateToTimestamp(payload.startDate),
      dateToTimestamp(payload.endDate),
      { value: toWei(payload.amount) }
    );
    yield call(getAmountOnContract, payload.contract, payload.address);
    yield put(setTransactionLoadingSuccess({ type: formTypes.timeLocksAmount }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

export default [
  takeEvery(actionTypes.SET_PURGEAMOUNT_CALL, setPurgeTimeLocksAmount),
  takeEvery(actionTypes.SET_LOCKEDAMOUNT_CALL, setDepositLockedAmount),
];
