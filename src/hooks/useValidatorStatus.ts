import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorHandler } from 'helpers';
import { ValidatorLegend } from 'typings/validator';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useConstitution } from 'store/constitution/hooks';

import { getIndexerInstance, getValidatorsInstance } from 'contracts/contract-instance';

const useGetValidatorRank = (address: string) => {
  const [validatorRank, setValidatorRank] = useState(0);
  const [isValidator, setIsValidator] = useState(false);

  const getValidatorRank = async () => {
    try {
      const validatorsInstance = await getValidatorsInstance();
      const shortList = await validatorsInstance.getShortList();
      const validatorRank = shortList.findIndex((val) => val.address.toLowerCase() === address.toLowerCase());
      setValidatorRank(validatorRank + 1);
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  };

  async function checkIsValidator () {
    try {
      const contract = await getValidatorsInstance();
      const isInLongList = await contract.isInLongList(address.toLowerCase());
      setIsValidator(isInLongList);
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
      setIsValidator(false);
    }
  }

  useEffect(() => {
    getValidatorRank();
    checkIsValidator();
    return () => {
      setValidatorRank(0);
      setIsValidator(false);
    };
  }, [address]);

  return { validatorRank, isValidator };
};

const useIsActiveValidator = (address: string) => {
  const { indexerUrl } = useNetworkConfig();
  const [isActiveValidator, setIsActiveValidator] = useState(false);

  const getInactiveValidators = async () => {
    try {
      const indexer = getIndexerInstance(indexerUrl);
      const inactiveValidators = await indexer.getInactiveValidators([address]);
      setIsActiveValidator(inactiveValidators === 0);
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
      setIsActiveValidator(false);
    }
  };

  useEffect(() => {
    getInactiveValidators();
    return () => setIsActiveValidator(false);
  }, [address]);

  return { isActiveValidator };
};

const useValidatorStatus = (address: string) => {
  const { t } = useTranslation();
  const { maxNStandbyValidators, maxNValidators } = useConstitution();
  const { validatorRank, isValidator } = useGetValidatorRank(address);
  const { isActiveValidator } = useIsActiveValidator(address);
  const [validatorStatus, setValidatorStatus] = useState<ValidatorLegend | null>(null);

  const getValidatorStatus = (): ValidatorLegend => {
    if (!isValidator) {
      return { title: t('NOT_A_VALIDATOR'), status: 'not-ranking' };
    }
    if (!validatorRank) {
      return { title: t('NOT_IN_SHORTLIST'), status: 'not-ranking' };
    }
    if (validatorRank <= maxNValidators) {
      return isActiveValidator
        ? { title: t('ACTIVE_VALIDATOR'), status: 'active' }
        : { title: t('INACTIVE_VALIDATOR'), status: 'inactive' };
    }
    if (validatorRank < maxNStandbyValidators + maxNValidators) {
      return { title: t('STANDBY_VALIDATOR'), status: 'standby' };
    }
    return { title: t('BACKUP_VALIDATOR'), status: 'backup' };
  };

  useEffect(() => {
    const status = getValidatorStatus();
    setValidatorStatus(status);
    return () => setValidatorStatus(null);
  }, [isActiveValidator, isValidator, validatorRank, t, maxNValidators, maxNStandbyValidators]);

  return validatorStatus;
};

export { useGetValidatorRank, useValidatorStatus };
