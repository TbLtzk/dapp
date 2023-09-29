import { useEffect, useMemo } from 'react';

import { BigNumber, toBigNumber } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';

import { useQVault } from 'store/q-vault/hooks';

function useQVaultLimits () {
  const {
    vaultBalance,
    qVaultMinimumTimeLock,
    votingWeight,
    isVotingWeightUnlocked,
    delegationStakeInfo,
    loadLockInfo,
    loadDelegationStakeInfo
  } = useQVault();
  const { address } = useWeb3Context();

  useEffect(() => {
    loadLockInfo(address);
    loadDelegationStakeInfo();
  }, []);

  const maxWithdrawAmount = useMemo(() => {
    const subAmount = BigNumber.max(
      qVaultMinimumTimeLock,
      delegationStakeInfo.totalDelegatedStake,
      isVotingWeightUnlocked ? 0 : votingWeight
    );
    const maxWithdraw = toBigNumber(vaultBalance).minus(subAmount);
    return maxWithdraw.isNegative()
      ? '0'
      : maxWithdraw.toString();
  }, [
    vaultBalance,
    qVaultMinimumTimeLock,
    votingWeight,
    isVotingWeightUnlocked,
    delegationStakeInfo
  ]);

  return { maxWithdrawAmount };
}

export default useQVaultLimits;
