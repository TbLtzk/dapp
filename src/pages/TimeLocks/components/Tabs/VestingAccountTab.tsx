import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useInterval } from '@q-dev/react-hooks';

import { useTimeLocksAddress } from 'pages/TimeLocks/TimeLocks';

import useTimeLockLimits from '../../hooks/useTimeLockLimits';
import LocksOverview from '../LocksOverview';
import TimeLocksTable from '../TimeLocksTable';

import { useVesting } from 'store/vesting/hooks';

function VestingAccountTab () {
  const { t } = useTranslation();
  const { address } = useTimeLocksAddress();

  const {
    vestingBalance,
    vestingMinimumTimeLock,
    vestingTimeLocks,
    getVestingBalance,
    getMinimumVestingTimeLock,
    getVestingTimeLocks,
    vestingTimeLocksLoading,
  } = useVesting();

  useInterval(() => {
    getMinimumVestingTimeLock(address);
  }, 5000);

  useEffect(() => {
    getVestingBalance(address);
    getMinimumVestingTimeLock(address);
    getVestingTimeLocks(address);
  }, [address]);

  const isDepositsLimitReached = useTimeLockLimits(vestingTimeLocks);

  return (
    <div>
      <LocksOverview
        title={t('VESTING_ACCOUNT_BALANCE')}
        balance={vestingBalance}
        contract="vesting"
        timeLockBalance={vestingMinimumTimeLock}
        isLoadingTimeLocks={vestingTimeLocksLoading}
        isDepositsLimitReached={isDepositsLimitReached}
      />

      <TimeLocksTable
        address={address}
        contract="vesting"
        lockAmountData={vestingTimeLocks}
        isLoading={vestingTimeLocksLoading}
      />
    </div>
  );
}

export default VestingAccountTab;
