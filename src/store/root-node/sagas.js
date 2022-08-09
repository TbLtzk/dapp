import { call, put, select, takeEvery } from 'redux-saga/effects';
import { fromWei } from 'web3-utils';

import {
  getMinimumRootTimeLock,
  getRootMembers,
  getRootNodeStakes,
  getRootWithdrawals,
  setCheckIsUserRootNode,
  setMinimumRootTimeLock,
  setRootMembers,
  setRootNodeStakes,
  setRootTimeLocks,
  setRootWithdrawals,
} from './action-creators';
import * as actionTypes from './action-types';

import { getAccountBalance } from 'store/q-vault/action-creators';
import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/actions';

import { getRootNodesInstance } from 'contracts/contract-instance';
import { prepareRootMembersTable } from 'contracts/helpers/root-node-helper';

import formTypes from 'constants/form-types';
import { TABLE_TYPES } from 'constants/tableTypes';
import { getNowTimestamp } from 'utils/convertDate';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';

function* setRootStakeToPanelGenerator ({ data, label }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getRootNodesInstance);
    const transaction = yield contract.commitStake(data);

    yield put(getAccountBalance(userAddress));
    yield put(getRootNodeStakes(userAddress));
    yield put(getRootWithdrawals(userAddress));
    yield put(getMinimumRootTimeLock(userAddress));
    yield put(getRootMembers());

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.rootNodeStaking, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setRootAnnounceWithdrawalGenerator ({ amount, paymentInf, label }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getRootNodesInstance);
    const { userAddress } = yield select((state) => state.userInf);

    const transaction = yield contract.announceWithdrawal(amount, paymentInf);
    yield put(getAccountBalance(userAddress));
    yield put(getRootNodeStakes(userAddress));
    yield put(getRootWithdrawals(userAddress));
    yield put(getMinimumRootTimeLock(userAddress));
    yield put(getRootMembers());

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.rootNodeStaking, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setRootWithdrawGenerator ({ amount, payTo, paymentInf, label }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getRootNodesInstance);

    const transaction = yield contract.withdraw(amount, payTo, paymentInf);

    yield put(getAccountBalance(userAddress));
    yield put(getRootNodeStakes(userAddress));
    yield put(getRootWithdrawals(userAddress));
    yield put(getMinimumRootTimeLock(userAddress));
    yield put(getRootMembers());

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.rootNodeStaking, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* getRootMembersGenerator ({ tableType = TABLE_TYPES.rootNodesWidened }) {
  try {
    const contract = yield call(getRootNodesInstance);
    switch (tableType) {
      case TABLE_TYPES.rootNodesShort:
      case TABLE_TYPES.rootNodesWidened: {
        const members = yield contract.getMembers();
        const membersWithStakes = yield contract.getStakes();
        const { table, totalStake } = prepareRootMembersTable(members, membersWithStakes);
        yield put(setRootMembers(tableType, table, totalStake));
        break;
      }
      case TABLE_TYPES.rootNodesMonitoring: {
        const members = yield contract.getMembers();
        const membersWithStakes = yield contract.getStakes();
        const { table } = prepareRootMembersTable(members, membersWithStakes);
        yield put(setRootMembers(tableType, table));
        break;
      }
    }
  } catch (error) {
    captureError(error);
  }
}

function* getCheckIsUserRootNodeGenerator () {
  try {
    const contract = yield call(getRootNodesInstance);
    const { userAddress } = yield select((state) => state.userInf);
    const data = yield contract.instance.methods.isMember(userAddress).call();
    yield put(setCheckIsUserRootNode(data));
  } catch (error) {
    captureError(error);
  }
}

function* getRootNodeStakesGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance);
    const data = yield contract.getRootNodeStake(address);
    yield put(setRootNodeStakes(fromWei(data)));
  } catch (error) {
    captureError(error);
  }
}

function* getRootWithdrawalsGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance);
    const data = yield contract.getWithdrawalInfo(address);
    yield put(setRootWithdrawals(data));
  } catch (error) {
    captureError(error);
  }
}

function* getMinimumRootTimeLockGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance);
    const data = yield contract.getMinimumBalance(address, getNowTimestamp());
    yield put(setMinimumRootTimeLock(fromWei(data)));
  } catch (error) {
    captureError(error);
  }
}

function* getRootTimeLocksGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance);
    const data = yield contract.getTimeLocks(address);
    yield put(setRootTimeLocks(data));
  } catch (error) {
    captureError(error);
  }
}

export default [
  takeEvery(actionTypes.SET_ROOT_STAKE_TO_PANEL, setRootStakeToPanelGenerator),
  takeEvery(actionTypes.SET_ROOT_ANNOUNCE_WITHDRAWAL, setRootAnnounceWithdrawalGenerator),
  takeEvery(actionTypes.SET_ROOT_WITHDRAW, setRootWithdrawGenerator),

  takeEvery(actionTypes.GET_ROOT_MEMBERS, getRootMembersGenerator),
  takeEvery(actionTypes.GET_CHECK_IS_USER_ROOT_NODE, getCheckIsUserRootNodeGenerator),
  takeEvery(actionTypes.GET_ROOT_NODE_STAKES, getRootNodeStakesGenerator),
  takeEvery(actionTypes.GET_ROOT_WITHDRAWALS, getRootWithdrawalsGenerator),
  takeEvery(actionTypes.GET_ROOT_MINIMUM_TIME_LOCK, getMinimumRootTimeLockGenerator),
  takeEvery(actionTypes.GET_ROOT_TIME_LOCKS, getRootTimeLocksGenerator),
];
