import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { calculateInterestRate } from '@q-dev/utils';
import { ErrorHandler } from 'helpers';

import {
  setDelegationInfo,
  setDelegationList,
  setDelegationStakeInfo,
  setQVaultMinimumTimeLock,
  setQVBalance,
  setVaultBalance,
  setVotingLockingEnd,
  setVotingWeight,
  setWalletBalance
} from './reducer';

import { getState, getUserAddress, useAppSelector } from 'store';
import { useBaseVotingWeightInfo } from 'store/proposals/hooks';
import { useValidators } from 'store/validators/hooks';

import { currentProvider, getQVaultInstance, getVotingWeightProxyInstance } from 'contracts/contract-instance';
import { countTotalStakeReward, getDelegatorsShare, getQHolderRewardPool } from 'contracts/helpers/q-vault-helper';

import { dateToUnix } from 'utils/date';
import { fromWei, toWei } from 'utils/web3';

export function useQVault () {
  const dispatch = useDispatch();
  const { getBaseVotingWeightInfo } = useBaseVotingWeightInfo();
  const { loadValidatorStats } = useValidators();

  const vaultBalance = useAppSelector(({ qVault }) => qVault.vaultBalance);
  const walletBalance = useAppSelector(({ qVault }) => qVault.walletBalance);

  const votingWeight = useAppSelector(({ qVault }) => qVault.votingWeight);
  const votingLockingEnd = useAppSelector(({ qVault }) => qVault.votingLockingEnd);
  const isVotingWeightUnlocked = useAppSelector(({ qVault }) => Number(qVault.votingLockingEnd) < dateToUnix());

  const delegationList = useAppSelector(({ qVault }) => qVault.delegationList);
  const loadingDelegationList = useAppSelector(({ qVault }) => qVault.loadingDelegationList);

  const delegationInfo = useAppSelector(({ qVault }) => qVault.delegationInfo);
  const delegationStakeInfo = useAppSelector(({ qVault }) => qVault.delegationStakeInfo);
  const delegationStakeInfoLoading = useAppSelector(({ qVault }) => qVault.delegationStakeInfoLoading);
  const qvBalance = useAppSelector(({ qVault }) => qVault.qvBalance);

  const qVaultMinimumTimeLock = useAppSelector(({ qVault }) => qVault.qVaultMinimumTimeLock);

  async function loadWalletBalance () {
    try {
      const balance = await currentProvider?.getBalance(getUserAddress());
      dispatch(setWalletBalance(fromWei(balance || '0')));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadVaultBalance (address?: string) {
    try {
      const contract = await getQVaultInstance();
      const balance = await contract.balanceOf(address ?? getUserAddress());
      dispatch(setVaultBalance(fromWei(balance)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadAllBalances () {
    try {
      await Promise.all([
        loadWalletBalance(),
        loadVaultBalance(),
        getBaseVotingWeightInfo(),
      ]);
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadLockInfo (address: string) {
    try {
      const contract = await getQVaultInstance();
      const lockInfo = await contract.getLockInfo(address);

      dispatch(setVotingWeight(fromWei(lockInfo.lockedAmount)));
      dispatch(setVotingLockingEnd(lockInfo.lockedUntil));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function depositToVault ({ address, amount }: { address: string; amount: string }) {
    const contract = await getQVaultInstance();
    const tx = await contract.deposit({
      value: toWei(amount),
      from: address,
    });

    return {
      tx,
      onSuccess: () => {
        loadWalletBalance();
        loadVaultBalance();
      }
    };
  }

  async function sendToVault ({ address, amount }: {
    address: string;
    amount: string;
  }) {
    const contract = await getQVaultInstance();
    const tx = await contract.transfer(address, toWei(amount));

    return {
      tx,
      onSuccess: () => {
        loadWalletBalance();
        loadVaultBalance();
      }
    };
  }

  async function withdrawFromVault ({ address, amount }: {
    address: string;
    amount: string;
  }) {
    const contract = await getQVaultInstance();
    const tx = await contract.withdraw(toWei(amount), { from: address });

    return {
      tx,
      onSuccess: () => {
        loadWalletBalance();
        loadVaultBalance();
      }
    };
  }

  async function delegateStake ({ addresses, stakes }: {
    addresses: string[];
    stakes: string[];
  }) {
    const userAddress = getUserAddress();
    const contract = await getQVaultInstance();
    const tx = await contract.delegateStake(addresses, stakes, { from: userAddress });

    return {
      tx,
      onSuccess: () => {
        loadDelegationStakeInfo();
        loadDelegationList();
        loadWalletBalance();
        loadDelegationInfo(userAddress);
        loadValidatorStats();
      }
    };
  }

  async function lockAmount ({ address, amount }: {
    address: string;
    amount: string;
  }) {
    const contract = await getQVaultInstance();
    const tx = await contract.lock(toWei(amount), { from: address });

    return {
      tx,
      onSuccess: () => {
        loadWalletBalance();
        loadVaultBalance();
        loadLockInfo(address);
        loadDelegationInfo(address);
      }
    };
  }

  async function unlockAmount ({ address, amount }: {
    address: string;
    amount: string;
  }) {
    const contract = await getQVaultInstance();
    const tx = await contract.unlock(toWei(amount), { from: address });

    return {
      tx,
      onSuccess: () => {
        loadWalletBalance();
        loadVaultBalance();
        loadLockInfo(address);
        loadDelegationInfo(address);
      }
    };
  }

  async function loadDelegationList () {
    try {
      const userAddress = getUserAddress();
      const contract = await getQVaultInstance();
      const delegationsList = await contract.getDelegationsList(userAddress);
      const delegationsListWithShare = await Promise.all(delegationsList.map(getDelegatorsShare));
      dispatch(setDelegationList(delegationsListWithShare));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadDelegationStakeInfo () {
    try {
      const userAddress = getUserAddress();
      const contract = await getQVaultInstance();
      const delegationsList = await contract.getDelegationsList(userAddress);
      const totalDelegatedStake = await contract.getTotalDelegatedStake(userAddress);
      const delegatableAmount = await contract.getDelegatableAmount(userAddress);

      dispatch(setDelegationStakeInfo({
        totalDelegatedStake: fromWei(totalDelegatedStake),
        delegatableAmount: fromWei(delegatableAmount),
        totalStakeReward: countTotalStakeReward(delegationsList),
      }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function claimStakeDelegatorReward () {
    const userAddress = getUserAddress();
    const contract = await getQVaultInstance();
    const tx = await contract.claimStakeDelegatorReward({ from: userAddress });

    return {
      tx,
      onSuccess: () => {
        loadDelegationStakeInfo();
        loadDelegationList();
        loadWalletBalance();
      }
    };
  }

  async function loadQVBalanceDetails () {
    try {
      const userAddress = getUserAddress();
      const contract = await getQVaultInstance();
      const balanceDetailsData = await contract.getBalanceDetails(userAddress);
      const qHolderRewardPool = await getQHolderRewardPool();

      const { vaultBalance } = getState().qVault;
      const interestRatePercentage = calculateInterestRate(Number(balanceDetailsData.interestRate));

      dispatch(setQVBalance({
        ...balanceDetailsData,
        interestRatePercentage,
        qHolderRewardPool,
        yearlyExpectedEarnings: Number(vaultBalance) * interestRatePercentage / 100
      }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadDelegationInfo (address: string) {
    try {
      const contract = await getVotingWeightProxyInstance();
      const info = await contract.getDelegationInfo(address);
      dispatch(setDelegationInfo({ ...info }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function announceNewVotingAgent (address: string) {
    const userAddress = getUserAddress();
    const contract = await getVotingWeightProxyInstance();
    const tx = await contract.announceNewVotingAgent(address);

    return {
      tx,
      onSuccess: () => {
        loadDelegationInfo(userAddress);
        loadWalletBalance();
      }
    };
  }

  async function setNewVotingAgent () {
    const userAddress = getUserAddress();
    const contract = await getVotingWeightProxyInstance();
    const tx = await contract.setNewVotingAgent();

    return {
      tx,
      onSuccess: () => {
        loadDelegationInfo(userAddress);
        loadWalletBalance();
      }
    };
  }

  async function loadMinimumQVaultTimeLock (address: string) {
    try {
      const contract = await getQVaultInstance();
      const data = await contract.getMinimumBalance(address, dateToUnix());
      dispatch(setQVaultMinimumTimeLock(fromWei(data)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    vaultBalance,
    walletBalance,
    votingWeight,
    votingLockingEnd,
    isVotingWeightUnlocked,
    delegationList,
    loadingDelegationList,
    delegationInfo,
    qvBalance,
    qVaultMinimumTimeLock,
    delegationStakeInfo,
    delegationStakeInfoLoading,

    loadWalletBalance: useCallback(loadWalletBalance, []),
    loadVaultBalance: useCallback(loadVaultBalance, []),
    loadAllBalances: useCallback(loadAllBalances, []),
    loadLockInfo: useCallback(loadLockInfo, []),
    depositToVault: useCallback(depositToVault, []),
    sendToVault: useCallback(sendToVault, []),
    withdrawFromVault: useCallback(withdrawFromVault, []),
    delegateStake: useCallback(delegateStake, []),
    lockAmount: useCallback(lockAmount, []),
    unlockAmount: useCallback(unlockAmount, []),
    loadDelegationList: useCallback(loadDelegationList, []),
    loadDelegationInfo: useCallback(loadDelegationInfo, []),
    loadDelegationStakeInfo: useCallback(loadDelegationStakeInfo, []),
    claimStakeDelegatorReward: useCallback(claimStakeDelegatorReward, []),
    loadQVBalanceDetails: useCallback(loadQVBalanceDetails, []),
    announceNewVotingAgent: useCallback(announceNewVotingAgent, []),
    setNewVotingAgent: useCallback(setNewVotingAgent, []),
    loadMinimumQVaultTimeLock: useCallback(loadMinimumQVaultTimeLock, []),
  };
}
