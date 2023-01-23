import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { calculateInterestRate } from '@q-dev/utils';
import { fromWei, toWei } from 'web3-utils';

import {
  setAllowance,
  setAvailableToDeposit,
  setBalanceDetails,
  setSavingAssets,
  setSavingAssetsError,
  setSavingRate,
  setTotalSavingBalance
} from './reducer';

import { getUserAddress, useAppSelector } from 'store';

import { getEpdrParametersInstance, getSavingInstance, getStableCoinInstance } from 'contracts/contract-instance';
import { getSavingBalanceDetailsHelper } from 'contracts/helpers/saving-assets-helper';

import { MAX_APPROVE_AMOUNT } from 'constants/boundaries';
import { unixToDate } from 'utils/date';
import { captureError } from 'utils/errors';

export function useSaving () {
  const dispatch = useDispatch();
  const { getSavingAssets } = useSavingAssets();

  const totalSavingBalance = useAppSelector(({ saving }) => saving.totalSavingBalance);
  const savingRate = useAppSelector(({ saving }) => saving.savingRate);

  const savingBalanceDetails = useAppSelector(({ saving }) => saving.balanceDetails);
  const savingAvailableToDeposit = useAppSelector(({ saving }) => saving.availableToDeposit);
  const savingAllowance = useAppSelector(({ saving }) => saving.allowance);

  async function getSavingAllowance () {
    try {
      const stableCoinInstance = await getStableCoinInstance();
      const savingInstance = await getSavingInstance();
      const allowance = await stableCoinInstance.allowance(getUserAddress(), savingInstance.address);

      dispatch(setAllowance(allowance));
    } catch (error) {
      captureError(error);
    }
  }

  async function getSavingBalanceDetails () {
    try {
      const contract = await getSavingInstance();
      const balanceDetails = await contract.getBalanceDetails(getUserAddress());
      const result = await getSavingBalanceDetailsHelper(balanceDetails);
      dispatch(setBalanceDetails(result));
    } catch (error) {
      captureError(error);
    }
  }

  async function getSavingAvailableToDeposit () {
    try {
      const contract = await getStableCoinInstance();
      const result = await contract.balanceOf(getUserAddress());
      dispatch(setAvailableToDeposit(fromWei(result)));
    } catch (error) {
      captureError(error);
    }
  }

  async function depositSaving (amount: string) {
    const contract = await getSavingInstance();
    const receipt = await contract.deposit(toWei(amount), { from: getUserAddress() });

    receipt.promiEvent
      .once('receipt', () => {
        getSavingBalanceDetails();
        getSavingAllowance();
        getTotalSavingBalance();
        getSavingAvailableToDeposit();
        getSavingAssets();
      });

    return receipt;
  }

  async function withdrawSaving (amount: string) {
    const contract = await getSavingInstance();
    const receipt = await contract.withdraw(toWei(amount), { from: getUserAddress() });

    receipt.promiEvent
      .once('receipt', () => {
        getSavingBalanceDetails();
        getSavingAllowance();
        getTotalSavingBalance();
        getSavingAvailableToDeposit();
        getSavingAssets();
      });

    return receipt;
  }

  async function approveSaving () {
    const contract = await getStableCoinInstance();
    const contractSaving = await getSavingInstance();
    const receipt = await contract.approve(contractSaving.address, MAX_APPROVE_AMOUNT, {
      from: getUserAddress()
    });

    receipt.promiEvent
      .once('receipt', () => {
        getSavingBalanceDetails();
        getSavingAllowance();
        getTotalSavingBalance();
        getSavingAvailableToDeposit();
        getSavingAssets();
      });

    return receipt;
  }

  async function updateSavingCompoundRate () {
    const contract = await getSavingInstance();
    return contract.updateCompoundRate({ from: getUserAddress() });
  }

  async function getTotalSavingBalance () {
    try {
      const contract = await getSavingInstance();
      const savingAmount = await contract.instance.methods.getBalance()
        .call({ from: getUserAddress() });
      dispatch(setTotalSavingBalance(fromWei(savingAmount)));
    } catch (error) {
      captureError(error);
    }
  }

  async function getSavingRate () {
    try {
      const contract = await getEpdrParametersInstance();
      const savingRate = await contract.getUint('governed.EPDR.QUSD_savingRate');
      const rate = calculateInterestRate(Number(savingRate));
      dispatch(setSavingRate(rate));
    } catch (error) {
      captureError(error);
    }
  }

  return {
    savingBalanceDetails,
    savingAvailableToDeposit,
    savingAllowance,
    totalSavingBalance,
    savingRate,

    getSavingAllowance: useCallback(getSavingAllowance, []),
    getSavingBalanceDetails: useCallback(getSavingBalanceDetails, []),
    getSavingAvailableToDeposit: useCallback(getSavingAvailableToDeposit, []),
    depositSaving: useCallback(depositSaving, []),
    withdrawSaving: useCallback(withdrawSaving, []),
    approveSaving: useCallback(approveSaving, []),
    updateSavingCompoundRate: useCallback(updateSavingCompoundRate, []),
    getTotalSavingBalance: useCallback(getTotalSavingBalance, []),
    getSavingRate: useCallback(getSavingRate, []),
  };
}

export function useSavingAssets () {
  const dispatch = useDispatch();

  const savingAssets = useAppSelector(({ saving }) => saving.savingAssets);
  const savingAssetsLoading = useAppSelector(({ saving }) => saving.savingAssetsLoading);
  const savingAssetsError = useAppSelector(({ saving }) => saving.savingAssetsError);

  async function getSavingAssets () {
    try {
      const contract = await getSavingInstance();
      const balanceDetails = await contract.getBalanceDetails(getUserAddress());

      dispatch(setSavingAssets([{
        depositAsset: 'QUSD',
        interestAsset: 'QUSD',
        rate: calculateInterestRate(Number(balanceDetails.interestRate)),
        balance: fromWei(balanceDetails.currentBalance),
        compoundRateUpdated: unixToDate(balanceDetails.lastUpdateOfCompoundRate).getTime(),
      }]));
    } catch (error) {
      dispatch(setSavingAssetsError(error));
      captureError(error);
    }
  }

  return {
    savingAssets,
    savingAssetsLoading,
    savingAssetsError,
    getSavingAssets: useCallback(getSavingAssets, []),
  };
}
