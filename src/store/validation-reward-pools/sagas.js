import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  getVRPBalance,
  getVRPDelegatorsShare,
  getVRPLastUpdateOfCompoundRate,
  getVRPPoolInfo,
  setRewardPoolsBalance,
  setVRPBalance,
  setVRPDelegatorsShareData,
  setVRPLastUpdateOfCompoundRateData,
  setVRPLoadingValidatorsCompoundRate,
  setVRPPoolInfo,
} from './action-creators';
import * as actionTypes from './action-types';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/actions';

import { getValidationRewardPoolsInstance } from 'contracts/contract-instance';

import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { fromWei } from 'utils/balance';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';
import { transformToPercentage } from 'utils/formatters';
import { getPercentageFormat } from 'utils/useful';

const message = { header: 'Notice', details: 'Stake amount below minimum to apply new rate, old rate applied.' };

function* setUpdateValidatorsCompoundRateGenerator ({ address, label }) {
  try {
    const { lastUpdateOfCompoundRate } = yield select((state) => state.validationRewardPools);

    yield put(setVRPLoadingValidatorsCompoundRate(true));
    const contract = yield call(getValidationRewardPoolsInstance);
    const transaction = yield contract.updateValidatorsCompoundRate(address, { from: address });
    const nextUpdateCompoundRate = yield contract.getLastUpdateOfCompoundRate(address);

    // Here can be a problem with error
    if (lastUpdateOfCompoundRate === nextUpdateCompoundRate) {
      yield put(setTransactionLoadingError(message));
    }

    yield put(getVRPLastUpdateOfCompoundRate(address));
    yield put(getVRPDelegatorsShare(address));
    yield put(getVRPBalance(address));
    yield put(getVRPPoolInfo(address));
    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  } finally {
    yield put(setVRPLoadingValidatorsCompoundRate(false));
  }
}

function* setDelegatorsShareGenerator ({ amount, label }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getValidationRewardPoolsInstance);
    const transaction = yield contract.setDelegatorsShare(getPercentageFormat(amount));
    yield put(getVRPDelegatorsShare(userAddress));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.validatorsPool, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* getDelegatorsShareGenerator ({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getDelegatorsShare(address);
    yield put(setVRPDelegatorsShareData(transformToPercentage(data)));
  } catch (error) {
    captureError(error);
  }
}

function* getBalanceGenerator ({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getPoolInfo(address);
    yield put(setVRPBalance(fromWei(data.poolBalance)));
  } catch (error) {
    captureError(error);
  }
}

function* getPoolInfoGenerator ({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getPoolInfo(address);
    yield put(setVRPPoolInfo(fromWei(data.reservedForClaims)));
  } catch (error) {
    captureError(error);
  }
}

function* getLastUpdateOfCompoundRateGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getLastUpdateOfCompoundRate(userAddress);
    yield put(setVRPLastUpdateOfCompoundRateData(data));
  } catch (error) {
    captureError(error);
  }
}

function* getRewardPoolsBalanceGenerator () {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const amount = yield contract.getBalance();
    yield put(setRewardPoolsBalance(amount));
  } catch (error) {
    captureError(error);
  }
}

export default [
  takeEvery(actionTypes.SET_VRP_DELEGATOR_SHARE, setDelegatorsShareGenerator),
  takeEvery(actionTypes.SET_VRP_UPDATE_VALIDATORS_COMPOUND_RATE, setUpdateValidatorsCompoundRateGenerator),

  takeEvery(actionTypes.GET_VRP_LAST_UPDATE_OF_COMPOUND_RATE, getLastUpdateOfCompoundRateGenerator),
  takeEvery(actionTypes.GET_VRP_DELEGATOR_SHARE, getDelegatorsShareGenerator),
  takeEvery(actionTypes.GET_VRP_POOL_INFO, getPoolInfoGenerator),
  takeEvery(actionTypes.GET_VRP_BALANCE, getBalanceGenerator),
  takeEvery(actionTypes.GET_REWARD_POOLS_BALANCE, getRewardPoolsBalanceGenerator),
];
