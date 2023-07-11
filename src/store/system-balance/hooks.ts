import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ErrorHandler } from 'helpers';
import { StablecoinAsset } from 'typings/defi';

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

export function useSystemAssetBalance (asset: StablecoinAsset) {
  const dispatch = useDispatch();

  const stablecoinTotalSupply = useAppSelector(({ systemBalance }) => systemBalance.stablecoinMap[asset].totalSupply);
  const systemBalance = useAppSelector(({ systemBalance }) => systemBalance.stablecoinMap[asset].systemBalance);
  const systemBalanceDebt = useAppSelector(({ systemBalance }) => systemBalance.stablecoinMap[asset].systemBalanceDebt);
  const systemBalanceSurplus = useAppSelector(({ systemBalance }) =>
    systemBalance.stablecoinMap[asset].systemBalanceSurplus
  );

  async function performNetting () {
    const contract = await getSystemBalanceInstance(asset);
    return contract.performNetting({ from: getUserAddress() });
  }

  async function loadStableCoinTotalSupply () {
    try {
      const contract = await getStableCoinInstance(asset);
      const totalSupply = await contract.totalSupply();
      dispatch(setStableCoinTotalSupply({
        asset,
        totalSupply: fromWei(totalSupply)
      }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadSystemBalance () {
    try {
      const contract = await getSystemBalanceInstance(asset);
      const balance = await contract.getBalance();
      dispatch(setSystemBalance({
        asset,
        balance: fromWei(balance)
      }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadSystemBalanceDebt () {
    try {
      const contract = await getSystemBalanceInstance(asset);
      const debt = await contract.getDebt();
      dispatch(setSystemBalanceDebt({
        asset,
        balance: fromWei(debt)
      }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadSystemBalanceSurplus () {
    try {
      const contract = await getSystemBalanceInstance(asset);
      const surplus = await contract.getSurplus();
      dispatch(setSystemBalanceSurplus({
        asset,
        balance: fromWei(surplus)
      }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    stablecoinTotalSupply,
    systemBalance,
    systemBalanceDebt,
    systemBalanceSurplus,

    performNetting: useCallback(performNetting, [asset]),
    loadStableCoinTotalSupply: useCallback(loadStableCoinTotalSupply, [asset]),
    loadSystemBalance: useCallback(loadSystemBalance, [asset]),
    loadSystemBalanceDebt: useCallback(loadSystemBalanceDebt, [asset]),
    loadSystemBalanceSurplus: useCallback(loadSystemBalanceSurplus, [asset]),
  };
}

export function useSystemBalance () {
  const dispatch = useDispatch();

  const systemReserveBalance = useAppSelector(({ systemBalance }) => systemBalance.systemReserveBalance);
  const systemReserveAvailableAmount = useAppSelector(
    ({ systemBalance }) => systemBalance.systemReserveAvailableAmount
  );

  async function loadSystemReserveAvailableAmount () {
    try {
      const contract = await getSystemReserveInstance();
      const availableAmount = await contract.availableAmount();
      dispatch(setSystemReserveAvailableAmount(fromWei(availableAmount)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadSystemReserveBalance () {
    try {
      const contract = await getSystemReserveInstance();
      const balance = await contract.getBalance();
      dispatch(setSystemReserveBalance(balance));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    systemReserveBalance,
    systemReserveAvailableAmount,

    loadSystemReserveAvailableAmount: useCallback(loadSystemReserveAvailableAmount, []),
    loadSystemReserveBalance: useCallback(loadSystemReserveBalance, []),
  };
}
