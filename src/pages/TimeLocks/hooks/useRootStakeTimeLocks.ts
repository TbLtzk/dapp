import { useCallback, useEffect, useState } from 'react';

import { TimeLockEntry } from '@q-dev/q-js-sdk';
import { useInterval } from '@q-dev/react-hooks';
import { fromWei } from 'web3-utils';

import { getRootNodesInstance } from 'contracts/contract-instance';

import { dateToUnix } from 'utils/date';
import { captureError } from 'utils/errors';

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
      captureError(error);
    }
  }

  async function getMinimumRootTimeLock () {
    try {
      const contract = await getRootNodesInstance();
      const minimumBalance = await contract.getMinimumBalance(address, dateToUnix());
      setRootMinimumTimeLock(fromWei(minimumBalance));
    } catch (error) {
      captureError(error);
    }
  }

  async function getRootTimeLocks () {
    setRootTimeLocksLoading(true);
    try {
      const contract = await getRootNodesInstance();
      const timeLocks = await contract.getTimeLocks(address);
      setRootTimeLocks(timeLocks);
    } catch (error) {
      captureError(error);
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
