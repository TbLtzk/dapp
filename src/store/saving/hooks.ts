import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { calculateInterestRate } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { ErrorHandler } from 'helpers';
import { StablecoinAsset } from 'typings/defi';

import useNetworkConfig from 'hooks/useNetworkConfig';

import {
  setAllowance,
  setBalanceDetails,
  setSavingAssets,
  setSavingAssetsError,
  setSavingRate,
  setStablecoinBalance,
  setTotalSavingBalance
} from './reducer';

import { useAppSelector } from 'store';

import { getEpdrParametersInstance, getSavingInstance, getStableCoinInstance } from 'contracts/contract-instance';
import { getSavingBalanceDetailsHelper } from 'contracts/helpers/saving-assets-helper';

import { MAX_APPROVE_AMOUNT } from 'constants/boundaries';
import { unixToDate } from 'utils/date';
import { fromWei, toWei } from 'utils/web3';

export function useSaving (asset: StablecoinAsset) {
  const dispatch = useDispatch();
  const { loadSavingAssets } = useSavingAssets();
  const { loadStablecoinBalance } = useStablecoinBalance(asset);

  const { address: accountAddress } = useWeb3Context();

  const totalSavingBalance = useAppSelector(({ saving }) => saving.stablecoinMap[asset].totalSavingBalance);
  const savingRate = useAppSelector(({ saving }) => saving.stablecoinMap[asset].savingRate);

  const savingBalanceDetails = useAppSelector(({ saving }) => saving.stablecoinMap[asset].balanceDetails);
  const savingAllowance = useAppSelector(({ saving }) => saving.stablecoinMap[asset].allowance);

  async function loadSavingAllowance () {
    try {
      const stableCoinInstance = await getStableCoinInstance(asset);
      const savingInstance = await getSavingInstance(asset);
      const [allowance, decimals] = await Promise.all([
        stableCoinInstance.allowance(accountAddress, savingInstance.address),
        stableCoinInstance.decimals()
      ]);

      dispatch(setAllowance({
        asset,
        allowance: fromWei(allowance, decimals)
      }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadSavingBalanceDetails () {
    try {
      const contract = await getSavingInstance(asset);
      const balanceDetails = await contract.getBalanceDetails(accountAddress);
      const result = await getSavingBalanceDetailsHelper(balanceDetails);
      dispatch(setBalanceDetails({ asset, balanceDetails: result }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadTotalSavingBalance () {
    try {
      const contract = await getSavingInstance(asset);
      const savingAmount = await contract.instance.getBalance({ from: accountAddress });
      dispatch(setTotalSavingBalance({
        asset,
        balance: fromWei(savingAmount)
      }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadSavingRate () {
    try {
      const contract = await getEpdrParametersInstance();
      const savingRate = await contract.getUint(`governed.EPDR.${asset}_savingRate`);
      const rate = calculateInterestRate(Number(savingRate));
      dispatch(setSavingRate({ asset, rate }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  function loadAllSavingStates () {
    loadSavingBalanceDetails();
    loadSavingAllowance();
    loadTotalSavingBalance();
    loadStablecoinBalance();
    loadSavingAssets();
  }

  async function depositSaving (amount: string) {
    const contract = await getSavingInstance(asset);
    const tx = await contract.deposit(toWei(amount), { from: accountAddress });

    return {
      tx,
      onSuccess: () => { loadAllSavingStates(); }
    };
  }

  async function withdrawSaving (amount: string) {
    const contract = await getSavingInstance(asset);
    const tx = await contract.withdraw(toWei(amount), { from: accountAddress });

    return {
      tx,
      onSuccess: () => { loadAllSavingStates(); }
    };
  }

  async function approveSaving () {
    const [contract, contractSaving] = await Promise.all([
      getStableCoinInstance(asset),
      getSavingInstance(asset)
    ]);
    const tx = await contract.approve(contractSaving.address, MAX_APPROVE_AMOUNT, {
      from: accountAddress
    });

    return {
      tx,
      onSuccess: () => { loadAllSavingStates(); }
    };
  }

  async function updateSavingCompoundRate () {
    const contract = await getSavingInstance(asset);
    return contract.updateCompoundRate({ from: accountAddress });
  }

  return {
    totalSavingBalance,
    savingRate,
    savingBalanceDetails,
    savingAllowance,

    loadSavingAllowance: useCallback(loadSavingAllowance, [asset]),
    loadSavingBalanceDetails: useCallback(loadSavingBalanceDetails, [asset]),
    depositSaving: useCallback(depositSaving, [asset]),
    withdrawSaving: useCallback(withdrawSaving, [asset]),
    approveSaving: useCallback(approveSaving, [asset]),
    updateSavingCompoundRate: useCallback(updateSavingCompoundRate, [asset]),
    loadTotalSavingBalance: useCallback(loadTotalSavingBalance, [asset]),
    loadSavingRate: useCallback(loadSavingRate, [asset]),
  };
}

export function useSavingAssets () {
  const dispatch = useDispatch();
  const { stablecoins } = useNetworkConfig();
  const { address: accountAddress } = useWeb3Context();

  const savingAssets = useAppSelector(({ saving }) => saving.savingAssets);
  const savingAssetsLoading = useAppSelector(({ saving }) => saving.savingAssetsLoading);
  const savingAssetsError = useAppSelector(({ saving }) => saving.savingAssetsError);

  async function loadSavingAssets () {
    try {
      const contracts = await Promise.all(stablecoins.map(async (asset) => ({
        asset,
        contract: await getSavingInstance(asset)
      })));

      const savingAssets = await Promise.all(
        contracts.map(async ({ contract, asset }) => {
          const balanceDetails = await contract.getBalanceDetails(accountAddress);

          return {
            assetName: asset,
            rate: calculateInterestRate(Number(balanceDetails.interestRate)),
            balance: fromWei(balanceDetails.currentBalance),
            compoundRateUpdated: unixToDate(balanceDetails.lastUpdateOfCompoundRate).getTime(),
          };
        }
        ));

      dispatch(setSavingAssets(savingAssets));
    } catch (error) {
      dispatch(setSavingAssetsError(error));
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    savingAssets,
    savingAssetsLoading,
    savingAssetsError,
    loadSavingAssets: useCallback(loadSavingAssets, []),
  };
}

export function useStablecoinBalance (asset: StablecoinAsset) {
  const dispatch = useDispatch();
  const { address: accountAddress } = useWeb3Context();

  const stablecoinBalance = useAppSelector(({ saving }) => saving.stablecoinBalancesMap[asset]);

  async function loadStablecoinBalance () {
    try {
      const contract = await getStableCoinInstance(asset);
      const result = await contract.balanceOf(accountAddress);
      dispatch(setStablecoinBalance({
        asset,
        balance: fromWei(result)
      }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    stablecoinBalance,
    loadStablecoinBalance: useCallback(loadStablecoinBalance, [asset]),
  };
}
