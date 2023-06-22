import { useCallback, useEffect, useState } from 'react';

import { TimeLockEntry } from '@q-dev/q-js-sdk';
import { useInterval } from '@q-dev/react-hooks';
import { ErrorHandler } from 'helpers';

import { getVestingInstance } from 'contracts/contract-instance';

import { dateToUnix } from 'utils/date';
import { fromWei } from 'utils/web3';

function useVestingTimeLocks (address: string) {
  const [vestingBalance, setVestingBalance] = useState('0');
  const [vestingMinimumTimeLock, setVestingMinimumTimeLock] = useState('0');
  const [vestingTimeLocks, setVestingTimeLocks] = useState<TimeLockEntry[]>([]);
  const [vestingTimeLocksLoading, setVestingTimeLocksLoading] = useState(false);

  async function getVestingBalance () {
    try {
      const contract = await getVestingInstance();
      const balance = await contract.balanceOf(address);
      setVestingBalance(fromWei(balance));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getMinimumVestingTimeLock () {
    try {
      const contract = await getVestingInstance();
      const minimumBalance = await contract.getMinimumBalance(address, dateToUnix());
      setVestingMinimumTimeLock(fromWei(minimumBalance));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getVestingTimeLocks () {
    setVestingTimeLocksLoading(true);
    try {
      const contract = await getVestingInstance();
      const timeLocks = await contract.getTimeLocks(address);
      setVestingTimeLocks(timeLocks);
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
    setVestingTimeLocksLoading(false);
  }

  useInterval(getMinimumVestingTimeLock, 5000, { immediate: true });

  useEffect(() => {
    getVestingBalance();
    getVestingTimeLocks();

    return () => {
      setVestingBalance('0');
      setVestingMinimumTimeLock('0');
      setVestingTimeLocks([]);
      setVestingTimeLocksLoading(false);
    };
  }, [address]);

  return {
    vestingBalance,
    vestingMinimumTimeLock,
    vestingTimeLocks,
    vestingTimeLocksLoading,

    getVestingBalance: useCallback(getVestingBalance, [address]),
    getMinimumVestingTimeLock: useCallback(getMinimumVestingTimeLock, [address]),
    getVestingTimeLocks: useCallback(getVestingTimeLocks, [address]),
  };
}

export default useVestingTimeLocks;
