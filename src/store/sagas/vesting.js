import { put, takeEvery, call, select } from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/vesting";
import { SET_TRANSACTION_COUNTER } from "../actions/action-types/transaction-handler";
import {
  setError,
  setQVaultAmount,
  setRootNodeAmount,
  setValidatorAmount,
  setVestingAmount,
} from "store/actions/action-creaters/vesting";

import { toWei } from "func/balance";

import { contractRegistryInstance } from "contracts/contracts";

let vestingInstance = null;

const initContract = () => {
  if (vestingInstance === null) {
    vestingInstance = await contractRegistryInstance.vesting();
  }
  return vestingInstance;
};

function* getVestingBalanceGenerator({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });

    const contract = yield call(initContract);
    const data = yield contract.getUserBalance(address);

    yield put(setVestingBalance(fromWei(data)));
  } catch (err) {
    console.error("QV.Error", err);
    yield put(setError(err.message));
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}

function* setWithdrawGenerator({ amountQ, address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(initContract);
    const data = yield contract.deposit(toWei(amountQ), { from: userAddress });

    if (data.status === true) {
      yield put(getVestingBalance(address));
    }
  } catch (err) {
    console.error("QV.Error", err);
    yield put(setError(err.message));
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}
