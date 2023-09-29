import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getFixedPercentage } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';

import { useValidationRewards } from 'store/validation-rewards/hooks';
import { useValidators } from 'store/validators/hooks';

import { getValidationRewardPoolsInstance } from 'contracts/contract-instance';

function useSetDelegatorsShare () {
  const { getVRPDelegatorsShare } = useValidationRewards();

  const setDelegatorsShare = async (amount: string) => {
    const contract = await getValidationRewardPoolsInstance();
    const tx = await contract.setDelegatorsShare(getFixedPercentage(amount));

    return {
      tx,
      onSuccess: () => {
        getVRPDelegatorsShare();
      }
    };
  };

  return {
    setDelegatorsShare: useCallback(setDelegatorsShare, [])
  };
}

function useUpdateValidatorCompoundRate () {
  const { t } = useTranslation();
  const {
    lastUpdateOfCompoundRate,
    getVRPBalance,
    getVRPPoolInfo,
    getVRPDelegatorsShare,
    getVRPLastUpdateOfCompoundRate
  } = useValidationRewards();
  const { loadValidatorDelegatedStake } = useValidators();

  const { address } = useWeb3Context();
  const [loading, setLoading] = useState(false);

  const updateCompoundRate = async () => {
    try {
      setLoading(true);
      const contract = await getValidationRewardPoolsInstance();
      const tx = await contract.updateValidatorsCompoundRate(address);
      await tx.wait();
      const nextUpdateCompoundRate = await contract.getLastUpdateOfCompoundRate(address);
      if (lastUpdateOfCompoundRate === nextUpdateCompoundRate) {
        throw new Error(t('STAKE_AMOUNT_BELOW_MINIMUM_TO_APPLY_NEW_RATE'));
      }

      getVRPPoolInfo();
      getVRPBalance();
      loadValidatorDelegatedStake();
      getVRPDelegatorsShare();
      getVRPLastUpdateOfCompoundRate();

      return tx;
    } finally {
      setLoading(false);
    }
  };

  return {
    compoundRateLoading: loading,
    updateCompoundRate,
  };
}

export { useSetDelegatorsShare, useUpdateValidatorCompoundRate };
