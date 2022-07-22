
import { Vault } from '@q-dev/q-js-sdk';
import { all, call, put, select, takeEvery } from 'typed-redux-saga';
import { Asset, BorrowAssetsRateAndFee, VaultWithFee } from 'typings/defi';

import {
  getBorrowingVaults,
  getBorrowingVaultsError,
  getBorrowingVaultsSuccess,
  getInterestRatesError,
  getInterestRatesSuccess,
  getOutstandingDebtError,
  getOutstandingDebtSuccess,
  getSavingAssetsError,
  getSavingAssetsSuccess,
  getSavingRateError,
  getSavingRateSuccess,
  getTotalSavingBalanceError,
  getTotalSavingBalanceSuccess,
} from './actions';
import * as types from './types';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/action-creators';

import { getBorrowingCoreInstance, getEpdrParametersInstance, getSavingInstance } from 'contracts/contract-instance';
import { getBorrowAssetRateAndFee, getVaultWithFee } from 'contracts/helpers/borrowing-core';

import { BorrowAssets } from 'constants/defiTypes';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { fromWei } from 'func/balance';
import ErrorHandler from 'func/ErrorHandler';
import { fillArray, uintPerSecondToPerYearNumber } from 'func/useful';

function* setCreateVaultGenerator ({ asset }: { asset: Asset }) {
  try {
    yield* put(setTransactionLoading());
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(getBorrowingCoreInstance);

    yield contract.createVault(asset, { from: userAddress });
    yield put(getBorrowingVaults());
    yield put(setTransactionLoadingSuccess({ type: TRANSACTION_TYPES.success }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function* getBorrowingVaultsGenerator () {
  try {
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(getBorrowingCoreInstance);

    const allUserVaults: Vault[] = yield* call(() => contract.getAllUserVaults(userAddress));
    const vaults = yield* all(allUserVaults.map((vault, vaultNum) => getVaultWithFee(vault, vaultNum)));
    yield* put(getBorrowingVaultsSuccess(vaults as VaultWithFee[]));
  } catch (error) {
    yield* put(getBorrowingVaultsError(error));
    ErrorHandler.processWithoutFeedback(error);
  }
}

function* getOutstandingDebtGenerator () {
  try {
    const { userAddress } = yield* select((state) => state.userInf);

    const contract = yield* call(getBorrowingCoreInstance);
    const userVaultsCount = yield* call(() => contract.userVaultsCount(userAddress));

    const fullDebts = yield* all(
      fillArray(userVaultsCount).map((vaultNum) => contract.getFullDebt(userAddress, vaultNum))
    );

    const outstandingDebt = fullDebts.reduce((sum, curr) => sum as number + Number(fromWei(curr)), 0) as number;

    yield* put(getOutstandingDebtSuccess(outstandingDebt));
  } catch (error) {
    yield* put(getOutstandingDebtError(error));
    ErrorHandler.processWithoutFeedback(error);
  }
}

function* getTotalSavingBalanceGenerator () {
  try {
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(getSavingInstance);
    const savingAmount = yield* call(() => contract.instance.methods.getBalance().call({
      from: userAddress,
    }));
    yield* put(getTotalSavingBalanceSuccess(fromWei(savingAmount)));
  } catch (error) {
    yield* put(getTotalSavingBalanceError(error));
    ErrorHandler.processWithoutFeedback(error);
  }
}

function* getSavingAssetsGenerator () {
  try {
    const { userAddress } = yield* select((state) => state.userInf);

    const contract = yield* call(getSavingInstance);
    const balanceDetails = yield* call(() => contract.getBalanceDetails(userAddress));

    const interestRate = uintPerSecondToPerYearNumber(balanceDetails.interestRate) || 0;
    yield* put(
      getSavingAssetsSuccess([
        {
          depositAsset: 'QUSD',
          interestAsset: 'QUSD',
          rate: interestRate,
        },
      ])
    );
  } catch (error) {
    yield* put(getSavingAssetsError(error));
    ErrorHandler.processWithoutFeedback(error);
  }
}

function* getSavingRateGenerator () {
  try {
    const contract = yield* call(getEpdrParametersInstance);
    const savingRate = yield* call(() => contract.getUint('governed.EPDR.QUSD_savingRate'));
    const rate = uintPerSecondToPerYearNumber(savingRate) || 0;
    yield* put(getSavingRateSuccess(rate));
  } catch (error) {
    yield* put(getSavingRateError(error));
    ErrorHandler.processWithoutFeedback(error);
  }
}

function* getInterestRatesGenerator () {
  try {
    const interestRates = yield* all(Object.values(BorrowAssets).map(getBorrowAssetRateAndFee));
    yield* put(getInterestRatesSuccess(interestRates as BorrowAssetsRateAndFee[]));
  } catch (error) {
    yield* put(getInterestRatesError(error));
    ErrorHandler.processWithoutFeedback(error);
  }
}

export default [
  takeEvery<types.SetCreateVault>('SET_CREATE_VAULT', setCreateVaultGenerator),
  takeEvery<types.GetBorrowingVaults>('GET_BORROWING_VAULTS', getBorrowingVaultsGenerator),
  takeEvery<types.GetTotalSavingBalance>('GET_TOTAL_SAVING_BALANCE', getTotalSavingBalanceGenerator),
  takeEvery<types.GetOutstandingDebt>('GET_OUTSTANDING_DEBT', getOutstandingDebtGenerator),
  takeEvery<types.GetSavingAssets>('GET_SAVING_ASSETS', getSavingAssetsGenerator),
  takeEvery<types.GetSavingRate>('GET_SAVING_RATE', getSavingRateGenerator),
  takeEvery<types.GetInterestRates>('GET_INTEREST_RATES', getInterestRatesGenerator),
];
