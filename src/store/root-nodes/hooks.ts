import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AliasPurpose, L0ListItemStatus } from '@q-dev/q-js-sdk';
import { AxiosError } from 'axios';
import { ErrorHandler } from 'helpers';
import { orderBy, round, sumBy } from 'lodash';

import useNetworkConfig from 'hooks/useNetworkConfig';

import {
  RootNodeMember,
  RootNodesOnchainDiffItem,
  setIsRootNode,
  setMembers,
  setMinimumTimeLock,
  setRootNodesExclusion,
  setRootNodesL0,
  setRootNodesOnchainDiffList,
  setRootNodeStake,
  setRootOnchainList,
  setTotalStake,
  setWithdrawalInfo
} from './reducer';

import { getState, getUserAddress, useAppSelector } from 'store';
import { useQVault } from 'store/q-vault/hooks';

import { getIndexerInstance, getRootNodesInstance } from 'contracts/contract-instance';
import { getAliasMap } from 'contracts/helpers/aliases-helper';

import { dateToUnix } from 'utils/date';
import { fromWei, toWei } from 'utils/web3';

export function useRootNodes () {
  const dispatch = useDispatch();
  const { loadWalletBalance } = useQVault();
  const { indexerUrl } = useNetworkConfig();

  const withdrawalInfo = useAppSelector(({ rootNodes }) => rootNodes.withdrawalInfo);
  const isRootNode = useAppSelector(({ rootNodes }) => rootNodes.isRootNode);

  const rootNodeStake = useAppSelector(({ rootNodes }) => rootNodes.rootNodeStake);
  const rootTotalStake = useAppSelector(({ rootNodes }) => rootNodes.totalStake);

  const rootMembers = useAppSelector(({ rootNodes }) => rootNodes.members);
  const rootMembersLoading = useAppSelector(({ rootNodes }) => rootNodes.isMembersLoading);

  const rootMinimumTimeLock = useAppSelector(({ rootNodes }) => rootNodes.minimumTimeLock);

  async function commitRootNodeStake (amount: string) {
    const userAddress = getUserAddress();
    const contract = await getRootNodesInstance();
    const tx = await contract.commitStake({ from: userAddress, value: toWei(amount) });

    return {
      tx,
      onSuccess: () => {
        loadWalletBalance();
        getRootNodeStakes(userAddress);
        getRootWithdrawalInfo(userAddress);
        getMinimumRootTimeLock(userAddress);
        getRootMembers();
      }
    };
  }

  async function announceRootStakeWithdrawal (amount: string) {
    const userAddress = getUserAddress();
    const contract = await getRootNodesInstance();
    const tx = await contract.announceWithdrawal(toWei(amount), { from: userAddress });

    return {
      tx,
      onSuccess: () => {
        loadWalletBalance();
        getRootNodeStakes(userAddress);
        getRootWithdrawalInfo(userAddress);
        getMinimumRootTimeLock(userAddress);
        getRootMembers();
      }
    };
  }

  async function withdrawRootStake (amount: string) {
    const userAddress = getUserAddress();
    const contract = await getRootNodesInstance();
    const tx = await contract.withdraw(toWei(amount), userAddress, { from: userAddress });

    return {
      tx,
      onSuccess: () => {
        loadWalletBalance();
        getRootNodeStakes(userAddress);
        getRootWithdrawalInfo(userAddress);
        getMinimumRootTimeLock(userAddress);
        getRootMembers();
      }
    };
  }

  async function getRootMembers () {
    try {
      const contract = await getRootNodesInstance();
      const [members, stakes] = await Promise.all([
        contract.getMembers(),
        contract.getStakes()
      ]);
      const [aliasesMap, metrics] = await Promise.all([
        getAliasMap(
          members,
          getState().user.chainId,
          AliasPurpose.ROOT_NODE_OPERATION
        ),
        getRootNodeMetrics()
      ]);

      const membersWithAmount = members.map((address) => {
        const memberWithStake = stakes.find(({ root }) => root === address);
        const metric = metrics.find(({ attributes }) =>
          attributes.rootAddress.toLowerCase() === address.toLowerCase()
        );
        const stakeAmount = fromWei(memberWithStake?.value || '0');
        return { address, stakeAmount, metric };
      });

      const totalStake = sumBy(membersWithAmount, item => Number(item.stakeAmount));
      const membersWithShare: RootNodeMember[] = membersWithAmount.map(({ address, stakeAmount, metric }) => ({
        address,
        stakeAmount,
        metric,
        share: totalStake ? round(Number(stakeAmount) / totalStake * 100, 2) : 0,
        alias: aliasesMap[address],
      }));

      dispatch(setMembers(orderBy(membersWithShare, 'metric.attributes.startTime', 'asc')));
      dispatch(setTotalStake(String(totalStake)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getRootNodeMetrics () {
    try {
      const indexer = getIndexerInstance(indexerUrl);
      const rootNodeMetrics = await indexer.getRootNodeMetrics({
        'page[limit]': 100
      });

      return rootNodeMetrics;
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
      return [];
    }
  }

  async function checkRootNodeMembership () {
    try {
      const contract = await getRootNodesInstance();
      const isMember = await contract.instance.isMember(getUserAddress());
      dispatch(setIsRootNode(isMember));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getRootNodeStakes (address: string) {
    try {
      const contract = await getRootNodesInstance();
      const stake = await contract.getRootNodeStake(address);
      dispatch(setRootNodeStake(fromWei(stake)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getRootWithdrawalInfo (address: string) {
    try {
      const contract = await getRootNodesInstance();
      const { amount, endTime } = await contract.getWithdrawalInfo(address);
      dispatch(setWithdrawalInfo({ amount, endTime }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getMinimumRootTimeLock (address: string) {
    try {
      const contract = await getRootNodesInstance();
      const minimumBalance = await contract.getMinimumBalance(address, dateToUnix());
      dispatch(setMinimumTimeLock(fromWei(minimumBalance)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    withdrawalInfo,
    isRootNode,
    rootNodeStake,
    rootMinimumTimeLock,
    rootTotalStake,
    rootMembers,
    rootMembersLoading,

    commitRootNodeStake: useCallback(commitRootNodeStake, []),
    announceRootStakeWithdrawal: useCallback(announceRootStakeWithdrawal, []),
    withdrawRootStake: useCallback(withdrawRootStake, []),
    getRootMembers: useCallback(getRootMembers, []),
    getRootNodeStakes: useCallback(getRootNodeStakes, []),
    getRootWithdrawalInfo: useCallback(getRootWithdrawalInfo, []),
    getMinimumRootTimeLock: useCallback(getMinimumRootTimeLock, []),
    checkRootNodeMembership: useCallback(checkRootNodeMembership, []),
  };
}

export function useRootNodesMonitoring () {
  const dispatch = useDispatch();
  const { indexerUrl } = useNetworkConfig();

  const rootNodesOnchainDiffList = useAppSelector(({ rootNodes }) => rootNodes.rootNodesOnchainDiffList);
  const isRootNodesOnchainDiffListLoading = useAppSelector(
    ({ rootNodes }) => rootNodes.isRootNodesOnchainDiffListLoading
  );

  const rootNodesL0Active = useAppSelector(({ rootNodes }) => rootNodes.rootNodesL0.active);
  const rootNodesL0Proposed = useAppSelector(({ rootNodes }) => rootNodes.rootNodesL0.proposed);
  const rootNodesExclusionActive = useAppSelector(({ rootNodes }) => rootNodes.rootNodesExclusion.active);
  const rootNodesExclusionProposed = useAppSelector(({ rootNodes }) => rootNodes.rootNodesExclusion.proposed);
  const rootNodesOnchainList = useAppSelector(({ rootNodes }) => rootNodes.rootNodesOnchainList);

  async function loadRootNodesOnchainDiffList () {
    const indexer = getIndexerInstance(indexerUrl);
    const contract = await getRootNodesInstance();
    const [rootNodesL0, members] = await Promise.all([
      indexer.getL0RootList('active'),
      contract.getMembers()
    ]);

    const rootNodesOnchainDiffMap = members.reduce((acc, address) => {
      acc[address] = {
        address,
        isOnchain: true,
        isL0Active: false,
      };
      return acc;
    }, {} as Record<string, RootNodesOnchainDiffItem>);

    rootNodesL0.roots.forEach(({ mainAccount }) => {
      rootNodesOnchainDiffMap[mainAccount] = {
        address: mainAccount,
        isL0Active: true,
        isOnchain: rootNodesOnchainDiffMap?.[mainAccount]?.isOnchain || false,
      };
    });

    dispatch(setRootOnchainList(members));
    dispatch(setRootNodesL0({ status: 'active', rootNodesL0 }));
    dispatch(setRootNodesOnchainDiffList(Object.values(rootNodesOnchainDiffMap)));
  }

  async function loadRootNodesL0 (status: L0ListItemStatus) {
    try {
      const indexer = getIndexerInstance(indexerUrl);
      const rootNodesL0 = await indexer.getL0RootList(status);

      dispatch(setRootNodesL0({ status, rootNodesL0 }));
    } catch (error) {
      if ((error as AxiosError)?.response?.status !== 404) throw error;

      dispatch(setRootNodesL0({ status, rootNodesL0: null }));
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadRootNodesExclusion (status: L0ListItemStatus) {
    try {
      const indexer = getIndexerInstance(indexerUrl);
      const rootNodesExclusion = await indexer.getL0ExclusionList(status);

      dispatch(setRootNodesExclusion({ status, rootNodesExclusion }));
    } catch (error) {
      if ((error as AxiosError)?.response?.status !== 404) throw error;

      dispatch(setRootNodesExclusion({ status, rootNodesExclusion: null }));
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  function loadRootNodesMonitoringData () {
    return Promise.all([
      loadRootNodesOnchainDiffList(),
      loadRootNodesL0('proposed'),
      loadRootNodesExclusion('active'),
      loadRootNodesExclusion('proposed'),
    ]);
  }

  return {
    rootNodesOnchainDiffList,
    isRootNodesOnchainDiffListLoading,
    rootNodesL0Active,
    rootNodesL0Proposed,
    rootNodesOnchainList,
    rootNodesExclusionActive,
    rootNodesExclusionProposed,

    loadRootNodesOnchainDiffList: useCallback(async () => {
      try {
        await loadRootNodesOnchainDiffList();
      } catch (error) {
        ErrorHandler.processWithoutFeedback(error);
      }
    }, []),
    loadRootNodesMonitoringData: useCallback(loadRootNodesMonitoringData, []),
  };
}
