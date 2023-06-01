import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { SubmitTransactionResponse } from '@q-dev/q-js-sdk';
import { toWei } from 'web3-utils';

import { FORM_TYPES } from './components/ValidatorMenu';

import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';
import { useValidators } from 'store/validators/hooks';

import { getValidatorsInstance } from 'contracts/contract-instance';

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
      successMessage: t('ENTERING_VALIDATOR_RANK_TX'),
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

export { useEnterShortList, useSendValidatorForms };
