import { useEffect, useState } from 'react';

import { isEmpty } from 'lodash';
import { Validator } from 'typings/validator';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import { getAndCombineValidatorInfo } from 'contracts/helpers/validators-helper';

import { captureError } from 'utils/errors';

const useFetchValidatorData = (address: string) => {
  const { chainId } = useUser();
  const { indexerUrl } = useNetworkConfig();
  const { transactionLoading } = useTransaction();

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

  useEffect(() => {
    fetchValidatorData();

    return () => {
      setValidator({} as Validator);
      setIsValidator(true);
      setError(null);
      setLoading(true);
    };
  }, [transactionLoading]);

  return { isValidator, validator, loading, error };
};

export { useFetchValidatorData };
