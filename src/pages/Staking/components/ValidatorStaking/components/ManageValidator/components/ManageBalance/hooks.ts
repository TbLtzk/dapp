import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SubmitTransactionResponse } from '@q-dev/q-js-sdk';
import { toWei } from 'web3-utils';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { FORM_TYPES } from './components/ValidatorMenu';

import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';
import { useValidators } from 'store/validators/hooks';

import { getIndexerInstance, getValidatorsInstance } from 'contracts/contract-instance';

import { captureError } from 'utils/errors';

const useGetValidatorRank = () => {
  const [validatorRankFormatted, setValidatorRankFormatted] = useState('...');
  const [validatorRank, setValidatorRank] = useState(0);
  const user = useUser();

  const getValidatoRank = async () => {
    try {
      const validatorsInstance = await getValidatorsInstance();
      const shortList = await validatorsInstance.getShortList();
      const validatorRank = shortList.findIndex((val) => val.address === user.address);
      setValidatorRank(validatorRank + 1);
      setValidatorRankFormatted(validatorRank === -1 ? '-' : String(`#${validatorRank + 1}`));
    } catch (error) {
      captureError(error);
    }
  };

  useEffect(() => {
    getValidatoRank();
    return () => setValidatorRankFormatted('...');
  }, []);

  return { validatorRank, validatorRankFormatted };
};

const useIsUserActiveValidator = () => {
  const user = useUser();
  const { indexerUrl } = useNetworkConfig();
  const [isActiveValidator, setIsActiveValidator] = useState(false);

  const getValidatoRank = async () => {
    try {
      const indexer = await getIndexerInstance(indexerUrl);
      const inactiveValidators = await indexer.getInactiveValidators([user.address]);
      setIsActiveValidator(inactiveValidators === 0);
    } catch (error) {
      captureError(error);
    }
  };
  useEffect(() => {
    getValidatoRank();
    return () => setIsActiveValidator(false);
  }, []);

  return isActiveValidator;
};

const useSendValidatorForms = () => {
  const user = useUser();
  const {
    loadValidatorTotalStake,
    loadValidatorDelegatedStake,
    loadValidatorAccountableTotalStake,
    loadValidatorAccountableSelfStake,
    loadValidatorWithdrawalInfo,
  } = useValidators();

  const sendForm = async (formType: string, amount: string) => {
    const contract = await getValidatorsInstance();
    let receipt: SubmitTransactionResponse;
    switch (formType) {
      case FORM_TYPES.stakeToRanking:
        receipt = await contract.commitStake({ value: toWei(amount), from: user.address });
        break;
      case FORM_TYPES.announceWithdrawal:
        receipt = await contract.announceWithdrawal(toWei(amount), { from: user.address });
        break;
      case FORM_TYPES.withdrawFromRanking:
        receipt = await contract.withdraw(toWei(amount), user.address);
        break;
      default:
        throw new Error('Unknown form type');
    }

    receipt.promiEvent
      .once('receipt', () => {
        loadValidatorTotalStake();
        loadValidatorDelegatedStake();
        loadValidatorAccountableTotalStake();
        loadValidatorAccountableSelfStake();
        loadValidatorWithdrawalInfo();
      });

    return receipt;
  };

  return useCallback(sendForm, []);
};

function useEnterShortList () {
  const { submitTransaction } = useTransaction();
  const { t } = useTranslation();
  const user = useUser();
  const { checkIsValidator, loadValidatorsShortList } = useValidators();

  const enterShortList = async () => {
    await submitTransaction({
      successMessage: t('SUCCESS_ENTERING_VALIDATOR_RANK'),
      submitFn: async () => {
        const contract = await getValidatorsInstance();
        return contract.enterShortList({ from: user.address });
      },
      onSuccess: () => {
        checkIsValidator();
        loadValidatorsShortList();
      },
    });
  };

  return useCallback(enterShortList, []);
}

export { useEnterShortList, useGetValidatorRank, useIsUserActiveValidator, useSendValidatorForms };
