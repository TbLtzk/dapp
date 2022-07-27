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

import { setTransactionLoadingError } from 'store/transaction-handler/action-creators';

import {
  getCompoundRateKeeperQVaultInstance,
  getDefaultAllocationProxyInstance,
  getQVaultInstance,
  getRootNodeRewardProxyInstance,
  getValidationRewardProxyInstance,
} from 'contracts/contract-instance';

import { captureError, getErrorMessage } from 'func/errors';
import { fixNumber } from 'func/useful';

async function allocateValue (contract, adddress) {
  await contract.allocate({ from: adddress });
  const balance = await contract.getBalance();
  return balance;
}

function* getDefaultAllocationProxyGenerator ({ isAllocate }) {
  try {
    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getDefaultAllocationProxyInstance);

    if (isAllocate) {
      yield allocateValue(contract, userAddress);
      yield put(getRootNodeRewardProxy(false));
      yield put(getValidationRewardProxy(false));
    }
    const value = yield contract.getBalance();

    yield put(getDefaultAllocationProxySuccess(fixNumber(value)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
    yield put(getDefaultAllocationProxyError(error));
  }
}

function* getRootNodeRewardProxyGenerator ({ isAllocate }) {
  try {
    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getRootNodeRewardProxyInstance);

    if (isAllocate) {
      yield allocateValue(contract, userAddress);
    }
    const value = yield contract.getBalance();
    yield put(getRootNodeRewardProxySuccess(fixNumber(value)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
    yield put(getRootNodeRewardProxyError(error));
  }
}

function* getValidationRewardProxyGenerator ({ isAllocate }) {
  try {
    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getValidationRewardProxyInstance);

    if (isAllocate) {
      yield allocateValue(contract, userAddress);
    }
    const value = yield contract.getBalance();

    yield put(getValidationRewardProxyProxySuccess(fixNumber(value)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
    yield put(getValidationRewardProxyProxyError(error));
  }
}

function* getQHolderTimeUpdateGenerator ({ isUpdateTime }) {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    if (isUpdateTime) {
      const contract = yield call(getQVaultInstance);
      yield contract.updateCompoundRate({
        from: userAddress,
        gasBuffer: 1.2,
      });
    }
    const contract = yield call(getCompoundRateKeeperQVaultInstance);
    const result = yield contract.getLastUpdate();
    yield put(getQHolderTimeUpdateSuccess(result));
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
