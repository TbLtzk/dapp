import { put, takeEvery, call } from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/locked-amount";
import { SET_TRANSACTION_COUNTER } from "../actions/action-types/transaction-handler";

import { getMinimumQVaultTimeLock, getQVaultTimeLocks } from "store/actions/action-creaters/q-vault";
import { getMinimumRootTimeLock, getRootTimeLocks } from "store/actions/action-creaters/root-contract";
import { getMinimumValidatorsTimeLock, getValidatorsTimeLocks } from "store/actions/action-creaters/validators";
import { getMinimumVestingTimeLock, getVestingTimeLocks } from "store/actions/action-creaters/vesting";

import { toWei } from "func/balance";
import { CONTRACT_TYPES } from "constants/contracts";

import { contractRegistryInstance } from "contracts/contracts";
import { dateToNumber } from "func/convertDate";

let qVaultInstance = null;
let rootNodesInstance = null;
let validatorsInstance = null;
let vestingInstance = null;

async function initContract(typeContract) {
  if (typeContract === CONTRACT_TYPES.qVault) {
    if (qVaultInstance === null) {
      qVaultInstance = await contractRegistryInstance.qVault();
    }
    return await qVaultInstance;
  } else if (typeContract === CONTRACT_TYPES.root) {
    if (rootNodesInstance === null) {
      rootNodesInstance = await contractRegistryInstance.rootNodes();
    }
    return rootNodesInstance;
  } else if (typeContract === CONTRACT_TYPES.validators) {
    if (validatorsInstance === null) {
      validatorsInstance = await contractRegistryInstance.validators();
    }
    return validatorsInstance;
  } else if (typeContract === CONTRACT_TYPES.vesting) {
    if (vestingInstance === null) {
      vestingInstance = await contractRegistryInstance.vesting();
    }
    return vestingInstance;
  }
  return null;
}

function* getAmountOnContract(contract, address) {
  if (contract === CONTRACT_TYPES.qVault) {
    yield put(getMinimumQVaultTimeLock(address));
    yield put(getQVaultTimeLocks(address));
  } else if (contract === CONTRACT_TYPES.root) {
    yield put(getMinimumRootTimeLock(address));
    yield put(getRootTimeLocks(address));
  } else if (contract === CONTRACT_TYPES.validators) {
    yield put(getMinimumValidatorsTimeLock(address));
    yield put(getValidatorsTimeLocks(address));
  } else if (contract === CONTRACT_TYPES.vesting) {
    yield put(getMinimumVestingTimeLock(address));
    yield put(getVestingTimeLocks(address));
  }
}

function* setPurgeTimeLocksAmount({ payload }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });
    const contract = yield call(initContract, payload.contract);
    const data = yield contract.purgeTimeLocks(payload.address);

    if (data.status === true) {
      yield call(getAmountOnContract, payload.contract, payload.address);
    }
  } catch (err) {
    console.error("PurgeTimeLocks.Error", err);
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}

function* setDepositLockedAmount({ payload }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });
    const contract = yield call(initContract, payload.contract);

    const data = yield contract.depositOnBehalfOf(
      payload.token,
      dateToNumber(payload.startDate),
      dateToNumber(payload.endDate),
      {
        value: toWei(payload.amountQ),
      }
    );
    if (data.status === true) {
      yield call(getAmountOnContract, payload.contract, payload.address);
    }
  } catch (err) {
    console.error("depositLockedAmount.Error", err);
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}

export default [
  takeEvery(actionTypes.SET_PURGEAMOUNT_CALL, setPurgeTimeLocksAmount),
  takeEvery(actionTypes.SET_LOCKEDAMOUNT_CALL, setDepositLockedAmount),
];

// const { userAddress } = yield select(state => state.userInf);
