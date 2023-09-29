import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useWeb3Context } from 'context/Web3ContextProvider';
import { ErrorHandler } from 'helpers';
import isEmpty from 'lodash/isEmpty';
import { Validator } from 'typings/validator';

import { useTransaction } from 'store/transaction/hooks';

import { getValidationRewardPoolsInstance } from 'contracts/contract-instance';
import { getValidator } from 'contracts/helpers/validators-helper';

const useFetchValidatorData = (address: string) => {
  const { t } = useTranslation();
  const { chainId } = useWeb3Context();
  const { pendingTransactions } = useTransaction();

  const [validator, setValidator] = useState<Validator>({} as Validator);
  const [isValidator, setIsValidator] = useState(true);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(true);
  const [updateCompoundRateLoading, setUpdateCompoundRateLoading] = useState(false);

  const getValidatorInfo = async () => {
    const validatorInfo = await getValidator(address, Number(chainId));
    if (isEmpty(validatorInfo)) {
      setIsValidator(false);
    } else {
      setValidator(validatorInfo);
    }
  };

  const fetchValidatorData = async () => {
    try {
      setLoading(true);
      await getValidatorInfo();
    } catch (error) {
      setError(error);
      ErrorHandler.processWithoutFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCompoundRate = async () => {
    try {
      setUpdateCompoundRateLoading(true);
      const contract = await getValidationRewardPoolsInstance();
      const tx = await contract.updateValidatorsCompoundRate(address);
      await tx.wait();
      const nextUpdateCompoundRate = await contract.getLastUpdateOfCompoundRate(address);
      if (validator.poolInfo.lastUpdateOfCompoundRate === nextUpdateCompoundRate) {
        throw new Error(t('STAKE_AMOUNT_BELOW_MINIMUM_TO_APPLY_NEW_RATE'));
      }
    } finally {
      setUpdateCompoundRateLoading(false);
    }
  };

  useEffect(() => {
    if (!pendingTransactions.length) {
      fetchValidatorData();
    }
  }, [pendingTransactions.length]);

  return {
    isValidator,
    validator,
    loading,
    error,
    updateCompoundRate,
    updateCompoundRateLoading,
    refetchValidator: useCallback(getValidatorInfo, [])
  };
};

export { useFetchValidatorData };
