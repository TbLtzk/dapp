import { call, put, select, takeEvery } from 'redux-saga/effects';

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
  setRootWithdrawals
} from './action-creators';
import * as actionTypes from './action-types';

import { getAccountBalance } from 'store/q-vault/action-creators';
import { setErrorMessage, setTransactionLoading } from 'store/transaction-handler/action-creators';

import { getRootNodesInstance } from 'contracts/contract-instance';
import { prepareRootMembersTable } from 'contracts/helpers/root-node-helper';

import TABLE_TYPES from 'constants/tableTypes';
import { fromWei } from 'func/balance';
import { getNowTimestamp } from 'func/convertDate';
import ErrorHandler from 'func/ErrorHandler';
import { addIndex } from 'func/useful';

function * setRootStakeToPanelGenerator ({ data }) {
  try {
    yield put(setTransactionLoading(1));

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getRootNodesInstance);
    yield contract.commitStake(data);

    yield put(getAccountBalance(userAddress));
    yield put(getRootNodeStakes(userAddress));
    yield put(getRootWithdrawals(userAddress));
    yield put(getMinimumRootTimeLock(userAddress));
    yield put(getRootMembers());
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setErrorMessage(errorMsg));
  } finally {
    yield put(setTransactionLoading(-1));
  }
}

function * setRootAnnounceWithdrawalGenerator ({ amount, paymentInf }) {
  try {
    yield put(setTransactionLoading(1));

    const contract = yield call(getRootNodesInstance);
    const { userAddress } = yield select((state) => state.userInf);

    yield contract.announceWithdrawal(amount, paymentInf);
    yield put(getAccountBalance(userAddress));
    yield put(getRootNodeStakes(userAddress));
    yield put(getRootWithdrawals(userAddress));
    yield put(getMinimumRootTimeLock(userAddress));
    yield put(getRootMembers());
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setErrorMessage(errorMsg));
  } finally {
    yield put(setTransactionLoading(-1));
  }
}

function * setRootWithdrawGenerator ({ amount, payTo, paymentInf }) {
  try {
    yield put(setTransactionLoading(1));

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getRootNodesInstance);

    yield contract.withdraw(amount, payTo, paymentInf);

    yield put(getAccountBalance(userAddress));
    yield put(getRootNodeStakes(userAddress));
    yield put(getRootWithdrawals(userAddress));
    yield put(getMinimumRootTimeLock(userAddress));
    yield put(getRootMembers());
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setErrorMessage(errorMsg));
  } finally {
    yield put(setTransactionLoading(-1));
  }
}

function * getRootMembersGenerator ({ tableType = TABLE_TYPES.rootNodesWidened }) {
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
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getCheckIsUserRootNodeGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance);
    const data = yield contract.instance.methods.isMember(address).call();
    yield put(setCheckIsUserRootNode(data));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getRootNodeStakesGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance);
    const data = yield contract.getRootNodeStake(address);
    yield put(setRootNodeStakes(Number(fromWei(data))));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getRootWithdrawalsGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance);
    const data = yield contract.getWithdrawalInfo(address);
    yield put(setRootWithdrawals(data));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getMinimumRootTimeLockGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance);
    const data = yield contract.getMinimumBalance(address, getNowTimestamp());
    yield put(setMinimumRootTimeLock(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getRootTimeLocksGenerator ({ address }) {
  try {
    const contract = yield call(getRootNodesInstance);
    const data = yield contract.getTimeLocks(address);
    yield put(setRootTimeLocks(addIndex(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
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
  takeEvery(actionTypes.GET_ROOT_TIME_LOCKS, getRootTimeLocksGenerator)
];
