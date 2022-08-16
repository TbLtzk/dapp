import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  getDefaultAllocationProxyError,
  getDefaultAllocationProxySuccess,
  getQHolderTimeUpdateError,
  getQHolderTimeUpdateSuccess,
  getRootNodeRewardProxy,
  getRootNodeRewardProxyError,
  getRootNodeRewardProxySuccess,
  getValidationRewardProxy,
  getValidationRewardProxyProxyError,
  getValidationRewardProxyProxySuccess,
} from './action-creators';
import * as actionTypes from './action-types';

import { getQVBalance } from 'store/q-vault/action-creators';
import { setTransactionLoadingError, setTransactionLoadingSuccess } from 'store/transaction-handler/actions';

import {
  getCompoundRateKeeperQVaultInstance,
  getDefaultAllocationProxyInstance,
  getQVaultInstance,
  getRootNodeRewardProxyInstance,
  getValidationRewardProxyInstance,
} from 'contracts/contract-instance';

import { TRANSACTION_TYPES } from 'constants/statuses';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';

async function allocateValue (contract, adddress) {
  return await contract.allocate({ from: adddress });
}

function* getDefaultAllocationProxyGenerator ({ isAllocate, label }) {
  try {
    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getDefaultAllocationProxyInstance);

    if (isAllocate) {
      const transaction = yield allocateValue(contract, userAddress);
      yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
      yield put(getRootNodeRewardProxy(false));
      yield put(getValidationRewardProxy(false));
    }
    const value = yield contract.getBalance();

    yield put(getDefaultAllocationProxySuccess(value));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
    yield put(getDefaultAllocationProxyError(error));
  }
}

function* getRootNodeRewardProxyGenerator ({ isAllocate, label }) {
  try {
    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getRootNodeRewardProxyInstance);

    if (isAllocate) {
      const transaction = yield allocateValue(contract, userAddress);
      yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
    }
    const value = yield contract.getBalance();
    yield put(getRootNodeRewardProxySuccess(value));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
    yield put(getRootNodeRewardProxyError(error));
  }
}

function* getValidationRewardProxyGenerator ({ isAllocate, label }) {
  try {
    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getValidationRewardProxyInstance);

    if (isAllocate) {
      const transaction = yield allocateValue(contract, userAddress);
      yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
    }

    const value = yield contract.getBalance();

    yield put(getValidationRewardProxyProxySuccess(value));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
    yield put(getValidationRewardProxyProxyError(error));
  }
}

function* getQHolderTimeUpdateGenerator ({ isUpdateTime, label }) {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    if (isUpdateTime) {
      const contract = yield call(getQVaultInstance);
      const transaction = yield contract.updateCompoundRate({
        from: userAddress,
        gasBuffer: 1.2,
      });
      yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
    }
    const contract = yield call(getCompoundRateKeeperQVaultInstance);
    const result = yield contract.getLastUpdate();
    yield put(getQHolderTimeUpdateSuccess(result));
    yield put(getQVBalance());
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
    yield put(getQHolderTimeUpdateError(error));
  }
}

export default [
  takeEvery(actionTypes.GET_DEFAULT_ALLOCATION_PROXY, getDefaultAllocationProxyGenerator),
  takeEvery(actionTypes.GET_VALIDATION_REWARD_PROXY, getValidationRewardProxyGenerator),
  takeEvery(actionTypes.GET_ROOT_NODE_REWARD_PROXY, getRootNodeRewardProxyGenerator),

  takeEvery(actionTypes.GET_Q_HOLDER_TIME_UPDATE, getQHolderTimeUpdateGenerator),
];
