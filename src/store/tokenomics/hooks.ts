import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  setDefaultAllocationProxy,
  setDefaultAllocationProxyLoading,
  setqHolderUpdateTime,
  setQHolderUpdateTimeLoading,
  setRootNodeRewardProxy,
  setRootNodeRewardProxyLoading,
  setRootNodesAPR,
  setValidationRewardProxy,
  setValidationRewardProxyLoading,
  setValidatorsAPR,
} from './reducer';

import { getUserAddress, useAppSelector } from 'store';
import { useQVault } from 'store/q-vault/hooks';
import { useValidationRewards } from 'store/validation-rewards/hooks';
import { useValidators } from 'store/validators/hooks';

import {
  getCompoundRateKeeperQVaultInstance,
  getDefaultAllocationProxyInstance,
  getQVaultInstance,
  getRewardKPIInstance,
  getRootNodeRewardProxyInstance,
  getValidationRewardProxyInstance,
} from 'contracts/contract-instance';

import { captureError } from 'utils/errors';

export function useTokenomics () {
  const dispatch = useDispatch();
  const { loadQVBalanceDetails } = useQVault();
  const { getVRPPoolInfo } = useValidationRewards();
  const { loadValidatorDelegatedStake } = useValidators();

  const defaultAllocationProxy = useAppSelector(({ tokenomics }) => tokenomics.defaultAllocationProxy);
  const defaultAllocationProxyLoading = useAppSelector(({ tokenomics }) => tokenomics.defaultAllocationProxyLoading);
  const validationRewardProxy = useAppSelector(({ tokenomics }) => tokenomics.validationRewardProxy);
  const validationRewardProxyLoading = useAppSelector(({ tokenomics }) => tokenomics.validationRewardProxyLoading);
  const rootNodeRewardProxy = useAppSelector(({ tokenomics }) => tokenomics.rootNodeRewardProxy);
  const rootNodeRewardProxyLoading = useAppSelector(({ tokenomics }) => tokenomics.rootNodeRewardProxyLoading);
  const qHolderUpdateTime = useAppSelector(({ tokenomics }) => tokenomics.qHolderUpdateTime);
  const qHolderUpdateTimeLoading = useAppSelector(({ tokenomics }) => tokenomics.qHolderUpdateTimeLoading);
  const rootNodesAPR = useAppSelector(({ tokenomics }) => tokenomics.rootNodesAPR);
  const validatorsAPR = useAppSelector(({ tokenomics }) => tokenomics.validatorsAPR);

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

      receipt.promiEvent
        .once('receipt', () => {
          getDefaultAllocationProxy();
          getRootNodeRewardProxy();
          getValidationRewardProxy();
        })
        .finally(() => dispatch(setDefaultAllocationProxyLoading(false)));

      return receipt;
    } catch (e) {
      dispatch(setDefaultAllocationProxyLoading(false));
      throw e;
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

      receipt.promiEvent
        .once('receipt', () => { getRootNodeRewardProxy(); })
        .finally(() => dispatch(setRootNodeRewardProxyLoading(false)));

      return receipt;
    } catch (e) {
      dispatch(setRootNodeRewardProxyLoading(false));
      throw e;
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

      receipt.promiEvent
        .once('receipt', () => {
          getValidationRewardProxy();
          getVRPPoolInfo();
          loadValidatorDelegatedStake();
        })
        .finally(() => dispatch(setValidationRewardProxyLoading(false)));

      return receipt;
    } catch (e) {
      dispatch(setValidationRewardProxyLoading(false));
      throw e;
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
      });

      receipt.promiEvent
        .once('receipt', () => { getQHolderUpdateTime(); })
        .finally(() => dispatch(setQHolderUpdateTimeLoading(false)));
      return receipt;
    } catch (e) {
      dispatch(setQHolderUpdateTimeLoading(false));
      throw e;
    }
  }

  async function getRootNodesAPR () {
    try {
      const contract = getRewardKPIInstance();
      const apr = await contract.getRootNodesAPR();
      dispatch(setRootNodesAPR(apr));
    } catch (error) {
      captureError(error);
    }
  }

  async function getValidatorsAPR () {
    try {
      const contract = getRewardKPIInstance();
      const apr = await contract.getValidatorsAPR();
      dispatch(setValidatorsAPR(apr));
    } catch (error) {
      captureError(error);
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

    rootNodesAPR,
    validatorsAPR,

    getDefaultAllocationProxy: useCallback(getDefaultAllocationProxy, []),
    allocateDefaultProxyRewards: useCallback(allocateDefaultProxyRewards, []),

    getRootNodeRewardProxy: useCallback(getRootNodeRewardProxy, []),
    allocateRootNodeProxyRewards: useCallback(allocateRootNodeProxyRewards, []),

    getValidationRewardProxy: useCallback(getValidationRewardProxy, []),
    allocateValidationProxyRewards: useCallback(allocateValidationProxyRewards, []),

    getQHolderUpdateTime: useCallback(getQHolderUpdateTime, []),
    allocateQHolderRewards: useCallback(allocateQHolderRewards, []),

    getValidatorsAPR: useCallback(getValidatorsAPR, []),
    getRootNodesAPR: useCallback(getRootNodesAPR, []),
  };
}
