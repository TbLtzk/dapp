import { call, put, select, takeEvery } from 'redux-saga/effects';

import { setErrorMessage, setTransactionCounter } from '../transaction-handler/action-creators';

import {
  getBorrowAllowance,
  getBorrowVaultInfo,
  setBorrowAllowanceDeposit,
  setBorrowAllowanceRepay,
  setBorrowVaultInfo
} from './action-creators';
import * as actionTypes from './action-types';

import {
  getTotalCollateralLockedAndOutstandingDebt,
  getTotalSavingBalance
} from 'store/borrowing-core/action-creators';

import {
  getBorrowingCoreInstance,
  getGovernedEpdrQbtcAddressInstance,
  getStableCoinInstance
} from 'contracts/contract-instance';
import { getBorrowVaultInfoHelper } from 'contracts/helpers/borrow-assets-helper';

import { fields } from 'constants/fieldsNaming';
import { MAX_APPROVE_AMOUNT } from 'constants/numbers';
import { fromWei, toBtcBlockchain, toWei } from 'func/balance';
import ErrorHandler from 'func/ErrorHandler';

const getContractWithTypeAndKey = async (type) => {
  switch (type) {
    case fields.deposit: {
      const contract = await getGovernedEpdrQbtcAddressInstance();
      return contract.methods;
    }
    case fields.repay: {
      const contract = await getStableCoinInstance();
      return contract;
    }
    default: {
      return null;
    }
  }
};

function * getBorrowAllowanceGenerator ({ borrowType }) {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getContractWithTypeAndKey, borrowType);
    const borrowingContract = yield call(getBorrowingCoreInstance);
    const allowance = yield contract.allowance(userAddress, borrowingContract.address);
    if (borrowType === 'deposit') {
      const allow = yield allowance.call();
      yield put(setBorrowAllowanceDeposit(fromWei(allow)));
    } else if (borrowType === 'repay') {
      yield put(setBorrowAllowanceRepay(fromWei(allowance)));
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getBorrowVaultInfoGenerator ({ vaultId }) {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getBorrowingCoreInstance);
    const vaultStats = yield contract.getVaultStats(userAddress, vaultId);

    const depositContract = yield call(getContractWithTypeAndKey, 'deposit');
    const repayContract = yield call(getContractWithTypeAndKey, 'repay');

    const availableDeposit = yield depositContract.balanceOf(userAddress).call();
    const availableRepay = yield repayContract.balanceOf(userAddress);

    const result = yield call(getBorrowVaultInfoHelper, availableRepay, availableDeposit, vaultStats);
    yield put(setBorrowVaultInfo(result));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * setBorrowAproveGenerator ({ borrowType }) {
  try {
    yield put(setTransactionCounter(1));
    const { userAddress } = yield select((state) => state.userInf);
    const borrowingContract = yield call(getBorrowingCoreInstance);

    const contract = yield call(getContractWithTypeAndKey, borrowType);
    let result;
    if (borrowType === fields.deposit) {
      result = yield contract.approve(borrowingContract.address, MAX_APPROVE_AMOUNT).send({ from: userAddress });
    } else {
      result = yield contract.approve(borrowingContract.address, MAX_APPROVE_AMOUNT, { from: userAddress });
    }
    if (result) {
      yield put(getBorrowAllowance(borrowType));
      yield put(getTotalSavingBalance());
      yield put(getTotalCollateralLockedAndOutstandingDebt());
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setErrorMessage(errorMsg));
  } finally {
    yield put(setTransactionCounter(-1));
  }
}

function * setBorrowDepositGenerator ({ amount, vaultId }) {
  try {
    yield put(setTransactionCounter(1));
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getBorrowingCoreInstance);
    const result = yield contract.depositCol(vaultId, toBtcBlockchain(amount), { from: userAddress });
    if (result) {
      yield put(getBorrowVaultInfo(vaultId));
      yield put(getTotalCollateralLockedAndOutstandingDebt());
      yield put(getTotalSavingBalance());
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setErrorMessage(errorMsg));
  } finally {
    yield put(setTransactionCounter(-1));
  }
}

function * setBorrowAsBorrowGenerator ({ amount, vaultId }) {
  try {
    yield put(setTransactionCounter(1));
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getBorrowingCoreInstance);
    const result = yield contract.generateStc(vaultId, toWei(amount), { from: userAddress });

    if (result) {
      yield put(getBorrowVaultInfo(vaultId));
      yield put(getTotalCollateralLockedAndOutstandingDebt());
      yield put(getTotalSavingBalance());
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setErrorMessage(errorMsg));
  } finally {
    yield put(setTransactionCounter(-1));
  }
}

function * setBorrowRepayGenerator ({ amount, vaultId }) {
  try {
    yield put(setTransactionCounter(1));
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getBorrowingCoreInstance);
    const result = yield contract.payBackStc(vaultId, toWei(amount), { from: userAddress });

    if (result) {
      yield put(getBorrowVaultInfo(vaultId));
      yield put(getTotalCollateralLockedAndOutstandingDebt());
      yield put(getTotalSavingBalance());
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setErrorMessage(errorMsg));
  } finally {
    yield put(setTransactionCounter(-1));
  }
}

function * setBorrowWithdrawGenerator ({ amount, vaultId }) {
  try {
    yield put(setTransactionCounter(1));
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getBorrowingCoreInstance);

    const result = yield contract.withdrawCol(vaultId, toBtcBlockchain(amount), { from: userAddress });

    if (result) {
      yield put(getBorrowVaultInfo(vaultId));
      yield put(getTotalSavingBalance());
      yield put(getTotalCollateralLockedAndOutstandingDebt());
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setErrorMessage(errorMsg));
  } finally {
    yield put(setTransactionCounter(-1));
  }
}

export default [
  takeEvery(actionTypes.GET_BORROW_ALLOWANCE, getBorrowAllowanceGenerator),
  takeEvery(actionTypes.GET_BORROW_VAULT_INFO, getBorrowVaultInfoGenerator),

  takeEvery(actionTypes.SET_BORROW_APPROVE, setBorrowAproveGenerator),

  takeEvery(actionTypes.SET_BORROW_DEPOSIT, setBorrowDepositGenerator),
  takeEvery(actionTypes.SET_BORROW_AS_BORROW, setBorrowAsBorrowGenerator),
  takeEvery(actionTypes.SET_BORROW_REPAY, setBorrowRepayGenerator),
  takeEvery(actionTypes.SET_BORROW_WITHDRAW, setBorrowWithdrawGenerator)
];
