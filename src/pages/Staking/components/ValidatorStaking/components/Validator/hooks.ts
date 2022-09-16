import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash';
import { Validator } from 'typings/validator';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import { getValidationRewardPoolsInstance } from 'contracts/contract-instance';
import { getAndCombineValidatorInfo } from 'contracts/helpers/validators-helper';

import { captureError } from 'utils/errors';

const useFetchValidatorData = (address: string) => {
  const { t } = useTranslation();
  const { chainId } = useUser();
  const { indexerUrl } = useNetworkConfig();
  const { successMessage } = useTransaction();

  const [validator, setValidator] = useState<Validator>({} as Validator);
  const [isValidator, setIsValidator] = useState(true);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(true);

  const fetchValidatorData = async () => {
    try {
      setLoading(true);
      const validatorInfo = await getAndCombineValidatorInfo(address, chainId, indexerUrl);
      if (isEmpty(validatorInfo)) {
        setIsValidator(false);
      } else {
        setValidator(validatorInfo as Validator);
      }
    } catch (error) {
      setError(error);
      captureError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCompoundRate = async () => {
    const contract = await getValidationRewardPoolsInstance();
    const receipt = await contract.updateValidatorsCompoundRate(address);
    const nextUpdateCompoundRate = await contract.getLastUpdateOfCompoundRate(address);
    if (validator.lastUpdateOfCompoundRate === nextUpdateCompoundRate) {
      throw new Error(t('STAKE_AMOUNT_BELOW_MINIMUM_TO_APPLY_NEW_RATE'));
    }
    return receipt;
  };

  useEffect(() => {
    fetchValidatorData();

    return () => {
      setValidator({} as Validator);
      setIsValidator(true);
      setError(null);
      setLoading(true);
    };
  }, [successMessage]);

  return { isValidator, validator, loading, error, updateCompoundRate };
};

export { useFetchValidatorData };
