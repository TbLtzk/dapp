import { put, takeEvery, call, select, all } from 'redux-saga/effects'
import ErrorHandler from 'func/ErrorHandler'
import * as actionTypes from './action-types'
import { setErrorMessage, setTransactionCounter } from 'store/transaction-handler/action-creators'
import {
  generateVaultData,
  getBalanceDetailsHelper,
  getOutstandingDebtHelper,
  getTotalCollateralLockedHelper
} from 'contracts/helpers/borrowing-core-helper'
import {
  getBorrowingCoreInstance,
  getEpdrParametersInstance,
  getSavingInstance,
  getStableCoinInstance
} from 'contracts/contract-instance'
import {
  getBorrowingVaults,
  setBorrowingVaults,
  setInterestRate,
  setOutstandingDebt,
  setSavingAssets,
  setSavingRate,
  setTotalCollateralLocked,
  setTotalSavingBalance,
  setTotalSupply
} from './action-creators'
import { fromWei } from 'func/balance'
import { fillArray, fN, uintPerSecondToPerYearNumber } from 'func/useful'

function * setCreateQBTCVaultGenerator () {
  try {
    yield put(setTransactionCounter(1))
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getBorrowingCoreInstance)
    yield contract.createVault('QBTC', { from: userAddress })
    yield put(getBorrowingVaults())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

function * getTotalCollateralLockedAndOutstandingDebtGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf)

    const contract = yield call(getBorrowingCoreInstance)
    const userVaultsCount = yield contract.userVaultsCount(userAddress)

    const vaultsStats = yield all(
      fillArray(userVaultsCount).map((vaultNum) => contract.getVaultStats(userAddress, vaultNum))
    )
    const outstandingDebt = getOutstandingDebtHelper(vaultsStats)
    const totalCollateralLocked = getTotalCollateralLockedHelper(vaultsStats)
    yield put(setTotalCollateralLocked(totalCollateralLocked))
    yield put(setOutstandingDebt(outstandingDebt))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getTotalSavingBalanceGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getSavingInstance)
    const savingAmount = yield contract.instance.methods.getBalance().call({
      from: userAddress
    })
    yield put(setTotalSavingBalance(fromWei(savingAmount)))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getSavingAssetsGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf)

    const contract = yield call(getSavingInstance)
    const balanceDetails = yield contract.getBalanceDetails(userAddress)
    const assets = yield call(getBalanceDetailsHelper, balanceDetails)

    yield put(setSavingAssets(assets))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getBorrowingVaultsGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getBorrowingCoreInstance)

    const allUserVaults = yield contract.getAllUserVaults(userAddress)
    const vaults = yield all(
      allUserVaults.map((vault, vaultNum) => generateVaultData(contract, userAddress, vault, vaultNum))
    )
    yield put(setBorrowingVaults(vaults))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getTotalSupplyGenerator () {
  try {
    const contract = yield call(getStableCoinInstance)
    const amount = yield contract.totalSupply()
    yield put(setTotalSupply(fN(fromWei(amount))))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getSavingAndInterestRateGenerator () {
  try {
    const contract = yield call(getEpdrParametersInstance)

    const interestRate = yield contract.getUint('governed.EPDR.QBTC_QUSD_interestRate')
    const savingRate = yield contract.getUint('governed.EPDR.QUSD_savingRate')
    yield put(setInterestRate(fN(uintPerSecondToPerYearNumber(interestRate))))
    yield put(setSavingRate(fN(uintPerSecondToPerYearNumber(savingRate))))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [
  takeEvery(actionTypes.SET_CREATE_QBTC_VAULT, setCreateQBTCVaultGenerator),

  takeEvery(actionTypes.GET_TOTAL_SAVING_BALANCE, getTotalSavingBalanceGenerator),
  takeEvery(actionTypes.GET_TOTAL_SUPPLY, getTotalSupplyGenerator),
  takeEvery(actionTypes.GET_SAVING_AND_INTEREST_RATE, getSavingAndInterestRateGenerator),
  takeEvery(
    actionTypes.GET_TOTAL_COLLATERAL_LOCKED_AND_OUTSTANDING_DEBT,
    getTotalCollateralLockedAndOutstandingDebtGenerator
  ),
  takeEvery(actionTypes.GET_SAVING_ASSETS, getSavingAssetsGenerator),
  takeEvery(actionTypes.GET_BORROWING_VAULTS, getBorrowingVaultsGenerator)
]
