import { put, takeEvery, call, select } from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/vesting";
import { SET_TRANSACTION_COUNTER } from "../actions/action-types/transaction-handler";
import {
  getVestingBalance,
  setVestingBalance,
  getMinimumVestingTimeLock,
  setMinimumVestingTimeLock,
  getVestingTimeLocks,
  setVestingTimeLocks,
  setVestingWithdraw,
  setVestingDeposit,
} from "store/actions/action-creaters/vesting";

import { toWei } from "func/balance";
import { addIndex } from "func/useful";

import { contractRegistryInstance } from "contracts/contracts";

let vestingInstance = null;

const initContract = async () => {
  if (vestingInstance === null) {
    vestingInstance = await contractRegistryInstance.vesting();
  }
  return vestingInstance;
};

function* getVestingBalanceGenerator({ address }) { //???
  //Vesting stake balance
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });
    // const contract = yield call(initContract);
    // const data = yield contract.getUserBalance(address);

    yield put(setVestingBalance(10));
  } catch (err) {
    console.error("QV.Error", err);
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}

function* getMinimumVestingTimeLockGenerator({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });
    
    const contract = yield call(initContract);
    const data = yield contract.getMinimumBalance(address, new Date().getTime()); //date now to mil-sec
    yield put(setMinimumVestingTimeLock(data));

  } catch (err) {
    console.error("QV.Error", err);
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}

function* getVestingTimeLocksGenerator({ address }) {
  //array time lock balance
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });
    const contract = yield call(initContract);
    const data = yield contract.getTimeLocks(address);
    yield put(setVestingTimeLocks(addIndex(data)));
  } catch (err) {
    console.error("QV.Error", err);
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}

function* setVestingDepositGenerator({ address, amountQ }) {
  //deposit  vesting
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });
    console.log("setVestingDepositGenerator");
    console.log(address, amountQ);
    // const { userAddress } = yield select((state) => state.userInf);

    // const contract = yield call(initContract);
    // const data = yield contract.deposit(toWei(amountQ), { from: userAddress });

    // if (data.status === true) {
    //   yield put(setVestingDeposit(address));
    // }
  } catch (err) {
    console.error("VestingDeposit.Error", err);
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}

function* setVestingWithdrawGenerator({ amountQ }) {
  //withdraw vesting
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });
    console.log(amountQ);
    // const { userAddress } = yield select((state) => state.userInf);

    // const contract = yield call(initContract);
    // const data = yield contract.deposit(toWei(amountQ), { from: userAddress });

    // if (data.status === true) {
    //   yield put(setVestingWithdraw(address));
    // }
  } catch (err) {
    console.error("VestingDeposit.Error", err);
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}

export default [
  takeEvery(actionTypes.GET_VESTING_BALANCE, getVestingBalanceGenerator),
  takeEvery(actionTypes.GET_VESTING_MINIMUM_TIME_LOCK, getMinimumVestingTimeLockGenerator),
  takeEvery(actionTypes.GET_VESTING_TIME_LOCKS, getVestingTimeLocksGenerator),

  takeEvery(actionTypes.SET_VESTING_WITHDRAW, setVestingWithdrawGenerator),
  takeEvery(actionTypes.SET_VESTING_DEPOSIT, setVestingDepositGenerator),
];
