import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useTimeLocksAddress } from 'pages/TimeLocks/TimeLocks';

import useInterval from 'hooks/useInterval';

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
  } = useVesting();

  useInterval(() => {
    getMinimumVestingTimeLock(address);
  }, 5000);

  useEffect(() => {
    getVestingBalance(address);
    getMinimumVestingTimeLock(address);
    getVestingTimeLocks(address);
  }, [address]);

  return (
    <div>
      <LocksOverview
        title={t('VESTING_ACCOUNT_BALANCE')}
        balance={vestingBalance}
        contract="vesting"
        timeLockBalance={vestingMinimumTimeLock}
      />

      <TimeLocksTable
        address={address}
        contract="vesting"
        lockAmountData={vestingTimeLocks}
      />
    </div>
  );
}

export default VestingAccountTab;
