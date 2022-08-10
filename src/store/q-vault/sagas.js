import { call, put, select, takeEvery } from 'redux-saga/effects';
import { fromWei, toWei } from 'web3-utils';

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
  setUserBalance,
} from './action-creators';
import * as actionTypes from './action-types';
import { userBalance } from './selectors';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/actions';

import { getQVaultInstance, getVotingWeightProxyInstance } from 'contracts/contract-instance';
import { getOutstandingDelegationRewardsList, getQHolderRewardPool } from 'contracts/helpers/q-vault-helper';

import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { dateToUnix } from 'utils/date';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';
import { calculateInterestRate } from 'utils/numbers';

// rename: getBalanceInWalletGenerator
function* getAccountBalanceGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const data = yield window.web3.eth.getBalance(userAddress);
    yield put(setAccountBalance(fromWei(data)));
  } catch (error) {
    captureError(error);
  }
}

// rename: getBalanceInQVaultGenerator
function* getUserBalanceGenerator () {
  try {
    const contract = yield call(getQVaultInstance);
    const { userAddress } = yield select((state) => state.userInf);
    const data = yield contract.getUserBalance(userAddress);
    yield put(setUserBalance(fromWei(data)));
  } catch (error) {
    captureError(error);
  }
}

function* getLockedAssetsGenerator ({ address }) {
  try {
    const contract = yield call(getQVaultInstance);
    const data = yield contract.getLockInfo(address);
    yield put(setLockedAssets(fromWei(data.lockedAmount), data.lockedUntil));
  } catch (error) {
    captureError(error);
  }
}
function* setDepositGenerator ({ address, amountQ, label }) {
  try {
    yield put(setTransactionLoading(1));

    const contract = yield call(getQVaultInstance);

    const transaction = yield contract.deposit({
      value: toWei(amountQ),
      from: address,
    });

    yield put(getUserBalance(address));
    yield put(getAccountBalance(address));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.qVaultDeposit, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setSendGenerator ({ address, amount, label }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getQVaultInstance);
    const transaction = yield contract.transfer(address, toWei(amount));

    yield put(getUserBalance(userAddress));
    yield put(getAccountBalance(userAddress));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.qVaultSend, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setWithdrawGenerator ({ address, amountQ, label }) {
  try {
    yield put(setTransactionLoading(1));

    const contract = yield call(getQVaultInstance);
    const transaction = yield contract.withdraw(toWei(amountQ), { from: address });

    yield put(getUserBalance(address));
    yield put(getAccountBalance(address));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.qVaultWithdraw, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setDelegateStakeGenerator ({ address, delegateAddresses, stakes, label }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getQVaultInstance);
    const transaction = yield contract.delegateStake(delegateAddresses, stakes, { from: address });

    yield put(getOutstandingDelegationRewards());
    yield put(getDelegationsList());
    yield put(getAccountBalance(userAddress));
    yield put(getDelegationInfo(userAddress));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.qVaultDelegation, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setLockAmountGenerator ({ address, amountQ, label }) {
  try {
    yield put(setTransactionLoading(1));

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getQVaultInstance);
    const transaction = yield contract.lock(toWei(amountQ), { from: address });

    yield put(getUserBalance(address));
    yield put(getAccountBalance(address));
    yield put(getLockedAssets(address));
    yield put(getDelegationInfo(userAddress));

    yield put(setTransactionLoadingSuccess({ type: formTypes.qVaultLock }));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.qVaultLock, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setUnlockAmountGenerator ({ address, amountQ, label }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getQVaultInstance);
    const transaction = yield contract.unlock(toWei(amountQ), { from: address });

    yield put(getUserBalance(address));
    yield put(getAccountBalance(address));
    yield put(getLockedAssets(address));
    yield put(getDelegationInfo(userAddress));

    yield put(
      setTransactionLoadingSuccess(
        getSuccessMessage(formTypes.qVaultUnlock, transaction, label)
      )
    );
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* getDelegationListGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getQVaultInstance);
    const data = yield contract.getDelegationsList(userAddress);
    yield put(getDelegationsListSuccess(data));
  } catch (error) {
    getErrorMessage(error);
    yield put(getDelegationsListError(error.message));
  }
}

function* getOutstandingDelegationRewardsValueGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getQVaultInstance);
    const data = yield contract.getDelegationsList(userAddress);
    const result = getOutstandingDelegationRewardsList(data);
    yield put(getOutstandingDelegationRewardsSuccess(result));
  } catch (error) {
    yield put(getOutstandingDelegationRewardsError(error));
    captureError(error);
  }
}

function* getMinimumQVaultTimeLockGenerator ({ address }) {
  try {
    const contract = yield call(getQVaultInstance);
    const data = yield contract.getMinimumBalance(address, dateToUnix());
    yield put(setMinimumQVaultTimeLock(fromWei(data)));
  } catch (error) {
    captureError(error);
  }
}

function* getQVaultTimeLocksGenerator ({ address }) {
  try {
    const contract = yield call(getQVaultInstance);
    const data = yield contract.getTimeLocks(address);

    yield put(setQVaultTimeLocks(data));
  } catch (error) {
    getErrorMessage(error);
  }
}

function* setOnClaimStakeDelegatorRewardGenerator ({ label }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getQVaultInstance);
    const transaction = yield contract.claimStakeDelegatorReward({ from: userAddress });

    yield put(getOutstandingDelegationRewards());
    yield put(getDelegationsList());
    yield put(getAccountBalance(userAddress));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* getBalanceDetailsGenerator () {
  try {
    const contract = yield call(getQVaultInstance);
    const balanceDetailsData = yield contract.getBalanceDetails();
    const qHolderRewardPool = yield getQHolderRewardPool();
    const userQVBalance = yield select(userBalance);
    const balanceDetails = {
      ...balanceDetailsData,
      interestRatePercentage: calculateInterestRate(Number(balanceDetailsData.interestRate)),
      yearlyExpectedEarnings: userBalance
        ? userQVBalance * (calculateInterestRate(Number(balanceDetailsData.interestRate)) / 100)
        : 0
    };
    yield put(getQVBalanceSuccess({ ...balanceDetails, qHolderRewardPool }));
  } catch (error) {
    captureError(error);
  }
}

function* getDelegationInfoGenerator ({ address }) {
  try {
    const contract = yield call(getVotingWeightProxyInstance);
    const data = yield contract.getDelegationInfo(address);
    yield put(setDelegationInfo(data));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setAnnounceNewVotingAgentGenerator ({ address, label }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getVotingWeightProxyInstance);
    const transaction = yield contract.announceNewVotingAgent(address);

    yield put(getDelegationInfo(userAddress));
    yield put(getAccountBalance(userAddress));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.qVaultAnnounce, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setNewVotingAgentGenerator ({ label }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);

    const contract = yield call(getVotingWeightProxyInstance);
    const transaction = yield contract.setNewVotingAgent();

    yield put(getDelegationInfo(userAddress));
    yield put(getAccountBalance(userAddress));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

export default [
  takeEvery(actionTypes.GET_ACCOUNT_BALANCE, getAccountBalanceGenerator),
  takeEvery(actionTypes.GET_QV_USER_BALANCE, getUserBalanceGenerator),
  takeEvery(actionTypes.GET_QV_LOCKED_ASSETS, getLockedAssetsGenerator),

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
