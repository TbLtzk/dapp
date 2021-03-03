import { call, put, takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/root-contract';
import {
  getRootMembersDataSuccess, getRootMembersDataError,
  stakeToPanelSuccess, stakeToPanelError,
  checkIsUserRootNodeSuccess, checkIsUserRootNodeError,
  getRootNodeStakesSuccess, getRootNodeStakesError,
  announceWithdrawalSuccess, announceWithdrawalError,
  withdrawSuccess, withdrawError, getWithdrawalsSuccess, getWithdrawalsError, getRootMembersData
} from 'store/actions/action-creaters/root-contract';
import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess
} from '../actions/action-creaters/transaction-handler';

import RootService from 'contracts/src/Root';

function* getRootMembers({ contract }) {
  try {
    const data = yield contract.getRootCalc();
    yield put(getRootMembersDataSuccess(data));
  } catch (err) {
    console.log('err', err);
    yield put(getRootMembersDataError(err.message));
  }
}

function* stakeToPanel({ contract, data }) {
  try {
    yield put(setTransactionLoading());
    const res = yield contract.stakeToPanel(data);

    yield put(stakeToPanelSuccess('success'));
    yield put(setTransactionLoadingSuccess());
    yield put(getRootMembersData(contract));

  } catch (err) {
    console.log('err', err);
    yield put(stakeToPanelError(err.message));
    yield put(setTransactionLoadingError(err.message));
  }
}

function* announceWithdrawal({ contract, amount, paymentInf }) {
  try {
    yield put(setTransactionLoading());
    const data = yield contract.announceWithdrawal(amount, paymentInf);

    yield put(announceWithdrawalSuccess('success'));
    yield put(setTransactionLoadingSuccess());
  } catch (err) {
    console.log('err', err);
    yield put(announceWithdrawalError(err.message));
    yield put(setTransactionLoadingError(err.message));
  }
}

function* withdraw({ contract, amount, payTo, paymentInf }) {
  try {
    yield put(setTransactionLoading());
    const data = yield contract.withdraw(amount, payTo, paymentInf);

    yield put(withdrawSuccess('success'));
    yield put(setTransactionLoadingSuccess());
  } catch (err) {
    console.log('err', err);
    yield put(withdrawError(err.message));
    yield put(setTransactionLoadingError(err.message));
  }
}

function* checkIsUserRootNode({ contract, address }) {
  try {
    const data = yield contract.checkMemberIsRoot(address);
    // console.log("checkMemberIsRoot", data);

    yield put(checkIsUserRootNodeSuccess(data));
  } catch (err) {
    console.log('err', err);
    yield put(checkIsUserRootNodeError(err.message));
  }
}

function* getRootNodeStakes({ contract, address }) {
  try {
    const data = yield contract.getRootNodeStake(address);

    yield put(getRootNodeStakesSuccess(data));
  } catch (err) {
    console.log('err', err);
    yield put(getRootNodeStakesError(err.message));
  }
}

function* getWithdrawals({ address }) {
  try {
    const contract = new RootService();
    const data = yield contract.withdrawals(address);
    yield put(getWithdrawalsSuccess(data));
  } catch (err) {
    console.log('err', err);
    yield put(getWithdrawalsError(err.message));
  }
}

export default [
  takeEvery(actionTypes.GET_ROOT_MEMBERS_DATA, getRootMembers),
  takeEvery(actionTypes.STAKE_TO_PANEL, stakeToPanel),
  takeEvery(actionTypes.ANNOUNCE_WITHDRAWAL, announceWithdrawal),
  takeEvery(actionTypes.WITHDRAW, withdraw),

  takeEvery(actionTypes.CHECK_IS_USER_ROOT_NODE, checkIsUserRootNode),
  takeEvery(actionTypes.GET_ROOT_NODE_STAKES, getRootNodeStakes),
  takeEvery(actionTypes.GET_WITHDRAWALS, getWithdrawals),
];
