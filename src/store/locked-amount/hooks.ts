import { useCallback } from 'react';

import { ContractType, TimeLockContractType } from 'typings/contracts';
import { TimeLockForm } from 'typings/time-locks';
import { toWei } from 'web3-utils';

import { useQVault } from 'store/q-vault/hooks';
import { useRootNodes } from 'store/root-nodes/hooks';
import { useValidators } from 'store/validators/hooks';
import { useVesting } from 'store/vesting/hooks';

import { getInstance, } from 'contracts/contract-instance';

import { dateToUnix } from 'utils/date';

export function useLockedAmount () {
  const {
    getMinimumRootTimeLock,
    getRootTimeLocks,
    getRootNodeStakes
  } = useRootNodes();
  const {
    loadVaultBalance,
    loadMinimumQVaultTimeLock,
    loadQVaultTimeLocks,
  } = useQVault();
  const {
    loadValidatorAccountableSelfStake,
    loadValidatorMinimumTimeLock,
    loadValidatorTimeLocks,
  } = useValidators();
  const {
    getMinimumVestingTimeLock,
    getVestingBalance,
    getVestingTimeLocks
  } = useVesting();

  async function purgeTimeLocks ({ contractType, address }: {
    contractType: TimeLockContractType;
    address: string;
  }) {
    const contract = await getInstance(contractType)();
    const receipt = await contract.purgeTimeLocks(address);

    loadTimeLocks(contractType, address);
    return receipt;
  }

  async function depositTimeLock (form: TimeLockForm) {
    const contract = await getInstance(form.contract)();
    const receipt = await contract.depositOnBehalfOf(
      form.address,
      dateToUnix(form.startDate),
      dateToUnix(form.endDate),
      { value: toWei(form.amount) }
    );

    loadTimeLocks(form.contract, form.address);
    return receipt;
  }

  function loadTimeLocks (contractType: ContractType, address: string) {
    switch (contractType) {
      case 'qVault':
        loadVaultBalance(address);
        loadMinimumQVaultTimeLock(address);
        loadQVaultTimeLocks(address);
        break;
      case 'rootNodes':
        getRootNodeStakes(address);
        getMinimumRootTimeLock(address);
        getRootTimeLocks(address);
        break;
      case 'validators':
        loadValidatorAccountableSelfStake(address);
        loadValidatorMinimumTimeLock(address);
        loadValidatorTimeLocks(address);
        break;
      case 'vesting':
        getVestingBalance(address);
        getMinimumVestingTimeLock(address);
        getVestingTimeLocks(address);
        break;
    }
  }

  return {
    purgeTimeLocks: useCallback(purgeTimeLocks, []),
    depositTimeLock: useCallback(depositTimeLock, []),
    loadTimeLocks: useCallback(loadTimeLocks, [])
  };
}
