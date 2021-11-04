import { put, select, takeEvery, call } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/q-vault'
import { setErrorMessage } from 'store/actions/action-creaters/transaction-handler'
import { SET_TRANSACTION_COUNTER } from '../actions/action-types/transaction-handler'
import {
  setUserBalance,
  setAccountBalance,
  setLockedAssets,
  setMinimumQVaultTimeLock,
  setQVaultTimeLocks,
  setUpdateCompoundRate,
  getAccountBalance,
  getUserBalance,
  getLockedAssets,
  getDelegationsListError,
  getDelegationsListSuccess,
  getQVBalanceSuccess,
  getOutstandingDelegationRewardsSuccess,
  getOutstandingDelegationRewardsError,
  getOutstandingDelegationRewards,
  getDelegationsList,
  setDelegationInfo,
  getDelegationInfo
} from 'store/actions/action-creaters/q-vault'

import { toWei, fromWei } from 'func/balance'
import { addIndex } from 'func/useful'
import { getNowTimestamp } from 'func/convertDate'

import { getQVaultInstance, getVotingWeightProxyInstance } from 'contracts/contract-instance'

import { handleLockedAssetsResponse, getOutstandingDelegationRewardsList } from 'contracts/helpers/q-vault-helper'

import ErrorHandler from 'func/ErrorHandler'

function * getAccountBalanceGenerator ({ address }) {
  try {
    const data = yield window.web3.eth.getBalance(address)
    yield put(setAccountBalance(fromWei(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getUserBalanceGenerator ({ address }) {
  try {
    const contract = yield call(getQVaultInstance)
    const data = yield contract.getUserBalance(address)
    yield put(setUserBalance(fromWei(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getLockedAssetsGenerator ({ address }) {
  try {
    const contract = yield call(getQVaultInstance)
    const data = yield contract.getLockInfo(address)
    const objectResult = handleLockedAssetsResponse(data)
    yield put(setLockedAssets(objectResult.votingWeight, objectResult.votingLockingEnd))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * setDepositGenerator ({
  address,
  amountQ
}) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    const data = yield contract.deposit({
      value: toWei(amountQ),
      from: address
    })
    if (data.status) {
      yield put(getUserBalance(address))
      yield put(getAccountBalance(address))
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setSendGenerator ({
  address,
  amount
}) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    const data = yield contract.transfer(address, toWei(amount))
    if (data.status) {
      const { userAddress } = yield select(state => state.userInf)
      yield put(getUserBalance(userAddress))
      yield put(getAccountBalance(userAddress))
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setWithdrawGenerator ({
  address,
  amountQ
}) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    const data = yield contract.withdraw(toWei(amountQ), { from: address })

    if (data) {
      yield put(getUserBalance(address))
      yield put(getAccountBalance(address))
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setDelegateStakeGenerator ({
  address,
  delegateAddresses,
  stakes
}) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const { userAddress } = yield select((state) => state.userInf)

    const contract = yield call(getQVaultInstance)
    const data = yield contract.delegateStake(delegateAddresses, stakes, { from: address })

    if (data) {
      yield put(getOutstandingDelegationRewards())
      yield put(getDelegationsList())
      yield put(getAccountBalance(userAddress))
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setLockAmountGenerator ({
  address,
  amountQ
}) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    const data = yield contract.lock(toWei(amountQ), { from: address })

    if (data.status) {
      yield put(getUserBalance(address))
      yield put(getAccountBalance(address))
      yield put(getLockedAssets(address))
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setUnlockAmountGenerator ({
  address,
  amountQ
}) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    const data = yield contract.unlock(toWei(amountQ), { from: address })

    if (data.status) {
      yield put(getUserBalance(address))
      yield put(getAccountBalance(address))
      yield put(getLockedAssets(address))
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * getDelegationListGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getQVaultInstance)
    const data = yield contract.getDelegationsList(userAddress)
    yield put(getDelegationsListSuccess(data))
  } catch (error) {
    ErrorHandler.process(error)
    yield put(getDelegationsListError(error.message))
  }
}

function * getOutstandingDelegationRewardsValueGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf)

    const contract = yield call(getQVaultInstance)
    const data = yield contract.getDelegationsList(userAddress)
    const result = getOutstandingDelegationRewardsList(data)
    yield put(getOutstandingDelegationRewardsSuccess(result))
  } catch (error) {
    yield put(getOutstandingDelegationRewardsError(error))
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getMinimumQVaultTimeLockGenerator ({ address }) {
  try {
    const contract = yield call(getQVaultInstance)
    const data = yield contract.getMinimumBalance(address, getNowTimestamp())

    yield put(setMinimumQVaultTimeLock(fromWei(data)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getQVaultTimeLocksGenerator ({ address }) {
  try {
    const contract = yield call(getQVaultInstance)
    const data = yield contract.getTimeLocks(address)

    yield put(setQVaultTimeLocks(addIndex(data)))
  } catch (error) {
    ErrorHandler.process(error)
  }
}

function * getUpdateCompoundRateGenerator ({ address }) {
  try {
    yield put(setUpdateCompoundRate(true))
    const contract = yield call(getQVaultInstance)
    const data = yield contract.updateCompoundRate({
      from: address,
      gasBuffer: 1.2
    })
    if (data) {
      yield put(setUpdateCompoundRate('updated'))
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setUpdateCompoundRate(false))
  }
}

function * setOnClaimStakeDelegatorRewardGenerator () {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getQVaultInstance)
    const result = yield contract.claimStakeDelegatorReward({ from: userAddress })

    if (result) {
      yield put(getOutstandingDelegationRewards())
      yield put(getDelegationsList())
      yield put(getAccountBalance(userAddress))
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * getBalanceDetailsGenerator () {
  try {
    const contract = yield call(getQVaultInstance)
    const data = yield contract.getBalanceDetails()
    yield put(getQVBalanceSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getDelegationInfoGenerator ({ address }) {
  try {
    const contract = yield call(getVotingWeightProxyInstance)
    const data = yield contract.getDelegationInfo(address)
    yield put(setDelegationInfo(data))
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  }
}

function * setAnnounceNewVotingAgentGenerator ({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const { userAddress } = yield select((state) => state.userInf)

    const contract = yield call(getVotingWeightProxyInstance)
    yield contract.announceNewVotingAgent(address)

    yield put(getDelegationInfo(userAddress))
    yield put(getAccountBalance(userAddress))
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setNewVotingAgentGenerator () {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const { userAddress } = yield select((state) => state.userInf)

    const contract = yield call(getVotingWeightProxyInstance)
    yield contract.setNewVotingAgent()

    yield put(getDelegationInfo(userAddress))
    yield put(getAccountBalance(userAddress))
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
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
  takeEvery(actionTypes.GET_QVAULT_TIME_LOCKS, getQVaultTimeLocksGenerator)
]
