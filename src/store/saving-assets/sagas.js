import { put, select, takeEvery, call } from 'redux-saga/effects'
import { getSavingInstance, getStableCoinInstance } from 'contracts/contract-instance'
import {
  setTransactionLoadingError,
  setTransactionLoading,
  setTransactionLoadingSuccess
} from 'store/transaction-handler/action-creators'
import * as actionTypes from './action-types'

import ErrorHandler from 'func/ErrorHandler'
import { getSavingBalanceDetailsHelper } from 'contracts/helpers/saving-assets-helper'
import { fromWei, toWei } from 'func/balance'
import { MAX_APPROVE_AMOUNT } from 'constants/numbers'
import {
  getSavingAllowance,
  getSavingAviableToDeposit,
  getSavingBalanceDetails,
  setSavingAllowance,
  setSavingAviableToDeposit,
  setSavingBalanceDetails
} from './action-creators'
import {
  getSavingAssets,
  getTotalCollateralLockedAndOutstandingDebt,
  getTotalSavingBalance
} from '../borrowing-core/action-creators'

function * getSavingAllowanceGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf)

    const contract = yield call(getStableCoinInstance)
    const contractSaving = yield call(getSavingInstance)

    const allowance = yield contract.allowance(userAddress, contractSaving.address)
    yield put(setSavingAllowance(allowance))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getSavingBalanceDetailsGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getSavingInstance)
    const balanceDetails = yield contract.getBalanceDetails(userAddress)
    const result = yield call(getSavingBalanceDetailsHelper, balanceDetails)
    yield put(setSavingBalanceDetails(result))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getSavingAviableToDepositGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf)

    const contract = yield call(getStableCoinInstance)
    const result = yield contract.balanceOf(userAddress)
    yield put(setSavingAviableToDeposit(fromWei(result)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * setSavingDepositGenerator ({ amount }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getSavingInstance)
    yield contract.deposit(toWei(amount), { from: userAddress })

    yield put(getSavingBalanceDetails())
    yield put(getSavingAviableToDeposit())
    yield put(getSavingAllowance())
    yield put(getTotalSavingBalance())
    yield put(getTotalCollateralLockedAndOutstandingDebt())
    yield put(getSavingAssets())

    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setTransactionLoadingError(errorMsg))
  }
}

function * setSavingWithdrawGenerator ({ amount }) {
  try {
    yield put(setTransactionLoading())

    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getSavingInstance)
    yield contract.withdraw(toWei(amount), { from: userAddress })

    yield put(getSavingBalanceDetails())
    yield put(getSavingAviableToDeposit())
    yield put(getSavingAllowance())
    yield put(getTotalSavingBalance())
    yield put(getTotalCollateralLockedAndOutstandingDebt())
    yield put(getSavingAssets())

    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setTransactionLoadingError(errorMsg))
  }
}

function * setSavingAproveGenerator () {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getStableCoinInstance)
    const contractSaving = yield call(getSavingInstance)
    yield contract.approve(contractSaving.address, MAX_APPROVE_AMOUNT, { from: userAddress })

    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setTransactionLoadingError(errorMsg))
  }
}

export default [
  takeEvery(actionTypes.GET_SAVING_BALANCE_DETAILS, getSavingBalanceDetailsGenerator),
  takeEvery(actionTypes.GET_SAVING_AVIABLE_TO_DEPOSIT, getSavingAviableToDepositGenerator),
  takeEvery(actionTypes.GET_SAVING_ALLOWANCE, getSavingAllowanceGenerator),

  takeEvery(actionTypes.SET_SAVING_DEPOSIT, setSavingDepositGenerator),
  takeEvery(actionTypes.SET_SAVING_WITHDRAW, setSavingWithdrawGenerator),
  takeEvery(actionTypes.SET_SAVING_APROVE, setSavingAproveGenerator)
]
