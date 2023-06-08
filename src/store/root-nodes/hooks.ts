import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AliasPurpose } from '@q-dev/q-js-sdk';
import { ErrorHandler } from 'helpers';
import { orderBy, round, sumBy } from 'lodash';

import { RootNodeMember, setIsRootNode, setMembers, setMinimumTimeLock, setRootNodeStake, setTotalStake, setWithdrawalInfo } from './reducer';

import { getState, getUserAddress, useAppSelector } from 'store';
import { useQVault } from 'store/q-vault/hooks';

import { getRootNodesInstance } from 'contracts/contract-instance';
import { getAliasMap } from 'contracts/helpers/aliases-helper';

import { dateToUnix } from 'utils/date';
import { fromWei, toWei } from 'utils/web3';

export function useRootNodes () {
  const dispatch = useDispatch();
  const { loadWalletBalance } = useQVault();

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
      const aliasesMap = await getAliasMap(
        members,
        getState().user.chainId,
        AliasPurpose.ROOT_NODE_OPERATION
      );

      const membersWithAmount = members.map((address) => {
        const memberWithStake = stakes.find(({ root }) => root === address);
        const stakeAmount = fromWei(memberWithStake?.value || '0');
        return { address, stakeAmount };
      });

      const totalStake = sumBy(membersWithAmount, item => Number(item.stakeAmount));
      const membersWithShare: RootNodeMember[] = membersWithAmount.map(({ address, stakeAmount }) => ({
        address,
        stakeAmount,
        share: totalStake ? round(Number(stakeAmount) / totalStake * 100, 2) : 0,
        alias: aliasesMap[address],
      }));

      dispatch(setMembers(orderBy(membersWithShare, 'stakeAmount', 'desc')));
      dispatch(setTotalStake(String(totalStake)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
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
