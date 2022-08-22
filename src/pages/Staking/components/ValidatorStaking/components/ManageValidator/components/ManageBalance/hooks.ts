import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { TransactionReceipt } from 'web3-eth';
import { toWei } from 'web3-utils';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { FORM_TYPES } from './components/ValidatorMenu';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/actions';
import { userAddressMetamask } from 'store/user-inf/selectors';
import {
  getIsUserValidator,
  getValidatorAccountableSelfStake,
  getValidatorAccountableTotalStake,
  getValidatorDelegatedStake,
  getValidatorMembers,
  getValidatorTotalStake,
  getValidatorWithdrawalInfo,
} from 'store/validators/action-creators';

import { getIndexerInstance, getValidatorsInstance } from 'contracts/contract-instance';

import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';

const useGetValidatorRank = () => {
  const [validatorRank, setValidatorRank] = useState('...');
  const userAddress = useSelector(userAddressMetamask);

  const getValidatoRank = async () => {
    try {
      const validatorsInstance = await getValidatorsInstance();
      const shortList = await validatorsInstance.getShortList();
      const validatorRank = shortList.findIndex((val) => val.address === userAddress);
      setValidatorRank(validatorRank === -1 ? '-' : String(validatorRank + ' #'));
    } catch (error) {
      captureError(error);
    }
  };

  useEffect(() => {
    getValidatoRank();
    return () => setValidatorRank('...');
  }, []);

  return validatorRank;
};

const useIsUserActiveValidator = () => {
  const userAddress = useSelector(userAddressMetamask);
  const { indexerUrl } = useNetworkConfig();
  const [isActiveValidator, setIsActiveValidator] = useState(false);

  const getValidatoRank = async () => {
    try {
      const indexer = await getIndexerInstance(indexerUrl);
      // @ts-ignore FIXME: Fix SDK types
      const inactiveValidators = await indexer.getInactiveValidators([userAddress]);
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
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  const sendForm = async (formType: string, amount: string, label: string, form: any) => {
    try {
      dispatch(setTransactionLoading());
      const contract = await getValidatorsInstance();
      let transaction = {} as TransactionReceipt;
      switch (formType) {
        case FORM_TYPES.stakeToRanking:
          transaction = await contract.commitStake({ value: toWei(amount), from: userAddress });
          break;
        case FORM_TYPES.announceWithdrawal:
          transaction = await contract.announceWithdrawal(toWei(amount), { from: userAddress });
          break;
        case FORM_TYPES.withdrawFromRanking:
          transaction = await contract.withdraw(toWei(amount), userAddress);
          break;
      }

      dispatch(getValidatorTotalStake());
      dispatch(getValidatorDelegatedStake());
      dispatch(getValidatorAccountableTotalStake());
      dispatch(getValidatorAccountableSelfStake());
      dispatch(getValidatorWithdrawalInfo());

      dispatch(setTransactionLoadingSuccess(getSuccessMessage(formTypes.validatorsStaking, transaction, label)));
      form.reset();
    } catch (error) {
      captureError(error);
      dispatch(setTransactionLoadingError(getErrorMessage(error)));
    }
  };

  return useCallback(sendForm, []);
};

function useEnterShortList () {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userAddress = useSelector(userAddressMetamask);

  const enterShortList = async () => {
    try {
      dispatch(setTransactionLoading());

      const contract = await getValidatorsInstance();

      const transaction = await contract.enterShortList({ from: userAddress });

      dispatch(getIsUserValidator());
      dispatch(getValidatorMembers());

      dispatch(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, t('SUCCES_ENTERING_VALIDATOR_RANK'))));
    } catch (error) {
      captureError(error);
      dispatch(setTransactionLoadingError(getErrorMessage(error)));
    }
  };

  return useCallback(enterShortList, []);
}

export { useEnterShortList, useGetValidatorRank, useIsUserActiveValidator, useSendValidatorForms };
