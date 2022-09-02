import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { fromWei, toWei } from 'web3-utils';

import { setAllowance, setAvailableToDeposit, setBalanceDetails } from './reducer';

import { getUserAddress, useAppSelector } from 'store';
import { useBorrowingCore } from 'store/borrowing-core/hooks';

import { getSavingInstance, getStableCoinInstance } from 'contracts/contract-instance';
import { getSavingBalanceDetailsHelper } from 'contracts/helpers/saving-assets-helper';

import { MAX_APPROVE_AMOUNT } from 'constants/boundaries';
import { captureError } from 'utils/errors';

export function useSavingAssets () {
  const dispatch = useDispatch();
  const { getOutstandingDebt, getTotalSavingBalance, getSavingAssets } = useBorrowingCore();

  const savingBalanceDetails = useAppSelector(({ savingAssets }) => savingAssets.balanceDetails);
  const savingAvailableToDeposit = useAppSelector(({ savingAssets }) => savingAssets.availableToDeposit);
  const savingAllowance = useAppSelector(({ savingAssets }) => savingAssets.allowance);

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

    getSavingBalanceDetails();
    getOutstandingDebt();
    getSavingAllowance();
    getTotalSavingBalance();
    getSavingAvailableToDeposit();
    getSavingAssets();

    return receipt;
  }

  async function withdrawSaving (amount: string) {
    const contract = await getSavingInstance();
    const receipt = await contract.withdraw(toWei(amount), { from: getUserAddress() });

    getSavingBalanceDetails();
    getOutstandingDebt();
    getSavingAllowance();
    getTotalSavingBalance();
    getSavingAvailableToDeposit();
    getSavingAssets();

    return receipt;
  }

  async function approveSaving () {
    const contract = await getStableCoinInstance();
    const contractSaving = await getSavingInstance();
    const receipt = await contract.approve(contractSaving.address, MAX_APPROVE_AMOUNT, {
      from: getUserAddress()
    });

    getSavingBalanceDetails();
    getOutstandingDebt();
    getSavingAllowance();
    getTotalSavingBalance();
    getSavingAvailableToDeposit();
    getSavingAssets();

    return receipt;
  }

  async function updateSavingCompoundRate () {
    const contract = await getSavingInstance();
    return contract.updateCompoundRate({ from: getUserAddress(), gasBuffer: 1.2 });
  }

  return {
    savingBalanceDetails,
    savingAvailableToDeposit,
    savingAllowance,

    getSavingAllowance: useCallback(getSavingAllowance, []),
    getSavingBalanceDetails: useCallback(getSavingBalanceDetails, []),
    getSavingAvailableToDeposit: useCallback(getSavingAvailableToDeposit, []),
    depositSaving: useCallback(depositSaving, []),
    withdrawSaving: useCallback(withdrawSaving, []),
    approveSaving: useCallback(approveSaving, []),
    updateSavingCompoundRate: useCallback(updateSavingCompoundRate, [])
  };
}
