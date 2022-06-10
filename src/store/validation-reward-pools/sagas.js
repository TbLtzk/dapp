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
} from 'store/transaction-handler/action-creators';

import { getValidationRewardPoolsInstance } from 'contracts/contract-instance';

import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { fromWei } from 'func/balance';
import ErrorHandler from 'func/ErrorHandler';
import { getPercentageFormat, uintPercentToNumber } from 'func/useful';

const message = { header: 'Notice', details: 'Stake amount below minimum to apply new rate, old rate applied.' };

function * setUpdateValidatorsCompoundRateGenerator ({ address }) {
  try {
    const { lastUpdateOfCompoundRate } = yield select((state) => state.validationRewardPools);

    yield put(setVRPLoadingValidatorsCompoundRate(true));
    const contract = yield call(getValidationRewardPoolsInstance);
    yield contract.updateValidatorsCompoundRate(address, { from: address });
    const nextUpdateCompoundRate = yield contract.getLastUpdateOfCompoundRate(address);

    if (lastUpdateOfCompoundRate === nextUpdateCompoundRate) {
      yield put(setTransactionLoadingError(message));
    }

    yield put(getVRPLastUpdateOfCompoundRate(address));
    yield put(getVRPDelegatorsShare(address));
    yield put(getVRPBalance(address));
    yield put(getVRPPoolInfo(address));
    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  } finally {
    yield put(setVRPLoadingValidatorsCompoundRate(false));
  }
}

function * setDelegatorsShareGenerator ({ amount }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getValidationRewardPoolsInstance);
    yield contract.setDelegatorsShare(getPercentageFormat(amount));
    yield put(getVRPDelegatorsShare(userAddress));

    yield put(setTransactionLoadingSuccess({ type: formTypes.validatorsPool }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * getDelegatorsShareGenerator ({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getDelegatorsShare(address);
    const result = uintPercentToNumber(data) * 100;
    yield put(setVRPDelegatorsShareData(result));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getBalanceGenerator ({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getPoolInfo(address);
    yield put(setVRPBalance(fromWei(data.poolBalance)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getPoolInfoGenerator ({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getPoolInfo(address);
    yield put(setVRPPoolInfo(fromWei(data.reservedForClaims)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getLastUpdateOfCompoundRateGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getLastUpdateOfCompoundRate(userAddress);
    yield put(setVRPLastUpdateOfCompoundRateData(data));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getRewardPoolsBalanceGenerator () {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const amount = yield contract.getBalance();
    yield put(setRewardPoolsBalance(amount));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
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
