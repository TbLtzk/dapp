/* eslint-disable */
import { put, takeEvery, select, call } from "redux-saga/effects";
import * as actionTypes from "./action-types";

import {
  setVRPBalance,
  setVRPPoolInfo,
  getVRPDelegatorsShare,
  setVRPDelegatorsShareData,
  setVRPLastUpdateOfCompoundRateData,
  getVRPLastUpdateOfCompoundRate,
  setVRPLoadingValidatorsCompoundRate,
  getVRPBalance,
  setIsStakerRewardPoolMsgDisplayed,
  setRewardPoolsBalance,
} from "./action-creators";

import { SET_TRANSACTION_COUNTER } from "store/transaction-handler/action-types";

import { getValidationRewardPoolsInstance } from "contracts/contract-instance";
import { setErrorMessage } from "store/transaction-handler/action-creators";
import { BN, fN, getPercentageFormat, uintPercentToNumber } from "func/useful";
import ErrorHandler from "func/ErrorHandler";
import { fromWei } from "func/balance";

function* setUpdateValidatorsCompoundRateGenerator({ address }) {
  try {
    const {
      balance,
      poolInfo,
      lastUpdateOfCompoundRate: previousLastUpdateCompoundRate,
    } = yield select((state) => state.validationRewardPools);
    const disDelClaims = +balance - +poolInfo;

    yield put(setVRPLoadingValidatorsCompoundRate(true));
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.updateValidatorsCompoundRate(address, { from: address });
    if (data.status) {
      yield put(getVRPLastUpdateOfCompoundRate(address));
      yield put(getVRPDelegatorsShare(address));
      yield put(getVRPBalance(address));
      yield call(getPoolInfoGenerator, { address });
      const { lastUpdateOfCompoundRate: newInfo } = yield select((state) => state.validationRewardPools);
      yield put(setIsStakerRewardPoolMsgDisplayed(disDelClaims <= 0 || previousLastUpdateCompoundRate === newInfo));
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setErrorMessage(errorMsg));
  } finally {
    yield put(setVRPLoadingValidatorsCompoundRate(false));
    yield put(setIsStakerRewardPoolMsgDisplayed(false));
  }
}

function* setDelegatorsShareGenerator({ amount }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });
    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getValidationRewardPoolsInstance);
    yield contract.setDelegatorsShare(getPercentageFormat(amount));
    if (data.status) {
      yield put(getVRPDelegatorsShare(userAddress));
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setErrorMessage(errorMsg));
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}

function* getDelegatorsShareGenerator({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getDelegatorsShare(address);
    const result = uintPercentToNumber(data) * 100;
    yield put(setVRPDelegatorsShareData(result));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function* getBalanceGenerator({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getPoolInfo(address);
    yield put(setVRPBalance(fromWei(data.poolBalance)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}


function* getPoolInfoGenerator({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getPoolInfo(address);
    yield put(setVRPPoolInfo(fromWei(data.reservedForClaims)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function* getLastUpdateOfCompoundRateGenerator() {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getValidationRewardPoolsInstance);    
    const data = yield contract.getLastUpdateOfCompoundRate(userAddress)
    yield put(setVRPLastUpdateOfCompoundRateData(data));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function* getRewardPoolsBalanceGenerator() {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const amount = yield contract.getBalance()
    yield put(setRewardPoolsBalance(fN(BN(amount).toFixed())));
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
