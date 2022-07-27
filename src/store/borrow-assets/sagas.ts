import { call, put, select, takeEvery } from 'typed-redux-saga';
import { ApproveType, Asset, BorrowAction, BorrowActionDepositWithdraw } from 'typings/defi';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from '../transaction-handler/action-creators';

import { getOutstandingDebt, getTotalSavingBalance } from './../borrowing-core/actions';
import {
  getBorrowAllowance,
  getBorrowAllowanceDepositSuccess,
  getBorrowAllowanceError,
  getBorrowAllowanceRepaySuccess,
  getBorrowVault,
  getBorrowVaultError,
  getBorrowVaultSuccess,
} from './actions';
import * as types from './types';

import { getSavingAviableToDeposit } from 'store/saving-assets/action-creators';

import { getBorrowingCoreInstance } from 'contracts/contract-instance';
import { convertToBigAmount, getDeFiContractByType, prepareVaultdata } from 'contracts/helpers/borrow-assets-helper';

import formTypes from 'constants/form-types';
import { MAX_APPROVE_AMOUNT } from 'constants/numbers';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { fromWei, toWei } from 'func/balance';
import { captureError, getErrorMessage } from 'func/errors';

function* getBorrowVaultGenerator ({ vaultId }: { vaultId: number | string }) {
  try {
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(getBorrowingCoreInstance);

    const vaultStats = yield* call(() => contract.getVaultStats(userAddress, vaultId));

    const borrowVault = yield* call(prepareVaultdata, vaultStats, userAddress);

    yield* put(getBorrowVaultSuccess(borrowVault));
  } catch (error) {
    yield* put(getBorrowVaultError(error));
    captureError(error);
  }
}

function* getBorrowAllowanceGenerator ({ borrowType, asset }: { borrowType: ApproveType; asset: Asset }) {
  try {
    const { userAddress } = yield* select((state) => state.userInf);

    const contract = yield* call(getDeFiContractByType, borrowType, asset);
    const borrowingCoreInstance = yield* call(getBorrowingCoreInstance);
    const allowance: any = yield* call(() => contract.allowance(userAddress, borrowingCoreInstance.address));

    if (borrowType === 'deposit') {
      const allowAmount = yield* call(() => allowance.call());
      yield* put(getBorrowAllowanceDepositSuccess(fromWei(allowAmount)));
    } else {
      yield* put(getBorrowAllowanceRepaySuccess(fromWei(allowance)));
    }
  } catch (error) {
    yield* put(getBorrowAllowanceError(error));
    captureError(error);
  }
}

function* setBorrowAproveGenerator ({ borrowType, asset }: { borrowType: ApproveType; asset: Asset }) {
  try {
    yield* put(setTransactionLoading());

    const { userAddress } = yield* select((state) => state.userInf);
    const borrowingContract = yield* call(getBorrowingCoreInstance);
    const contract = yield* call(getDeFiContractByType, borrowType, asset);
    if (borrowType === 'deposit') {
      yield* call(() => contract.approve(borrowingContract.address, MAX_APPROVE_AMOUNT).send({ from: userAddress }));
    } else {
      yield* call(() => contract.approve(borrowingContract.address, MAX_APPROVE_AMOUNT, { from: userAddress }));
    }
    yield* put(getBorrowAllowance(borrowType, asset));
    yield* put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setBorrowAsBorrowGenerator ({ amount, vaultId }: BorrowAction) {
  try {
    yield* put(setTransactionLoading());
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(getBorrowingCoreInstance);
    yield* call(() => contract.generateStc(vaultId, toWei(amount), { from: userAddress }));

    yield* put(getBorrowVault(vaultId));

    yield* put(getOutstandingDebt());
    yield* put(getTotalSavingBalance());
    yield* put(getSavingAviableToDeposit());

    yield* put(setTransactionLoadingSuccess({ type: formTypes.borrowAssetBorrow }));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setBorrowRepayGenerator ({ amount, vaultId }: BorrowAction) {
  try {
    yield* put(setTransactionLoading());
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(getBorrowingCoreInstance);
    yield* call(() => contract.payBackStc(vaultId, toWei(amount), { from: userAddress }));

    yield* put(getBorrowVault(vaultId));
    yield* put(getOutstandingDebt());
    yield* put(getTotalSavingBalance());
    yield* put(getSavingAviableToDeposit());

    yield* put(setTransactionLoadingSuccess({ type: formTypes.borrowAssetRepay }));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setBorrowDepositGenerator ({ amount, vaultId, decimals }: BorrowActionDepositWithdraw) {
  try {
    yield* put(setTransactionLoading());
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(getBorrowingCoreInstance);
    const convertAmount = convertToBigAmount(decimals);
    yield* call(() => contract.depositCol(vaultId, convertAmount(amount), { from: userAddress }));

    yield* put(getBorrowVault(vaultId));
    yield* put(getOutstandingDebt());
    yield* put(getTotalSavingBalance());
    yield* put(getSavingAviableToDeposit());

    yield* put(setTransactionLoadingSuccess({ type: formTypes.borrowAssetDeposit }));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setBorrowWithdrawGenerator ({ amount, vaultId, decimals }: BorrowActionDepositWithdraw) {
  try {
    yield* put(setTransactionLoading());
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(getBorrowingCoreInstance);
    const convertAmount = convertToBigAmount(decimals);

    yield* call(() => contract.withdrawCol(vaultId, convertAmount(amount), { from: userAddress }));

    yield* put(getBorrowVault(vaultId));
    yield* put(getOutstandingDebt());
    yield* put(getTotalSavingBalance());
    yield* put(getSavingAviableToDeposit());

    yield* put(setTransactionLoadingSuccess({ type: formTypes.borrowAssetWithdraw }));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

export default [
  takeEvery<types.GetBorrowVault>('GET_BORROW_VAULT', getBorrowVaultGenerator),
  takeEvery<types.GetBorrowAllowance>('GET_BORROW_ALLOWANCE', getBorrowAllowanceGenerator),

  takeEvery<types.SetBorrowApprove>('SET_BORROW_APPROVE', setBorrowAproveGenerator),

  takeEvery<types.SetBorrowDeposit>('SET_BORROW_DEPOSIT', setBorrowDepositGenerator),
  takeEvery<types.SetBorrowAsBorrow>('SET_BORROW_AS_BORROW', setBorrowAsBorrowGenerator),
  takeEvery<types.SetBorrowRepay>('SET_BORROW_REPAY', setBorrowRepayGenerator),
  takeEvery<types.SetBorrowWithdraw>('SET_BORROW_WITHDRAW', setBorrowWithdrawGenerator),
];
