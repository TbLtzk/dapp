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
} from 'store/transaction-handler/actions';

import { getBorrowingCoreInstance, getEpdrParametersInstance, getSavingInstance } from 'contracts/contract-instance';
import { getBorrowAssetRateAndFee, getVaultWithFee } from 'contracts/helpers/borrowing-core';

import { BorrowAssets } from 'constants/defiTypes';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { fromWei } from 'utils/balance';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';
import { fillArray, uintPerSecondToPerYearNumber } from 'utils/useful';

function* setCreateVaultGenerator ({ asset, label }: { asset: Asset, label:string }) {
  try {
    yield* put(setTransactionLoading());
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(getBorrowingCoreInstance);

    const transaction = yield* call(() => contract.createVault(asset, { from: userAddress }));
    yield put(getBorrowingVaults());

    yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
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
    captureError(error);
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

    const outstandingDebt = fullDebts.reduce((sum, curr) => (sum as number) + Number(fromWei(curr)), 0) as number;

    yield* put(getOutstandingDebtSuccess(outstandingDebt));
  } catch (error) {
    yield* put(getOutstandingDebtError(error));
    captureError(error);
  }
}

function* getTotalSavingBalanceGenerator () {
  try {
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(getSavingInstance);
    const savingAmount = yield* call(() =>
      contract.instance.methods.getBalance().call({
        from: userAddress,
      })
    );
    yield* put(getTotalSavingBalanceSuccess(fromWei(savingAmount)));
  } catch (error) {
    yield* put(getTotalSavingBalanceError(error));
    captureError(error);
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
    captureError(error);
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
    captureError(error);
  }
}

function* getInterestRatesGenerator () {
  try {
    const interestRates = yield* all(Object.values(BorrowAssets).map(getBorrowAssetRateAndFee));
    yield* put(getInterestRatesSuccess(interestRates as BorrowAssetsRateAndFee[]));
  } catch (error) {
    yield* put(getInterestRatesError(error));
    captureError(error);
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
