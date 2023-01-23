import { useCallback, useEffect, useState } from 'react';

import { TimeLockEntry } from '@q-dev/q-js-sdk';
import { useInterval } from '@q-dev/react-hooks';
import { fromWei } from 'web3-utils';

import { getValidatorsInstance } from 'contracts/contract-instance';

import { dateToUnix } from 'utils/date';
import { captureError } from 'utils/errors';

function useValidatorStakeTimeLocks (address: string) {
  const [validatorAccountableSelfStake, setValidatorAccountableSelfStake] = useState('0');
  const [validatorsMinimumTimeLock, setValidatorsMinimumTimeLock] = useState('0');
  const [validatorsTimeLocks, setValidatorsTimeLocks] = useState<TimeLockEntry[]>([]);
  const [validatorsTimeLocksLoading, setValidatorsTimeLocksLoading] = useState(false);

  async function loadValidatorAccountableSelfStake () {
    try {
      const contract = await getValidatorsInstance();
      const accountableSelfStake = await contract.getAccountableSelfStake(address);
      setValidatorAccountableSelfStake(fromWei(accountableSelfStake));
    } catch (error) {
      captureError(error);
    }
  }

  async function loadValidatorMinimumTimeLock () {
    try {
      const contract = await getValidatorsInstance();
      const minimumBalance = await contract.getMinimumBalance(address, dateToUnix());
      setValidatorsMinimumTimeLock(fromWei(minimumBalance));
    } catch (error) {
      captureError(error);
    }
  }

  async function loadValidatorTimeLocks () {
    setValidatorsTimeLocksLoading(true);
    try {
      const contract = await getValidatorsInstance();
      const timeLocks = await contract.getTimeLocks(address);
      setValidatorsTimeLocks(timeLocks);
    } catch (error) {
      captureError(error);
    }
    setValidatorsTimeLocksLoading(false);
  }

  useInterval(() => {
    loadValidatorMinimumTimeLock();
  }, 5000);

  useEffect(() => {
    loadValidatorAccountableSelfStake();
    loadValidatorMinimumTimeLock();
    loadValidatorTimeLocks();

    return () => {
      setValidatorAccountableSelfStake('0');
      setValidatorsMinimumTimeLock('0');
      setValidatorsTimeLocks([]);
      setValidatorsTimeLocksLoading(false);
    };
  }, [address]);

  return {
    validatorAccountableSelfStake,
    validatorsMinimumTimeLock,
    validatorsTimeLocks,
    validatorsTimeLocksLoading,

    loadValidatorAccountableSelfStake: useCallback(loadValidatorAccountableSelfStake, [address]),
    loadValidatorMinimumTimeLock: useCallback(loadValidatorMinimumTimeLock, [address]),
    loadValidatorTimeLocks: useCallback(loadValidatorTimeLocks, [address]),
  };
}

export default useValidatorStakeTimeLocks;
