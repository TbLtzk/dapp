import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import BalanceCard from '../TimeLocksTable';

import { getMinimumValidatorsTimeLock, getValidatorAccountableSelfStake, getValidatorsTimeLocks } from 'store/validators/action-creators';
import { validatorAccountableSelfStakeSelector, validatorsMinimumTimeLock, validatorsTimeLocks } from 'store/validators/selectors';

import { CONTRACT_TYPES } from 'constants/contracts';

interface Props {
  currentAddress: string;
}

function ValidatorStakeTab ({ currentAddress }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validatorSelfStakeRef = useAnimateNumber(useSelector(validatorAccountableSelfStakeSelector));
  const validatorsTimeLockMinimumBalanceRef = useAnimateNumber(useSelector(validatorsMinimumTimeLock));
  const validatorsTimeLocksArray = useSelector(validatorsTimeLocks);

  useInterval(() => {
    dispatch(getMinimumValidatorsTimeLock(currentAddress));
  }, 5000);

  useEffect(() => {
    dispatch(getValidatorAccountableSelfStake(currentAddress));
    dispatch(getMinimumValidatorsTimeLock(currentAddress));
    dispatch(getValidatorsTimeLocks(currentAddress));
  }, [dispatch, currentAddress]);

  return (
    <BalanceCard
      address={currentAddress}
      title={t('VALIDATOR_STAKE_BALANCE')}
      contract={CONTRACT_TYPES.validators}
      balanceRef={validatorSelfStakeRef}
      timeLockBalanceRef={validatorsTimeLockMinimumBalanceRef}
      lockAmountData={validatorsTimeLocksArray || []}
    />
  );
}

export default ValidatorStakeTab;
