/* eslint-disable */
import { put, takeEvery, select, call } from "redux-saga/effects";
import * as actionTypes from "store/actions/action-types/validation-reward-pools";

import {
  setVRPBalance,
  setVRPPoolInfo,
  getVRPDelegatorsShare,
  setVRPDelegatorsShareData,
} from "store/actions/action-creaters/validation-reward-pools";

import { SET_TRANSACTION_COUNTER } from "../actions/action-types/transaction-handler";

import { getValidationRewardPoolsInstance } from "contracts/contract-instance";
import { setErrorMessage } from "store/actions/action-creaters/transaction-handler";
import { getPercentageFormat, uintPercentToNumber } from "func/useful";
import { fromWei } from "func/balance";
import ErrorHandler from "func/ErrorHandler";

function* setDelegatorsShareGenerator({ amount }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });
    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.setDelegatorsShare(getPercentageFormat(amount));

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
    const result = uintPercentToNumber(data) * 100
    yield put(setVRPDelegatorsShareData(result));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function* getBalanceGenerator({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getBalance(address);
    yield put(setVRPBalance(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function* getPoolInfoGenerator({ address }) {
  try {
    const contract = yield call(getValidationRewardPoolsInstance);
    const data = yield contract.getPoolInfo(address);
    yield put(setVRPPoolInfo(data));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

export default [
  takeEvery(actionTypes.SET_VRP_DELEGATOR_SHARE, setDelegatorsShareGenerator),

  takeEvery(actionTypes.GET_VRP_DELEGATOR_SHARE, getDelegatorsShareGenerator),
  takeEvery(actionTypes.GET_VRP_POOL_INFO, getPoolInfoGenerator),
  takeEvery(actionTypes.GET_VRP_BALANCE, getBalanceGenerator),
];
