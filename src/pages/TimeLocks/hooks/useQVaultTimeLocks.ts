import { useCallback, useEffect, useState } from 'react';

import { TimeLockEntry } from '@q-dev/q-js-sdk';
import { useInterval } from '@q-dev/react-hooks';
import { ErrorHandler } from 'helpers';

import { getQVaultInstance } from 'contracts/contract-instance';

import { dateToUnix } from 'utils/date';
import { fromWei } from 'utils/web3';

function useQVaultTimeLocks (address: string) {
  const [qVaultMinimumTimeLock, setQVaultMinimumTimeLock] = useState('0');
  const [vaultBalance, setVaultBalance] = useState('0');
  const [qVaultTimeLocks, setQVaultTimeLocks] = useState<TimeLockEntry[]>([]);
  const [qVaultTimeLocksLoading, setQVaultTimeLocksLoading] = useState(false);

  async function loadMinimumQVaultTimeLock () {
    try {
      const contract = await getQVaultInstance();
      const data = await contract.getMinimumBalance(address, dateToUnix());
      setQVaultMinimumTimeLock(fromWei(data));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadVaultBalance () {
    try {
      const contract = await getQVaultInstance();
      const balance = await contract.balanceOf(address);
      setVaultBalance(fromWei(balance));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadQVaultTimeLocks () {
    setQVaultTimeLocksLoading(true);
    try {
      const contract = await getQVaultInstance();
      const timeLocks = await contract.getTimeLocks(address);
      setQVaultTimeLocks(timeLocks);
    } catch (error) {
      setQVaultTimeLocks([]);
      ErrorHandler.processWithoutFeedback(error);
    }
    setQVaultTimeLocksLoading(false);
  }

  useInterval(() => {
    loadMinimumQVaultTimeLock();
  }, 5000);

  useEffect(() => {
    loadVaultBalance();
    loadQVaultTimeLocks();
    loadMinimumQVaultTimeLock();

    return () => {
      setQVaultMinimumTimeLock('0');
      setVaultBalance('0');
      setQVaultTimeLocks([]);
      setQVaultTimeLocksLoading(false);
    };
  }, [address]);

  return {
    qVaultTimeLocks,
    vaultBalance,
    qVaultMinimumTimeLock,
    qVaultTimeLocksLoading,

    loadMinimumQVaultTimeLock: useCallback(loadMinimumQVaultTimeLock, [address]),
    loadVaultBalance: useCallback(loadVaultBalance, [address]),
    loadQVaultTimeLocks: useCallback(loadQVaultTimeLocks, [address]),
  };
}

export default useQVaultTimeLocks;
