import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from 'store/actions/action-types/q-piggy-bank';
import {
  setError,
  setUserBalance,
  setLockedAssets,
  getUserBalance,
  getLockedAssets,
} from 'store/actions/action-creaters/q-piggy-bank';
import QPiggyBank from '../../contracts/QPiggyBank';
import { handleLockedAssetsResponse } from '../../contracts/handler/QPiggyBankHandler';
import { WeiToQ } from '../../func/balance';

let contractInstance = null;

function getContractInstance() {
  if (contractInstance === null) {
    contractInstance = new QPiggyBank();
  }
  return contractInstance;
}

function* getUserBalanceGenerator({ address }) {
  try {
    yield put({ type: actionTypes.SET_PB_DATA_IS_LOADING });

    const contract = getContractInstance();
    let data = yield contract.getUserBalance(address);
    data = WeiToQ(data);

    yield put(setUserBalance(data));
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  }
}

function* getLockedAssetsGenerator({ address }) {
  try {
    yield put({ type: actionTypes.SET_PB_DATA_IS_LOADING });

    const contract = getContractInstance();
    let data = yield contract.getLockedAssets(address);
    data = handleLockedAssetsResponse(data);

    yield put(setLockedAssets(data.votingWeight, data.votingLockingEnd));
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  }
}

function* setDepositGenerator({ address, amountQ }) {
  try {
    const contract = getContractInstance();
    const data = yield contract.deposit(address, amountQ);

    if (data.status === true) {
      yield put(getUserBalance(address));
    }
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  }
}

function* setWithdrawGenerator({ address, amountQ }) {
  try {
    const contract = getContractInstance();
    const data = yield contract.withdraw(address, amountQ);
    console.log(data);
    if (data.status === true) {
      yield put(getUserBalance(address));
    }
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  }
}

function* setLockAmountGenerator({ address, amountQ, expiration }) {
  try {
    const contract = getContractInstance();
    const data = yield contract.lock(address, amountQ, expiration);

    if (data.status === true) {
      yield put(getUserBalance(address));
      yield put(getLockedAssets(address));
    }
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  }
}

function* setUnlockAmountGenerator({ address, amountQ }) {
  try {
    const contract = getContractInstance();
    const data = yield contract.unlock(address, amountQ);

    if (data.status === true) {
      yield put(getUserBalance(address));
      yield put(getLockedAssets(address));
    }
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  }
}

function* setNewExpirationGenerator({ address, expiration }) {
  try {
    const contract = getContractInstance();
    const data = yield contract.extendExpiration(address, expiration);

    if (data.status === true) {
      yield put(getLockedAssets(address));
    }
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  }
}

function* setClaimRewardGenerator({ address }) {
  try {
    const contract = getContractInstance();
    const data = yield contract.claimQHolderReward(address);

    if (data.status === true) {
      yield put(getUserBalance(address));
    }
  } catch (err) {
    console.error('QPB.Error', err);
    yield put(setError(err.message));
  }
}

export default [
  takeEvery(actionTypes.GET_PB_USER_BALANCE, getUserBalanceGenerator),
  takeEvery(actionTypes.GET_PB_LOCKED_ASSETS, getLockedAssetsGenerator),

  takeEvery(actionTypes.SET_PB_DEPOSIT_CALL, setDepositGenerator),
  takeEvery(actionTypes.SET_PB_WITHDRAW_CALL, setWithdrawGenerator),
  takeEvery(actionTypes.SET_PB_LOCK_AMOUNT, setLockAmountGenerator),
  takeEvery(actionTypes.SET_PB_UNLOCK_AMOUNT, setUnlockAmountGenerator),
  takeEvery(actionTypes.SET_PB_NEW_EXPIRATION, setNewExpirationGenerator),
  takeEvery(actionTypes.SET_PB_CLAIM_REWARD, setClaimRewardGenerator),
];
