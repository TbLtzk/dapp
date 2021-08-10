import { put, takeEvery, call, select } from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/locked-amount";
import { SET_TRANSACTION_COUNTER } from "../actions/action-types/transaction-handler";
import {
  setError,
  setQVaultAmount,
  setRootNodeAmount,
  setValidatorAmount,
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
  }
  if (typeContract === CONTRACT_TYPES.root) {
    if (rootNodesInstance === null) {
      rootNodesInstance = await contractRegistryInstance.rootNodes();
    }
    return rootNodesInstance;
  }
  if (typeContract === CONTRACT_TYPES.validators) {
    if (validatorsInstance === null) {
      validatorsInstance = await contractRegistryInstance.validators();
    }
    return validatorsInstance;
  }
  if (typeContract === CONTRACT_TYPES.vesting) {
    if (vestingInstance === null) {
      vestingInstance = await contractRegistryInstance.vesting();
    }
    return vestingInstance;
  }
  return null;
}

function* getQVaultAmount({ address }) {
  try {
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

function* getRootNodeAmount({ address }) {
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

function* getValidatorAmount({ address }) {
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

function* setPurgeTimeLocksAmount({ payload }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1,
    });
    const contract = yield call(initContract, payload.contract);
    const data = yield contract.purgeTimeLocks(payload.address);
    console.log(data);
    // yield put();
  } catch (err) {
    console.error("Purge.Error", err);
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
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(initContract, payload.contract);
    // const pay = yield contract.withdraw(toWei(payload.amountQ), {from: userAddress})
    yield contract.depositOnBehalfOf(payload.token, dateToNumber(payload.startDate), dateToNumber(payload.endDate), {
      from: userAddress,
      amountQ: toWei(payload.amountQ),
    });
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
  takeEvery(actionTypes.GET_QVAULT_AMOUNT, getQVaultAmount),
  takeEvery(actionTypes.GET_ROOTNODE_AMOUNT, getRootNodeAmount),
  takeEvery(actionTypes.GET_VALIDATOR_AMOUNT, getValidatorAmount),

  takeEvery(actionTypes.SET_QVAULT_AMOUNT, setQVaultAmount),
  takeEvery(actionTypes.SET_ROOTNODE_AMOUNT, setRootNodeAmount),
  takeEvery(actionTypes.SET_VALIDATOR_AMOUNT, setValidatorAmount),

  takeEvery(actionTypes.SET_PURGEAMOUNT_CALL, setPurgeTimeLocksAmount),

  takeEvery(actionTypes.SET_LOCKEDAMOUNT_CALL, setDepositLockedAmount),
];

// const { userAddress } = yield select(state => state.userInf);
