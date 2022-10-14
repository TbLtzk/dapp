import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useInterval } from '@q-dev/react-hooks';

import { useTimeLocksAddress } from 'pages/TimeLocks/TimeLocks';

import useTimeLockLimits from '../../hooks/useTimeLockLimits';
import LocksOverview from '../LocksOverview';
import TimeLocksTable from '../TimeLocksTable';

import { useValidators } from 'store/validators/hooks';

function ValidatorStakeTab () {
  const { t } = useTranslation();
  const { address } = useTimeLocksAddress();

  const {
    validatorAccountableSelfStake,
    validatorsMinimumTimeLock,
    validatorsTimeLocks,
    loadValidatorAccountableSelfStake,
    loadValidatorMinimumTimeLock,
    loadValidatorTimeLocks,
    validatorsTimeLocksLoading,
  } = useValidators();

  useInterval(() => {
    loadValidatorMinimumTimeLock(address);
  }, 5000);

  useEffect(() => {
    loadValidatorAccountableSelfStake(address);
    loadValidatorMinimumTimeLock(address);
    loadValidatorTimeLocks(address);
  }, [address]);

  const isDepositsLimitReached = useTimeLockLimits(validatorsTimeLocks);

  return (
    <div>
      <LocksOverview
        title={t('VALIDATOR_STAKE_BALANCE')}
        balance={validatorAccountableSelfStake}
        contract="validators"
        timeLockBalance={validatorsMinimumTimeLock}
        isLoadingTimeLocks={validatorsTimeLocksLoading}
        isDepositsLimitReached={isDepositsLimitReached}
      />

      <TimeLocksTable
        address={address}
        contract="validators"
        lockAmountData={validatorsTimeLocks}
        isLoading={validatorsTimeLocksLoading}
      />
    </div>
  );
}

export default ValidatorStakeTab;
