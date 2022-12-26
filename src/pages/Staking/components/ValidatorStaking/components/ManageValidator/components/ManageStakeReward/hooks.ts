import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUser } from 'store/user/hooks';
import { useValidationRewards } from 'store/validation-rewards/hooks';
import { useValidators } from 'store/validators/hooks';

import { getValidationRewardPoolsInstance } from 'contracts/contract-instance';

import { getFixedPercentage } from 'utils/numbers';

function useSetDelegatorsShare () {
  const { getVRPDelegatorsShare } = useValidationRewards();

  const setDelegatorsShare = async (amount: string) => {
    const contract = await getValidationRewardPoolsInstance();
    const receipt = await contract.setDelegatorsShare(getFixedPercentage(amount));

    receipt.promiEvent.once('receipt', () => { getVRPDelegatorsShare(); });

    return receipt;
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

  const user = useUser();
  const [loading, setLoading] = useState(false);

  const updateCompoundRate = async () => {
    try {
      setLoading(true);
      const contract = await getValidationRewardPoolsInstance();
      const receipt = await contract.updateValidatorsCompoundRate(user.address);
      await receipt.promiEvent;
      const nextUpdateCompoundRate = await contract.getLastUpdateOfCompoundRate(user.address);
      if (lastUpdateOfCompoundRate === nextUpdateCompoundRate) {
        throw new Error(t('STAKE_AMOUNT_BELOW_MINIMUM_TO_APPLY_NEW_RATE'));
      }

      getVRPPoolInfo();
      getVRPBalance();
      loadValidatorDelegatedStake();
      getVRPDelegatorsShare();
      getVRPLastUpdateOfCompoundRate();

      return receipt;
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
