import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { orderBy, round, sumBy } from 'lodash';
import { fromWei, toWei } from 'web3-utils';

import { RootNodeMember, setIsRootNode, setMembers, setMinimumTimeLock, setRootNodeStake, setTimeLocks, setTotalStake, setWithdrawalInfo } from './reducer';

import { getUserAddress, useAppSelector } from 'store';
import { useQVault } from 'store/q-vault/hooks';

import { getRootNodesInstance } from 'contracts/contract-instance';

import { dateToUnix } from 'utils/date';
import { captureError } from 'utils/errors';

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
  const rootTimeLocks = useAppSelector(({ rootNodes }) => rootNodes.timeLocks);
  const rootTimeLocksLoading = useAppSelector(({ rootNodes }) => rootNodes.timeLocksLoading);

  async function commitRootNodeStake (amount: string) {
    const userAddress = getUserAddress();
    const contract = await getRootNodesInstance();
    const receipt = await contract.commitStake({ from: userAddress, value: toWei(amount) });

    loadWalletBalance();
    getRootNodeStakes(userAddress);
    getRootWithdrawalInfo(userAddress);
    getMinimumRootTimeLock(userAddress);
    getRootMembers();

    return receipt;
  }

  async function announceRootStakeWithdrawal (amount: string) {
    const userAddress = getUserAddress();
    const contract = await getRootNodesInstance();
    const receipt = await contract.announceWithdrawal(toWei(amount), { from: userAddress });

    loadWalletBalance();
    getRootNodeStakes(userAddress);
    getRootWithdrawalInfo(userAddress);
    getMinimumRootTimeLock(userAddress);
    getRootMembers();

    return receipt;
  }

  async function withdrawRootStake (amount: string) {
    const userAddress = getUserAddress();
    const contract = await getRootNodesInstance();
    const receipt = await contract.withdraw(toWei(amount), userAddress, { from: userAddress });

    loadWalletBalance();
    getRootNodeStakes(userAddress);
    getRootWithdrawalInfo(userAddress);
    getMinimumRootTimeLock(userAddress);
    getRootMembers();

    return receipt;
  }

  async function getRootMembers () {
    try {
      const contract = await getRootNodesInstance();
      const members = await contract.getMembers();
      const stakes = await contract.getStakes();

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
      }));

      dispatch(setMembers(orderBy(membersWithShare, 'stakeAmount', 'desc')));
      dispatch(setTotalStake(String(totalStake)));
    } catch (error) {
      captureError(error);
    }
  }

  async function checkRootNodeMembership () {
    try {
      const contract = await getRootNodesInstance();
      const isMember = await contract.instance.methods.isMember(getUserAddress()).call();
      dispatch(setIsRootNode(isMember));
    } catch (error) {
      captureError(error);
    }
  }

  async function getRootNodeStakes (address: string) {
    try {
      const contract = await getRootNodesInstance();
      const stake = await contract.getRootNodeStake(address);
      dispatch(setRootNodeStake(fromWei(stake)));
    } catch (error) {
      captureError(error);
    }
  }

  async function getRootWithdrawalInfo (address: string) {
    try {
      const contract = await getRootNodesInstance();
      const { amount, endTime } = await contract.getWithdrawalInfo(address);
      dispatch(setWithdrawalInfo({ amount, endTime }));
    } catch (error) {
      captureError(error);
    }
  }

  async function getMinimumRootTimeLock (address: string) {
    try {
      const contract = await getRootNodesInstance();
      const minimumBalance = await contract.getMinimumBalance(address, dateToUnix());
      dispatch(setMinimumTimeLock(fromWei(minimumBalance)));
    } catch (error) {
      captureError(error);
    }
  }

  async function getRootTimeLocks (address: string) {
    try {
      const contract = await getRootNodesInstance();
      const timeLocks = await contract.getTimeLocks(address);
      dispatch(setTimeLocks(timeLocks));
    } catch (error) {
      captureError(error);
    }
  }

  return {
    withdrawalInfo,
    isRootNode,
    rootNodeStake,
    rootMinimumTimeLock,
    rootTimeLocks,
    rootTotalStake,
    rootMembers,
    rootMembersLoading,
    rootTimeLocksLoading,

    commitRootNodeStake: useCallback(commitRootNodeStake, []),
    announceRootStakeWithdrawal: useCallback(announceRootStakeWithdrawal, []),
    withdrawRootStake: useCallback(withdrawRootStake, []),
    getRootMembers: useCallback(getRootMembers, []),
    getRootNodeStakes: useCallback(getRootNodeStakes, []),
    getRootWithdrawalInfo: useCallback(getRootWithdrawalInfo, []),
    getMinimumRootTimeLock: useCallback(getMinimumRootTimeLock, []),
    getRootTimeLocks: useCallback(getRootTimeLocks, []),
    checkRootNodeMembership: useCallback(checkRootNodeMembership, []),
  };
}
