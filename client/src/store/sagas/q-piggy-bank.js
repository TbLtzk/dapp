import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from 'store/actions/action-types/q-piggy-bank';
import {
  setError,
  setUserBalance,
  setLockedAssets,
  getUserBalance,
  getLockedAssets,
  getDelegationsListError, getDelegationsListSuccess
} from 'store/actions/action-creaters/q-piggy-bank';
import QPiggyBank from 'contracts/src/QPiggyBank';
import { handleLockedAssetsResponse } from 'contracts/handler/QPiggyBankHandler';
import { SET_TRANSACTION_COUNTER } from '../actions/action-types/transaction-handler';
import { web3 } from 'contracts/config/drizzle-config';

let contractInstance = null;

function getContractInstance() {
  if (contractInstance === null) {
    contractInstance = new QPiggyBank();
  }
  return contractInstance;
}

function* getUserBalanceGenerator({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    });

    const contract = getContractInstance();
    let data = yield contract.getUserBalance(address);
    data = web3.utils.fromWei(data);

    yield put(setUserBalance(data));
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    });
  }
}

function* getLockedAssetsGenerator({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    });

    const contract = getContractInstance();
    let data = yield contract.getLockInfo(address);
    data = handleLockedAssetsResponse(data);
    yield put(setLockedAssets(data.votingWeight, data.votingLockingEnd));
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    });
  }
}

function* setDepositGenerator({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    });

    const contract = getContractInstance();
    const data = yield contract.deposit(address, amountQ);

    if (data.status === true) {
      yield put(getUserBalance(address));
    }
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    });
  }
}

function* setWithdrawGenerator({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    });

    const contract = getContractInstance();
    const data = yield contract.withdraw(address, amountQ);

    if (data.status === true) {
      yield put(getUserBalance(address));
    }
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    });
  }
}

function* setLockAmountGenerator({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    });

    const contract = getContractInstance();
    const data = yield contract.lock(address, amountQ);

    if (data.status === true) {
      yield put(getUserBalance(address));
      yield put(getLockedAssets(address));
    }
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    });
  }
}

function* setUnlockAmountGenerator({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    });

    const contract = getContractInstance();
    const data = yield contract.unlock(address, amountQ);

    if (data.status === true) {
      yield put(getUserBalance(address));
      yield put(getLockedAssets(address));
    }
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    });
  }
}

function* getDelegationList({ address }) {
  try {
    const contract = getContractInstance();
    const data = yield contract.getDelegations(address);
    yield put(getDelegationsListSuccess(data));
  } catch (err) {
    console.error('getDelegationList.Error', err);
    yield put(getDelegationsListError(err));
  }
}

export default [
  takeEvery(actionTypes.GET_PB_USER_BALANCE, getUserBalanceGenerator),
  takeEvery(actionTypes.GET_PB_LOCKED_ASSETS, getLockedAssetsGenerator),

  takeEvery(actionTypes.SET_PB_DEPOSIT_CALL, setDepositGenerator),
  takeEvery(actionTypes.SET_PB_WITHDRAW_CALL, setWithdrawGenerator),
  takeEvery(actionTypes.SET_PB_LOCK_AMOUNT, setLockAmountGenerator),
  takeEvery(actionTypes.SET_PB_UNLOCK_AMOUNT, setUnlockAmountGenerator),
  takeEvery(actionTypes.GET_DELEGATIONS_LIST, getDelegationList),
];
