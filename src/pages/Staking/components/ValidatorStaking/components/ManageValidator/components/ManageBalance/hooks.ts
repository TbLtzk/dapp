import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useWeb3Context } from 'context/Web3ContextProvider';
import { ContractTransaction } from 'ethers';

import { FORM_TYPES } from './components/ValidatorMenu';

import { useTransaction } from 'store/transaction/hooks';
import { useValidators } from 'store/validators/hooks';

import { getValidatorsInstance } from 'contracts/contract-instance';

import { toWei } from 'utils/web3';

const useSendValidatorForms = () => {
  const { address } = useWeb3Context();
  const {
    loadValidatorTotalStake,
    loadValidatorDelegatedStake,
    loadValidatorAccountableTotalStake,
    loadValidatorAccountableSelfStake,
    loadValidatorWithdrawalInfo,
  } = useValidators();

  const sendForm = async (formType: string, amount: string) => {
    const contract = await getValidatorsInstance();
    let tx: ContractTransaction;
    switch (formType) {
      case FORM_TYPES.stakeToRanking:
        tx = await contract.commitStake({ value: toWei(amount), from: address });
        break;
      case FORM_TYPES.announceWithdrawal:
        tx = await contract.announceWithdrawal(toWei(amount), { from: address });
        break;
      case FORM_TYPES.withdrawFromRanking:
        tx = await contract.withdraw(toWei(amount), address);
        break;
      default:
        throw new Error('Unknown form type');
    }

    return {
      tx,
      onSuccess: () => {
        loadValidatorTotalStake();
        loadValidatorDelegatedStake();
        loadValidatorAccountableTotalStake();
        loadValidatorAccountableSelfStake();
        loadValidatorWithdrawalInfo();
      }
    };
  };

  return useCallback(sendForm, []);
};

function useEnterShortList () {
  const { submitTransaction } = useTransaction();
  const { t } = useTranslation();
  const { address } = useWeb3Context();
  const { checkIsValidator, loadValidatorsShortList } = useValidators();

  const enterShortList = async () => {
    await submitTransaction({
      successMessage: t('ENTERING_VALIDATOR_RANK_TX'),
      submitFn: async () => {
        const contract = await getValidatorsInstance();
        return contract.enterShortList({ from: address });
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
