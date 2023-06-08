import { useCallback, useEffect, useState } from 'react';

import { TimeLockEntry } from '@q-dev/q-js-sdk';
import { useInterval } from '@q-dev/react-hooks';
import { ErrorHandler } from 'helpers';

import { getRootNodesInstance } from 'contracts/contract-instance';

import { dateToUnix } from 'utils/date';
import { fromWei } from 'utils/web3';

function useRootStakeTimeLocks (address: string) {
  const [rootNodeStake, setRootNodeStake] = useState('0');
  const [rootMinimumTimeLock, setRootMinimumTimeLock] = useState('0');
  const [rootTimeLocks, setRootTimeLocks] = useState<TimeLockEntry[]>([]);
  const [rootTimeLocksLoading, setRootTimeLocksLoading] = useState(false);

  async function getRootNodeStakes () {
    try {
      const contract = await getRootNodesInstance();
      const stake = await contract.getRootNodeStake(address);
      setRootNodeStake(fromWei(stake));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getMinimumRootTimeLock () {
    try {
      const contract = await getRootNodesInstance();
      const minimumBalance = await contract.getMinimumBalance(address, dateToUnix());
      setRootMinimumTimeLock(fromWei(minimumBalance));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getRootTimeLocks () {
    setRootTimeLocksLoading(true);
    try {
      const contract = await getRootNodesInstance();
      const timeLocks = await contract.getTimeLocks(address);
      setRootTimeLocks(timeLocks);
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
    setRootTimeLocksLoading(false);
  }

  useInterval(() => {
    getMinimumRootTimeLock();
  }, 5000);

  useEffect(() => {
    getRootNodeStakes();
    getMinimumRootTimeLock();
    getRootTimeLocks();

    return () => {
      setRootNodeStake('0');
      setRootMinimumTimeLock('0');
      setRootTimeLocks([]);
      setRootTimeLocksLoading(false);
    };
  }, [address]);

  return {
    rootNodeStake,
    rootMinimumTimeLock,
    rootTimeLocks,
    rootTimeLocksLoading,

    getRootNodeStakes: useCallback(getRootNodeStakes, [address]),
    getMinimumRootTimeLock: useCallback(getMinimumRootTimeLock, [address]),
    getRootTimeLocks: useCallback(getRootTimeLocks, [address]),
  };
}

export default useRootStakeTimeLocks;
