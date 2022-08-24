import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'lodash';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useNetworkConfig from 'hooks/useNetworkConfig';

import { networkSelector } from 'store/user-inf/selectors';

import { getAndCombineValidatorInfo } from 'contracts/helpers/validators-helper';

import formTypes from 'constants/form-types';
import { captureError } from 'utils/errors';

const useFetchValidatorData = (address: string) => {
  const network = useSelector(networkSelector);
  const { indexerUrl } = useNetworkConfig();

  const [validator, setValidator] = useState<any>({});
  const [isValidator, setIsValidator] = useState(true);
  const [error, setError] = useState<null | unknown>(null);
  const [loading, setLoading] = useState(true);

  const fetchValidatorData = async () => {
    try {
      setLoading(true);
      const validatorInfo = await getAndCombineValidatorInfo(address, network, indexerUrl);
      if (isEmpty(validatorInfo)) {
        setIsValidator(false);
      } else {
        setValidator(validatorInfo);
      }
    } catch (error) {
      setError(error);
      captureError(error);
    } finally {
      setLoading(false);
    }
  };

  useMetamaskReset(formTypes.qVaultDelegation, fetchValidatorData);

  useEffect(() => {
    fetchValidatorData();

    return () => {
      setValidator({});
      setIsValidator(true);
      setError(null);
      setLoading(true);
    };
  }, []);

  return { isValidator, validator, loading, error };
};

export { useFetchValidatorData };
