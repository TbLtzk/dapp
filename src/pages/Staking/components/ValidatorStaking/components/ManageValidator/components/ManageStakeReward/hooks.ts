import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/actions';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { getVRPBalance, getVRPDelegatorsShare, getVRPLastUpdateOfCompoundRate, getVRPPoolInfo } from 'store/validation-reward-pools/action-creators';
import { lastUpdateOfCompoundRateSelector } from 'store/validation-reward-pools/selectors';

import { getValidationRewardPoolsInstance } from 'contracts/contract-instance';

import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';
import { getFixedPercentage } from 'utils/numbers';

function useSetDelegatorShare () {
  const dispatch = useDispatch();

  const setDelegatorShare = async (amount: string, label: string, form: any) => {
    try {
      dispatch(setTransactionLoading());
      const contract = await getValidationRewardPoolsInstance();
      const transaction = await contract.setDelegatorsShare(getFixedPercentage(amount));
      form.reset();
      dispatch(getVRPDelegatorsShare());
      dispatch(setTransactionLoadingSuccess(getSuccessMessage(formTypes.validatorsPool, transaction, label)));
    } catch (error) {
      captureError(error);
      dispatch(setTransactionLoadingError(getErrorMessage(error)));
    }
  };

  return {
    setDelegatorShare: useCallback(setDelegatorShare, [])
  };
}

function useUpdateValidatorCompoundRate () {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userAddress = useSelector(userAddressMetamask);
  const [loading, setLoading] = useState(false);
  const lastUpdateOfCompoundRate = useSelector(lastUpdateOfCompoundRateSelector);

  const updateCompoundRate = async (label: string) => {
    try {
      setLoading(true);

      const contract = await getValidationRewardPoolsInstance();
      const transaction = await contract.updateValidatorsCompoundRate(userAddress);
      const nextUpdateCompoundRate = await contract.getLastUpdateOfCompoundRate(userAddress);
      if (String(lastUpdateOfCompoundRate) === String(nextUpdateCompoundRate)) {
        dispatch(
          setTransactionLoadingError({ message: t('STAKE_AMOUNT_BELOW_MINIMUM_TO_APPLY_NEW_RATE') })
        );
      } else {
        dispatch(getVRPPoolInfo());
        dispatch(getVRPBalance());
        dispatch(getVRPDelegatorsShare());
        dispatch(getVRPLastUpdateOfCompoundRate());
        dispatch(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
      }
    } catch (error) {
      captureError(error);
      dispatch(setTransactionLoadingError(getErrorMessage(error)));
    } finally {
      setLoading(false);
    }
  };

  return {
    compountRateLoading: loading,
    updateCompoundRate,
  };
}

export { useSetDelegatorShare, useUpdateValidatorCompoundRate };
