import { put, select, takeEvery, call } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/q-vault'
import { SET_TRANSACTION_COUNTER } from '../actions/action-types/transaction-handler'
import {
  setError,
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
  getDelegationsList
} from 'store/actions/action-creaters/q-vault'

import {  setTransactionLoadingError } from '../actions/action-creaters/transaction-handler'

import { toWei, fromWei } from 'func/balance'
import { addIndex } from 'func/useful'
import { getNowTimestamp } from 'func/convertDate'

import { contractRegistryInstance } from 'contracts/contracts'

import {
  getBalanceDetails,
  handleLockedAssetsResponse,
  getOutstandingDelegationRewardsList,
  claimStakeDelegatorReward
} from '../helpers/q-vault-helper'

import ErrorHandler from 'func/ErrorHandler'

let qVaultInstance = null

const getQVaultInstance = async () => {
  if (qVaultInstance === null) {
    qVaultInstance = await contractRegistryInstance.qVault()
  }
  return qVaultInstance
}
function * getAccountBalanceGenerator ({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const data = yield window.web3.eth.getBalance(address)
    yield put(setAccountBalance(fromWei(data)))
  } catch (err) {
    console.error('QV.Error', err)
    yield put(setError(err.message))
    yield put(setTransactionLoadingError(err))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * getUserBalanceGenerator ({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    const data = yield contract.getUserBalance(address)
    yield put(setUserBalance(fromWei(data)))
  } catch (err) {
    console.error('QV.Error', err)
    yield put(setError(err.message))
    yield put(setTransactionLoadingError(err))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * getLockedAssetsGenerator ({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    let data = yield contract.getLockInfo(address)
    data = handleLockedAssetsResponse(data)

    yield put(setLockedAssets(data.votingWeight, data.votingLockingEnd))
  } catch (err) {
    console.error('QV.Error', err)
    yield put(setError(err.message))
    yield put(setTransactionLoadingError(err))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setDepositGenerator ({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    const data = yield contract.deposit({ value: toWei(amountQ), from: address })
    if (data.status === true) {
      yield put(getUserBalance(address))
      yield put(getAccountBalance(address))
    }
  } catch (err) {
    console.error('QV.Error', err)
    yield put(setError(err.message))
    ErrorHandler.process(err)
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setWithdrawGenerator ({ address, amountQ }) {
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
    yield put(setError(error))
    yield put(setTransactionLoadingError(error))
    ErrorHandler.process(error)
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setDelegateStakeGenerator ({ address, delegateAddresses, stakes }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    const data = yield contract.delegateStake(delegateAddresses, stakes, { from: address })

    if (data) {
      yield put(getOutstandingDelegationRewards())
      yield put(getDelegationsList())
    }
  } catch (error) {
    yield put(setError(error))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setLockAmountGenerator ({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    const data = yield contract.lock(toWei(amountQ), { from: address })

    if (data.status === true) {
      yield put(getUserBalance(address))
      yield put(getLockedAssets(address))
    }
  } catch (err) {
    console.error('QV.Error', err)
    yield put(setError(err.message))
    yield put(setTransactionLoadingError(err))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * setUnlockAmountGenerator ({ address, amountQ }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    const data = yield contract.unlock(toWei(amountQ), { from: address })

    if (data.status === true) {
      yield put(getUserBalance(address))
      yield put(getLockedAssets(address))
    }
  } catch (err) {
    console.error('QV.Error', err)
    yield put(setError(err.message))
    yield put(setTransactionLoadingError(err))
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
  } catch (err) {
    console.error('getDelegationList.Error', err)
    yield put(getDelegationsListError(err))
  }
}

// Internal contract
function * getBalanceDetailsGenerator () {
  try {
    const data = yield call(getBalanceDetails)
    yield put(getQVBalanceSuccess(data))
  } catch (err) {
    console.error('getDelegationList.Error', err)
  }
}
// done but working  50/50
function * getUpdateCompoundRateGenerator ({ address }) {
  try {
    yield put(setUpdateCompoundRate(true))
    const contract = yield call(getQVaultInstance)
    const data = yield contract.updateCompoundRate({ from: address })
    if (data) {
      yield put(setUpdateCompoundRate('updated'))
    }
  } catch (error) {
    yield put(setUpdateCompoundRate(false))
    yield put(setError(error))
  } finally {
    yield put(setUpdateCompoundRate(false))
  }
}

function * getOutstandingDelegationRewardsValueGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf)

    const contract = yield call(getQVaultInstance)
    const data = yield contract.getDelegationsList(userAddress)
    const result = getOutstandingDelegationRewardsList(data)

    yield put(getOutstandingDelegationRewardsSuccess(result))
  } catch (err) {
    console.error('getOutstandingDelegationRewards.Error', err)
    yield put(getOutstandingDelegationRewardsError(err.message))
  }
}

// Internal contract
function * onClaimStakeDelegatorRewardGenerator () {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })
    const { userAddress } = yield select((state) => state.userInf)
    yield call(claimStakeDelegatorReward, userAddress)
    yield put(getOutstandingDelegationRewards())
    yield put(getDelegationsList())
  } catch (err) {
    console.error('onClaimStakeDelegatorReward.Error', err)
    yield put(setTransactionLoadingError(err.message))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * getMinimumQVaultTimeLockGenerator ({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    const data = yield contract.getMinimumBalance(address, getNowTimestamp())

    yield put(setMinimumQVaultTimeLock(fromWei(data)))
  } catch (err) {
    console.error('getMinimumQVaultTimeLockGenerator.Error', err)
    yield put(setError(err.message))
  } finally {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: -1
    })
  }
}

function * getQVaultTimeLocksGenerator ({ address }) {
  try {
    yield put({
      type: SET_TRANSACTION_COUNTER,
      payload: 1
    })

    const contract = yield call(getQVaultInstance)
    const data = yield contract.getTimeLocks(address)

    yield put(setQVaultTimeLocks(addIndex(data)))
  } catch (err) {
    console.error('getQVaultTimeLocksGenerator.Error', err)
    yield put(setError(err.message))
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

  takeEvery(actionTypes.SET_QV_DEPOSIT_CALL, setDepositGenerator),
  takeEvery(actionTypes.SET_QV_WITHDRAW_CALL, setWithdrawGenerator),
  takeEvery(actionTypes.SET_QV_LOCK_AMOUNT, setLockAmountGenerator),
  takeEvery(actionTypes.SET_QV_UNLOCK_AMOUNT, setUnlockAmountGenerator),
  takeEvery(actionTypes.SET_DELEGATE_STAKE, setDelegateStakeGenerator),
  takeEvery(actionTypes.GET_UPDATE_COMPOUND_RATE, getUpdateCompoundRateGenerator),

  takeEvery(actionTypes.GET_DELEGATIONS_LIST, getDelegationListGenerator),
  takeEvery(actionTypes.GET_QV_BALANCE, getBalanceDetailsGenerator),
  takeEvery(actionTypes.ON_CLAIM_STAKE_DELEGATOR_REWARD, onClaimStakeDelegatorRewardGenerator),
  takeEvery(actionTypes.GET_OUTSTANDING_DELEGATION_REWARDS, getOutstandingDelegationRewardsValueGenerator),

  takeEvery(actionTypes.GET_QVAULT_MINIMUM_TIME_LOCK, getMinimumQVaultTimeLockGenerator),
  takeEvery(actionTypes.GET_QVAULT_TIME_LOCKS, getQVaultTimeLocksGenerator)
]
