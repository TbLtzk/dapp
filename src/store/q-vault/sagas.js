import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  getAccountBalance,
  getDelegationInfo,
  getDelegationsList,
  getDelegationsListError,
  getDelegationsListSuccess,
  getLockedAssets,
  getOutstandingDelegationRewards,
  getOutstandingDelegationRewardsError,
  getOutstandingDelegationRewardsSuccess,
  getQVBalanceSuccess,
  getUserBalance,
  setAccountBalance,
  setDelegationInfo,
  setLockedAssets,
  setMinimumQVaultTimeLock,
  setQVaultTimeLocks,
  setUpdateCompoundRate,
  setUserBalance,
} from './action-creators';
import * as actionTypes from './action-types';
import { userBalance } from './selectors';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/action-creators';

import { getQVaultInstance, getVotingWeightProxyInstance } from 'contracts/contract-instance';
import { getOutstandingDelegationRewardsList, getQHolderRewardPool } from 'contracts/helpers/q-vault-helper';

import formTypes from 'constants/form-types';
import { fromWei, prepareBalanceDetails, toWei } from 'func/balance';
import { getNowTimestamp } from 'func/convertDate';
import ErrorHandler from 'func/ErrorHandler';
import { addIndex } from 'func/useful';

function * getAccountBalanceGenerator ({ address }) {
  try {
    const data = yield window.web3.eth.getBalance(address);
    yield put(setAccountBalance(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getUserBalanceGenerator ({ address }) {
  try {
    const contract = yield call(getQVaultInstance);
    const data = yield contract.getUserBalance(address);
    yield put(setUserBalance(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getLockedAssetsGenerator ({ address }) {
  try {
    const contract = yield call(getQVaultInstance);
    const data = yield contract.getLockInfo(address);
    yield put(setLockedAssets(fromWei(data.lockedAmount), data.lockedUntil));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * setDepositGenerator ({ address, amountQ }) {
  try {
    yield put(setTransactionLoading(1));

    const contract = yield call(getQVaultInstance);
    yield contract.deposit({
      value: toWei(amountQ),
      from: address,
    });

    yield put(getUserBalance(address));
    yield put(getAccountBalance(address));

    yield put(setTransactionLoadingSuccess({ type: formTypes.qVaultDeposit }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setSendGenerator ({ address, amount }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getQVaultInstance);
    yield contract.transfer(address, toWei(amount));

    yield put(getUserBalance(userAddress));
    yield put(getAccountBalance(userAddress));
    yield put(setTransactionLoadingSuccess({ type: formTypes.qVaultSend }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setWithdrawGenerator ({ address, amountQ }) {
  try {
    yield put(setTransactionLoading(1));

    const contract = yield call(getQVaultInstance);
    yield contract.withdraw(toWei(amountQ), { from: address });

    yield put(getUserBalance(address));
    yield put(getAccountBalance(address));

    yield put(setTransactionLoadingSuccess({ type: formTypes.qVaultWithdraw }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setDelegateStakeGenerator ({ address, delegateAddresses, stakes }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getQVaultInstance);
    yield contract.delegateStake(delegateAddresses, stakes, { from: address });

    yield put(getOutstandingDelegationRewards());
    yield put(getDelegationsList());
    yield put(getAccountBalance(userAddress));
    yield put(getDelegationInfo(userAddress));

    yield put(setTransactionLoadingSuccess({ type: formTypes.qVaultDelegation }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setLockAmountGenerator ({ address, amountQ }) {
  try {
    yield put(setTransactionLoading(1));

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getQVaultInstance);
    yield contract.lock(toWei(amountQ), { from: address });

    yield put(getUserBalance(address));
    yield put(getAccountBalance(address));
    yield put(getLockedAssets(address));
    yield put(getDelegationInfo(userAddress));

    yield put(setTransactionLoadingSuccess({ type: formTypes.qVaultLock }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setUnlockAmountGenerator ({ address, amountQ }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getQVaultInstance);
    yield contract.unlock(toWei(amountQ), { from: address });

    yield put(getUserBalance(address));
    yield put(getAccountBalance(address));
    yield put(getLockedAssets(address));
    yield put(getDelegationInfo(userAddress));

    yield put(setTransactionLoadingSuccess({ type: formTypes.qVaultUnlock }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * getDelegationListGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getQVaultInstance);
    const data = yield contract.getDelegationsList(userAddress);
    yield put(getDelegationsListSuccess(data));
  } catch (error) {
    ErrorHandler.process(error);
    yield put(getDelegationsListError(error.message));
  }
}

function * getOutstandingDelegationRewardsValueGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getQVaultInstance);
    const data = yield contract.getDelegationsList(userAddress);
    const result = getOutstandingDelegationRewardsList(data);
    yield put(getOutstandingDelegationRewardsSuccess(result));
  } catch (error) {
    yield put(getOutstandingDelegationRewardsError(error));
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getMinimumQVaultTimeLockGenerator ({ address }) {
  try {
    const contract = yield call(getQVaultInstance);
    const data = yield contract.getMinimumBalance(address, getNowTimestamp());
    yield put(setMinimumQVaultTimeLock(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getQVaultTimeLocksGenerator ({ address }) {
  try {
    const contract = yield call(getQVaultInstance);
    const data = yield contract.getTimeLocks(address);

    yield put(setQVaultTimeLocks(addIndex(data)));
  } catch (error) {
    ErrorHandler.process(error);
  }
}

function * getUpdateCompoundRateGenerator ({ address }) {
  try {
    yield put(setUpdateCompoundRate(true));
    const contract = yield call(getQVaultInstance);
    yield contract.updateCompoundRate({
      from: address,
      gasBuffer: 1.2,
    });
    yield put(setUpdateCompoundRate(false));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  } finally {
    yield put(setUpdateCompoundRate(false));
  }
}

function * setOnClaimStakeDelegatorRewardGenerator () {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getQVaultInstance);
    yield contract.claimStakeDelegatorReward({ from: userAddress });

    yield put(getOutstandingDelegationRewards());
    yield put(getDelegationsList());
    yield put(getAccountBalance(userAddress));

    yield put(setTransactionLoadingSuccess());
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * getBalanceDetailsGenerator () {
  try {
    const contract = yield call(getQVaultInstance);
    const balanceDetailsData = yield contract.getBalanceDetails();
    const qHolderRewardPool = yield getQHolderRewardPool();
    const userQVBalance = yield select(userBalance);
    const balanceDetails = prepareBalanceDetails(balanceDetailsData, userQVBalance);
    yield put(getQVBalanceSuccess({ ...balanceDetails, qHolderRewardPool }));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getDelegationInfoGenerator ({ address }) {
  try {
    const contract = yield call(getVotingWeightProxyInstance);
    const data = yield contract.getDelegationInfo(address);
    yield put(setDelegationInfo(data));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setAnnounceNewVotingAgentGenerator ({ address }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getVotingWeightProxyInstance);
    yield contract.announceNewVotingAgent(address);

    yield put(getDelegationInfo(userAddress));
    yield put(getAccountBalance(userAddress));

    yield put(setTransactionLoadingSuccess({ type: formTypes.qVaultAnnounce }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setNewVotingAgentGenerator () {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getVotingWeightProxyInstance);
    yield contract.setNewVotingAgent();

    yield put(getDelegationInfo(userAddress));
    yield put(getAccountBalance(userAddress));

    yield put(setTransactionLoadingSuccess());
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

export default [
  takeEvery(actionTypes.GET_ACCOUNT_BALANCE, getAccountBalanceGenerator),
  takeEvery(actionTypes.GET_QV_USER_BALANCE, getUserBalanceGenerator),
  takeEvery(actionTypes.GET_QV_LOCKED_ASSETS, getLockedAssetsGenerator),

  takeEvery(actionTypes.GET_UPDATE_COMPOUND_RATE, getUpdateCompoundRateGenerator),
  takeEvery(actionTypes.GET_DELEGATIONS_LIST, getDelegationListGenerator),
  takeEvery(actionTypes.GET_QV_BALANCE, getBalanceDetailsGenerator),
  takeEvery(actionTypes.GET_OUTSTANDING_DELEGATION_REWARDS, getOutstandingDelegationRewardsValueGenerator),
  takeEvery(actionTypes.SET_ANNOUNCE_VOTING_AGENT, setAnnounceNewVotingAgentGenerator),
  takeEvery(actionTypes.SET_NEW_VOTING_AGENT, setNewVotingAgentGenerator),

  takeEvery(actionTypes.GET_DELEGATION_INFO, getDelegationInfoGenerator),

  takeEvery(actionTypes.SET_QV_DEPOSIT_CALL, setDepositGenerator),
  takeEvery(actionTypes.SET_SEND_CALL, setSendGenerator),
  takeEvery(actionTypes.SET_QV_WITHDRAW_CALL, setWithdrawGenerator),
  takeEvery(actionTypes.SET_QV_LOCK_AMOUNT, setLockAmountGenerator),
  takeEvery(actionTypes.SET_QV_UNLOCK_AMOUNT, setUnlockAmountGenerator),
  takeEvery(actionTypes.SET_DELEGATE_STAKE, setDelegateStakeGenerator),

  takeEvery(actionTypes.ON_CLAIM_STAKE_DELEGATOR_REWARD, setOnClaimStakeDelegatorRewardGenerator),
  takeEvery(actionTypes.GET_QVAULT_MINIMUM_TIME_LOCK, getMinimumQVaultTimeLockGenerator),
  takeEvery(actionTypes.GET_QVAULT_TIME_LOCKS, getQVaultTimeLocksGenerator),
];
