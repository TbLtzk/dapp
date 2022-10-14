import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { fromWei, toWei } from 'web3-utils';

import { setBalance, setMinimumTimeLock, setTimeLocks } from './reducer';

import { getUserAddress, useAppSelector } from 'store';

import { getVestingInstance } from 'contracts/contract-instance';

import { dateToUnix } from 'utils/date';
import { captureError } from 'utils/errors';

export function useVesting () {
  const dispatch = useDispatch();

  const vestingBalance = useAppSelector(({ vesting }) => vesting.balance);
  const vestingMinimumTimeLock = useAppSelector(({ vesting }) => vesting.minimumTimeLock);
  const vestingTimeLocks = useAppSelector(({ vesting }) => vesting.timeLocks);
  const vestingTimeLocksLoading = useAppSelector(({ vesting }) => vesting.timeLocksLoading);

  async function getVestingBalance (address: string) {
    try {
      const contract = await getVestingInstance();
      const balance = await contract.balanceOf(address);
      dispatch(setBalance(fromWei(balance)));
    } catch (error) {
      captureError(error);
    }
  }

  async function getMinimumVestingTimeLock (address: string) {
    try {
      const contract = await getVestingInstance();
      const minimumBalance = await contract.getMinimumBalance(address, dateToUnix());
      dispatch(setMinimumTimeLock(fromWei(minimumBalance)));
    } catch (error) {
      captureError(error);
    }
  }

  async function getVestingTimeLocks (address: string) {
    try {
      const contract = await getVestingInstance();
      const timeLocks = await contract.getTimeLocks(address);
      dispatch(setTimeLocks(timeLocks));
    } catch (error) {
      captureError(error);
    }
  }

  async function withdrawVesting (amount: string) {
    const userAddress = getUserAddress();
    const contract = await getVestingInstance();
    const receipt = await contract.withdraw(toWei(amount), { from: userAddress });

    getMinimumVestingTimeLock(userAddress);
    getVestingTimeLocks(userAddress);
    getVestingBalance(userAddress);

    return receipt;
  }

  return {
    vestingBalance,
    vestingMinimumTimeLock,
    vestingTimeLocks,
    vestingTimeLocksLoading,

    getVestingBalance: useCallback(getVestingBalance, []),
    getMinimumVestingTimeLock: useCallback(getMinimumVestingTimeLock, []),
    getVestingTimeLocks: useCallback(getVestingTimeLocks, []),
    withdrawVesting: useCallback(withdrawVesting, []),
  };
}
