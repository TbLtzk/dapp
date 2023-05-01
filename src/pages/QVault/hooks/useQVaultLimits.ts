import { useEffect, useMemo } from 'react';

import BigNumber from 'bignumber.js';

import { useQVault } from 'store/q-vault/hooks';
import { useUser } from 'store/user/hooks';

import { toBigNumber } from 'utils/numbers';

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
  const user = useUser();

  useEffect(() => {
    loadLockInfo(user.address);
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
