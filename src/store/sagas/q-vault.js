import { put, select, takeEvery, call } from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/q-vault";
import { SET_TRANSACTION_COUNTER } from "../actions/action-types/transaction-handler";
import {
  setError,
  setUserBalance,
  setLockedAssets,
  setMinimumQVaultTimeLock,
  setQVaultTimeLocks,
  getUserBalance,
  getLockedAssets,
  getDelegationsListError,
  getDelegationsListSuccess,
  getQVBalanceSuccess,
  getOutstandingDelegationRewardsSuccess,
  getOutstandingDelegationRewardsError,
  getOutstandingDelegationRewards,
  getDelegationsList,
} from "store/actions/action-creaters/q-vault";
import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from "../actions/action-creaters/transaction-handler";

import QVault from "contracts/src/QVault";
import { handleLockedAssetsResponse } from "contracts/handler/QVaultHandler";
import { contractsToAddresses } from "contracts/mapping/contract-to-address";
import { toWei, fromWei } from "func/balance";
import { addIndex } from "func/useful";

import { contractRegistryInstance } from "contracts/contracts";

let contractInstance = null;

function getContractInstance() {
  if (contractInstance === null) {
    contractInstance = new QVault(contractsToAddresses.QVault);
  }
  return contractInstance;
}

function* getUserBalanceGenerator({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });

    const contract = getContractInstance();
    const data = yield contract.getUserBalance(address);

    yield put(setUserBalance(fromWei(data)));
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

function* getLockedAssetsGenerator({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });

    const contract = getContractInstance();
    let data = yield contract.getLockInfo(address);
    data = handleLockedAssetsResponse(data);
    yield put(setLockedAssets(data.votingWeight, data.votingLockingEnd));
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

function* setDepositGenerator({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });

    const contract = getContractInstance();
    const data = yield contract.deposit(address, toWei(amountQ));

    if (data.status === true) {
      yield put(getUserBalance(address));
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

function* setWithdrawGenerator({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });

    const contract = getContractInstance();
    const data = yield contract.withdraw(address, toWei(amountQ));

    if (data.status === true) {
      yield put(getUserBalance(address));
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

function* setLockAmountGenerator({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });

    const contract = getContractInstance();
    const data = yield contract.lock(address, toWei(amountQ));

    if (data.status === true) {
      yield put(getUserBalance(address));
      yield put(getLockedAssets(address));
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

function* setUnlockAmountGenerator({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });

    const contract = getContractInstance();
    const data = yield contract.unlock(address, toWei(amountQ));

    if (data.status === true) {
      yield put(getUserBalance(address));
      yield put(getLockedAssets(address));
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

function* getDelegationList() {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = getContractInstance();
    const data = yield contract.getDelegations(userAddress);
    yield put(getDelegationsListSuccess(data));
  } catch (err) {
    console.error("getDelegationList.Error", err);
    yield put(getDelegationsListError(err));
  }
}

function* getBalanceDetails() {
  try {
    const contract = getContractInstance();
    const data = yield contract.getBalanceDetails();
    yield put(getQVBalanceSuccess(data));
  } catch (err) {
    console.error("getDelegationList.Error", err);
  }
}

function* getOutstandingDelegationRewardsValue() {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = getContractInstance();

    const data = yield contract.getOutstandingDelegationRewards(userAddress);
    yield put(getOutstandingDelegationRewardsSuccess(data));
  } catch (err) {
    console.error("getOutstandingDelegationRewards.Error", err);
    yield put(getOutstandingDelegationRewardsError(err.message));
  }
}

function* onClaimStakeDelegatorReward() {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select((state) => state.userInf);
    const contract = getContractInstance();

    yield contract.claimStakeDelegatorReward(userAddress);
    yield put(getOutstandingDelegationRewards());
    yield put(getDelegationsList());
    yield put(setTransactionLoadingSuccess());
  } catch (err) {
    console.error("onClaimStakeDelegatorReward.Error", err);
    yield put(setTransactionLoadingError(err.message));
  }
}

//sdk

let qVaultInstance = null;

const initContract = async () => {
  if (qVaultInstance === null) {
    qVaultInstance = await contractRegistryInstance.qVault();
  }
  return qVaultInstance;
};

function* getMinimumQVaultTimeLockGenerator({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });

    const contract = yield call(initContract);
    const data = yield contract.getMinimumBalance(address, new Date().getTime()); //date now to mil-sec
    yield put(setMinimumQVaultTimeLock(data));
  } catch (err) {
    console.error("getMinimumQVaultTimeLockGenerator.Error", err);
    yield put(setError(err.message));
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}

function* getQVaultTimeLocksGenerator({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });

    const contract = yield call(initContract);
    const data = yield contract.getTimeLocks(address);
    yield put(setQVaultTimeLocks(addIndex(data)));
  } catch (err) {
    console.error("getQVaultTimeLocksGenerator.Error", err);
    yield put(setError(err.message));
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}

export default [
  takeEvery(actionTypes.GET_QV_USER_BALANCE, getUserBalanceGenerator),
  takeEvery(actionTypes.GET_QV_LOCKED_ASSETS, getLockedAssetsGenerator),

  takeEvery(actionTypes.SET_QV_DEPOSIT_CALL, setDepositGenerator),
  takeEvery(actionTypes.SET_QV_WITHDRAW_CALL, setWithdrawGenerator),
  takeEvery(actionTypes.SET_QV_LOCK_AMOUNT, setLockAmountGenerator),
  takeEvery(actionTypes.SET_QV_UNLOCK_AMOUNT, setUnlockAmountGenerator),
  takeEvery(actionTypes.GET_DELEGATIONS_LIST, getDelegationList),

  takeEvery(actionTypes.GET_QV_BALANCE, getBalanceDetails),
  takeEvery(actionTypes.ON_CLAIM_STAKE_DELEGATOR_REWARD, onClaimStakeDelegatorReward),
  takeEvery(actionTypes.GET_OUTSTANDING_DELEGATION_REWARDS, getOutstandingDelegationRewardsValue),

  //sdk
  takeEvery(actionTypes.GET_QVAULT_MINIMUM_TIME_LOCK, getMinimumQVaultTimeLockGenerator),
  takeEvery(actionTypes.GET_QVAULT_TIME_LOCKS, getQVaultTimeLocksGenerator),
];
