import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import BalanceCard from '../TimeLocksTable';

import { useValidators } from 'store/validators/hooks';

import { CONTRACT_TYPES } from 'constants/contracts';

interface Props {
  currentAddress: string;
}

function ValidatorStakeTab ({ currentAddress }: Props) {
  const { t } = useTranslation();
  const {
    validatorAccountableSelfStake,
    validatorsMinimumTimeLock,
    validatorsTimeLocks,
    loadValidatorAccountableSelfStake,
    loadValidatorMinimumTimeLock,
    loadValidatorTimeLocks
  } = useValidators();

  const validatorSelfStakeRef = useAnimateNumber(validatorAccountableSelfStake);
  const validatorsTimeLockMinimumBalanceRef = useAnimateNumber(validatorsMinimumTimeLock);

  useInterval(() => {
    loadValidatorMinimumTimeLock(currentAddress);
  }, 5000);

  useEffect(() => {
    loadValidatorAccountableSelfStake(currentAddress);
    loadValidatorMinimumTimeLock(currentAddress);
    loadValidatorTimeLocks(currentAddress);
  }, [currentAddress]);

  return (
    <BalanceCard
      address={currentAddress}
      title={t('VALIDATOR_STAKE_BALANCE')}
      contract={CONTRACT_TYPES.validators}
      balanceRef={validatorSelfStakeRef}
      timeLockBalanceRef={validatorsTimeLockMinimumBalanceRef}
      lockAmountData={validatorsTimeLocks}
    />
  );
}

export default ValidatorStakeTab;
