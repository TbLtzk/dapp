import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ErrorHandler } from 'helpers';

import {
  setStableCoinTotalSupply,
  setSystemBalance,
  setSystemBalanceDebt,
  setSystemBalanceSurplus,
  setSystemReserveAvailableAmount,
  setSystemReserveBalance
} from './reducer';

import { getUserAddress, useAppSelector } from 'store';

import { getStableCoinInstance, getSystemBalanceInstance, getSystemReserveInstance } from 'contracts/contract-instance';

import { fromWei } from 'utils/web3';

export function useSystemBalance () {
  const dispatch = useDispatch();

  const stableCoinTotalSupply = useAppSelector(({ systemBalance }) => systemBalance.stableCoinTotalSupply);
  const systemBalance = useAppSelector(({ systemBalance }) => systemBalance.systemBalance);
  const systemBalanceDebt = useAppSelector(({ systemBalance }) => systemBalance.systemBalanceDebt);
  const systemBalanceSurplus = useAppSelector(({ systemBalance }) => systemBalance.systemBalanceSurplus);
  const systemReserveBalance = useAppSelector(({ systemBalance }) => systemBalance.systemReserveBalance);
  const systemReserveAvailableAmount = useAppSelector(
    ({ systemBalance }) => systemBalance.systemReserveAvailableAmount
  );

  async function performNetting () {
    const contract = await getSystemBalanceInstance();
    return contract.performNetting({ from: getUserAddress() });
  }

  async function getStableCoinTotalSupply () {
    try {
      const contract = await getStableCoinInstance();
      const totalSupply = await contract.totalSupply();
      dispatch(setStableCoinTotalSupply(fromWei(totalSupply)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getSystemBalance () {
    try {
      const contract = await getSystemBalanceInstance();
      const balance = await contract.getBalance();
      dispatch(setSystemBalance(fromWei(balance)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getSystemBalanceDebt () {
    try {
      const contract = await getSystemBalanceInstance();
      const debt = await contract.getDebt();
      dispatch(setSystemBalanceDebt(fromWei(debt)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getSystemBalanceSurplus () {
    try {
      const contract = await getSystemBalanceInstance();
      const surplus = await contract.getSurplus();
      dispatch(setSystemBalanceSurplus(fromWei(surplus)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getSystemReserveAvailableAmount () {
    try {
      const contract = await getSystemReserveInstance();
      const availableAmount = await contract.availableAmount();
      dispatch(setSystemReserveAvailableAmount(fromWei(availableAmount)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getSystemReserveBalance () {
    try {
      const contract = await getSystemReserveInstance();
      const balance = await contract.getBalance();
      dispatch(setSystemReserveBalance(balance));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    stableCoinTotalSupply,
    systemBalance,
    systemBalanceDebt,
    systemBalanceSurplus,
    systemReserveBalance,
    systemReserveAvailableAmount,

    performNetting: useCallback(performNetting, []),
    getStableCoinTotalSupply: useCallback(getStableCoinTotalSupply, []),
    getSystemBalance: useCallback(getSystemBalance, []),
    getSystemBalanceDebt: useCallback(getSystemBalanceDebt, []),
    getSystemBalanceSurplus: useCallback(getSystemBalanceSurplus, []),
    getSystemReserveAvailableAmount: useCallback(getSystemReserveAvailableAmount, []),
    getSystemReserveBalance: useCallback(getSystemReserveBalance, []),
  };
}
