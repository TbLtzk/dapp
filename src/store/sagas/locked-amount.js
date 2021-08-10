import { put, takeEvery, call, select } from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/locked-amount";
import { SET_TRANSACTION_COUNTER } from "../actions/action-types/transaction-handler";
import {
  setError,
  setQVaultAmount,
  setRootNodeAmount,
  setValidatorAmount,
  setVestingAmount,
  getVestingAmount,
  getValidatorAmount,
  getRootNodeAmount,
  getQVaultAmount,
} from "store/actions/action-creaters/locked-amount";

import { toWei } from "func/balance";
import { CONTRACT_TYPES } from "constants/contracts";

import { contractRegistryInstance } from "contracts/contracts";
import { addIndex, dateToNumber } from "func/useful";

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
    yield put(getQVaultAmount(address));
  } else if (contract === CONTRACT_TYPES.root) {
    yield put(getRootNodeAmount(address));
  } else if (contract === CONTRACT_TYPES.validators) {
    yield put(getValidatorAmount(address));
  } else if (contract === CONTRACT_TYPES.vesting) {
    yield put(getVestingAmount(address));
  }
}

function* getQVaultAmountGenerator({ address }) {
  try {
    console.log(address, "1");
    const contract = yield call(initContract, CONTRACT_TYPES.qVault);
    const minQVaultAmount = yield contract.getMinimumBalance(address, new Date().getTime());
    const array = yield contract.getTimeLocks(address);
    const lockedQVaultAmounts = addIndex(array);
    yield put(setQVaultAmount({ minQVaultAmount, lockedQVaultAmounts }));
  } catch (err) {
    console.error("getQVaultAmount.Error", err);
    yield put(setError(err.message));
  }
}

function* getRootNodeAmountGenerator({ address }) {
  try {
    const contract = yield call(initContract, CONTRACT_TYPES.root);
    const minRootNodeAmount = yield contract.getMinimumBalance(address, new Date().getTime());
    const array = yield contract.getTimeLocks(address);
    const lockedRootNodeAmounts = addIndex(array);
    yield put(setRootNodeAmount({ minRootNodeAmount, lockedRootNodeAmounts }));
  } catch (err) {
    console.error("getRootNodeAmount.Error", err);
    yield put(setError(err.message));
  }
}

function* getValidatorAmountGenerator({ address }) {
  try {
    const contract = yield call(initContract, CONTRACT_TYPES.validators);
    const minValidatorAmount = yield contract.getMinimumBalance(address, new Date().getTime());
    const array = yield contract.getTimeLocks(address);
    const lockedValidatorAmounts = addIndex(array);
    yield put(setValidatorAmount({ minValidatorAmount, lockedValidatorAmounts }));
  } catch (err) {
    console.error("getValidatorAmount.Error", err);
    yield put(setError(err.message));
  }
}

function* getVestingAmountGenerator({ address }) {
  try {
    const contract = yield call(initContract, CONTRACT_TYPES.vesting);
    const minVestingAmount = yield contract.getMinimumBalance(address, new Date().getTime());
    const array = yield contract.getTimeLocks(address);
    const lockedVestingAmounts = addIndex(array);
    yield put(setVestingAmount({ minVestingAmount, lockedVestingAmounts }));
  } catch (err) {
    console.error("vestingAmount.Error", err);
    yield put(setError(err.message));
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
    yield put(setError(err.message));
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
      yield call(getAmountOnContract, payload.contract, payload.token);
    }
  } catch (err) {
    console.error("depositLockedAmount.Error", err);
    yield put(setError(err.message));
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1,
    });
  }
}

export default [
  takeEvery(actionTypes.GET_QVAULT_AMOUNT, getQVaultAmountGenerator),
  takeEvery(actionTypes.GET_ROOTNODE_AMOUNT, getRootNodeAmountGenerator),
  takeEvery(actionTypes.GET_VALIDATOR_AMOUNT, getValidatorAmountGenerator),
  takeEvery(actionTypes.GET_VESTING_AMOUNT, getVestingAmountGenerator),

  takeEvery(actionTypes.SET_QVAULT_AMOUNT, setQVaultAmount),
  takeEvery(actionTypes.SET_ROOTNODE_AMOUNT, setRootNodeAmount),
  takeEvery(actionTypes.SET_VALIDATOR_AMOUNT, setValidatorAmount),
  takeEvery(actionTypes.SET_VESTING_AMOUNT, setVestingAmount),

  takeEvery(actionTypes.SET_PURGEAMOUNT_CALL, setPurgeTimeLocksAmount),

  takeEvery(actionTypes.SET_LOCKEDAMOUNT_CALL, setDepositLockedAmount),
];

// const { userAddress } = yield select(state => state.userInf);
