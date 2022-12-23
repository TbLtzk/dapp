import { useTranslation } from 'react-i18next';

import { useTimeLocksAddress } from 'pages/TimeLocks/TimeLocks';

import useTimeLockLimits from '../../hooks/useTimeLockLimits';
import useValidatorStakeTimeLocks from '../../hooks/useValidatorStakeTimeLocks';
import LocksOverview from '../LocksOverview';
import TimeLocksTable from '../TimeLocksTable';

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
  } = useValidatorStakeTimeLocks(address);

  const isDepositsLimitReached = useTimeLockLimits(validatorsTimeLocks);

  const loadAll = () => {
    loadValidatorAccountableSelfStake();
    loadValidatorMinimumTimeLock();
    loadValidatorTimeLocks();
  };

  return (
    <div>
      <LocksOverview
        title={t('VALIDATOR_STAKE_BALANCE')}
        balance={validatorAccountableSelfStake}
        contract="validators"
        timeLockBalance={validatorsMinimumTimeLock}
        isLoadingTimeLocks={validatorsTimeLocksLoading}
        isDepositsLimitReached={isDepositsLimitReached}
        onSubmit={loadAll}
      />

      <TimeLocksTable
        address={address}
        contract="validators"
        lockAmountData={validatorsTimeLocks}
        isLoading={validatorsTimeLocksLoading}
        onSubmit={loadAll}
      />
    </div>
  );
}

export default ValidatorStakeTab;
