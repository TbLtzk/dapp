import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  setDefaultAllocationProxy,
  setDefaultAllocationProxyLoading,
  setqHolderUpdateTime,
  setQHolderUpdateTimeLoading,
  setRootNodeRewardProxy,
  setRootNodeRewardProxyLoading,
  setValidationRewardProxy,
  setValidationRewardProxyLoading
} from './reducer';

import { getUserAddress, useAppSelector } from 'store';
import { useQVault } from 'store/q-vault/hooks';

import {
  getCompoundRateKeeperQVaultInstance,
  getDefaultAllocationProxyInstance,
  getQVaultInstance,
  getRootNodeRewardProxyInstance,
  getValidationRewardProxyInstance,
} from 'contracts/contract-instance';

import { captureError } from 'utils/errors';

export function useTokenomics () {
  const dispatch = useDispatch();
  const { loadQVBalanceDetails } = useQVault();

  const defaultAllocationProxy = useAppSelector(({ tokenomics }) => tokenomics.defaultAllocationProxy);
  const defaultAllocationProxyLoading = useAppSelector(({ tokenomics }) => tokenomics.defaultAllocationProxyLoading);
  const validationRewardProxy = useAppSelector(({ tokenomics }) => tokenomics.validationRewardProxy);
  const validationRewardProxyLoading = useAppSelector(({ tokenomics }) => tokenomics.validationRewardProxyLoading);
  const rootNodeRewardProxy = useAppSelector(({ tokenomics }) => tokenomics.rootNodeRewardProxy);
  const rootNodeRewardProxyLoading = useAppSelector(({ tokenomics }) => tokenomics.rootNodeRewardProxyLoading);
  const qHolderUpdateTime = useAppSelector(({ tokenomics }) => tokenomics.qHolderUpdateTime);
  const qHolderUpdateTimeLoading = useAppSelector(({ tokenomics }) => tokenomics.qHolderUpdateTimeLoading);

  async function getDefaultAllocationProxy () {
    try {
      const contract = await getDefaultAllocationProxyInstance();
      const balance = await contract.getBalance();
      dispatch(setDefaultAllocationProxy(balance));
    } catch (error) {
      captureError(error);
    }
  }

  async function allocateDefaultProxyRewards () {
    dispatch(setDefaultAllocationProxyLoading(true));
    try {
      const contract = await getDefaultAllocationProxyInstance();
      const receipt = await contract.allocate({ from: getUserAddress() });

      getDefaultAllocationProxy();
      getRootNodeRewardProxy();
      getValidationRewardProxy();

      return receipt;
    } finally {
      dispatch(setDefaultAllocationProxyLoading(false));
    }
  }

  async function getRootNodeRewardProxy () {
    try {
      const contract = await getRootNodeRewardProxyInstance();
      const balance = await contract.getBalance();
      dispatch(setRootNodeRewardProxy(balance));
    } catch (error) {
      captureError(error);
    }
  }

  async function allocateRootNodeProxyRewards () {
    dispatch(setRootNodeRewardProxyLoading(true));
    try {
      const contract = await getRootNodeRewardProxyInstance();
      const receipt = await contract.allocate({ from: getUserAddress() });

      getRootNodeRewardProxy();
      return receipt;
    } finally {
      dispatch(setRootNodeRewardProxyLoading(false));
    }
  }

  async function getValidationRewardProxy () {
    try {
      const contract = await getValidationRewardProxyInstance();
      const balance = await contract.getBalance();
      dispatch(setValidationRewardProxy(balance));
    } catch (error) {
      captureError(error);
    }
  }

  async function allocateValidationProxyRewards () {
    dispatch(setValidationRewardProxyLoading(true));
    try {
      const contract = await getValidationRewardProxyInstance();
      const receipt = await contract.allocate({ from: getUserAddress() });

      getValidationRewardProxy();
      return receipt;
    } finally {
      dispatch(setValidationRewardProxyLoading(false));
    }
  }

  async function getQHolderUpdateTime () {
    try {
      const contract = await getCompoundRateKeeperQVaultInstance();
      const lastUpdate = await contract.getLastUpdate();
      dispatch(setqHolderUpdateTime(lastUpdate));
      loadQVBalanceDetails();
    } catch (error) {
      captureError(error);
    }
  }

  async function allocateQHolderRewards () {
    dispatch(setQHolderUpdateTimeLoading(true));
    try {
      const contract = await getQVaultInstance();
      const receipt = await contract.updateCompoundRate({
        from: getUserAddress(),
        gasBuffer: 1.2,
      });

      getQHolderUpdateTime();
      return receipt;
    } finally {
      dispatch(setQHolderUpdateTimeLoading(false));
    }
  }

  return {
    defaultAllocationProxy,
    defaultAllocationProxyLoading,

    validationRewardProxy,
    validationRewardProxyLoading,

    rootNodeRewardProxy,
    rootNodeRewardProxyLoading,

    qHolderUpdateTime,
    qHolderUpdateTimeLoading,

    getDefaultAllocationProxy: useCallback(getDefaultAllocationProxy, []),
    allocateDefaultProxyRewards: useCallback(allocateDefaultProxyRewards, []),

    getRootNodeRewardProxy: useCallback(getRootNodeRewardProxy, []),
    allocateRootNodeProxyRewards: useCallback(allocateRootNodeProxyRewards, []),

    getValidationRewardProxy: useCallback(getValidationRewardProxy, []),
    allocateValidationProxyRewards: useCallback(allocateValidationProxyRewards, []),

    getQHolderUpdateTime: useCallback(getQHolderUpdateTime, []),
    allocateQHolderRewards: useCallback(allocateQHolderRewards, []),
  };
}
