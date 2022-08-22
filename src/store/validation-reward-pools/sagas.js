import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  getVRPBalanceSuccess,
  getVRPDelegatorsShareSucccess,
  getVRPLastUpdateOfCompoundRateSuccess,
  getVRPPoolInfoSuccess,
} from './action-creators';
import * as actionTypes from './action-types';

import { userAddressMetamask } from 'store/user-inf/selectors';

import { getValidationRewardPoolsInstance } from 'contracts/contract-instance';

import { captureError } from 'utils/errors';
import { transformToPercentage } from 'utils/numbers';

function* getVRPDelegatorsShareGenerator () {
  try {
    const userAddress = yield select(userAddressMetamask);
    const contract = yield call(getValidationRewardPoolsInstance);
    const delegatorsShare = yield contract.getDelegatorsShare(userAddress);
    yield put(getVRPDelegatorsShareSucccess(Number(transformToPercentage(delegatorsShare))));
  } catch (error) {
    captureError(error);
  }
}

function* getVRPPoolInfoGenerator () {
  try {
    const userAddress = yield select(userAddressMetamask);
    const contract = yield call(getValidationRewardPoolsInstance);
    const poolInfo = yield contract.getPoolInfo(userAddress);
    yield put(getVRPPoolInfoSuccess(poolInfo));
  } catch (error) {
    captureError(error);
  }
}

function* getVRPLastUpdateOfCompoundRateGenerator () {
  try {
    const userAddress = yield select(userAddressMetamask);
    const contract = yield call(getValidationRewardPoolsInstance);
    const lastUpdateOfCompoundRate = yield contract.getLastUpdateOfCompoundRate(userAddress);
    yield put(getVRPLastUpdateOfCompoundRateSuccess(lastUpdateOfCompoundRate));
  } catch (error) {
    captureError(error);
  }
}

function* getVRPBalanceGenerator () {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const amount = yield contract.getBalance();
    yield put(getVRPBalanceSuccess(amount));
  } catch (error) {
    captureError(error);
  }
}

export default [
  takeEvery(actionTypes.GET_VRP_DELEGATORS_SHARE, getVRPDelegatorsShareGenerator),
  takeEvery(actionTypes.GET_VRP_POOL_INFO, getVRPPoolInfoGenerator),
  takeEvery(actionTypes.GET_VRP_LAST_UPDATE_OF_COMPOUND_RATE, getVRPLastUpdateOfCompoundRateGenerator),
  takeEvery(actionTypes.GET_VRP_BALANCE, getVRPBalanceGenerator),
];
