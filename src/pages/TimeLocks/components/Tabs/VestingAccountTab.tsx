import { useTranslation } from 'react-i18next';

import { useTimeLocksAddress } from 'pages/TimeLocks/TimeLocks';

import useTimeLockLimits from '../../hooks/useTimeLockLimits';
import useVestingTimeLocks from '../../hooks/useVestingTimeLocks';
import LocksOverview from '../LocksOverview';
import TimeLocksTable from '../TimeLocksTable';

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
  } = useVestingTimeLocks(address);

  const isDepositsLimitReached = useTimeLockLimits(vestingTimeLocks);

  const loadAll = () => {
    getVestingBalance();
    getMinimumVestingTimeLock();
    getVestingTimeLocks();
  };

  return (
    <div>
      <LocksOverview
        title={t('VESTING_ACCOUNT_BALANCE')}
        balance={vestingBalance}
        contract="vesting"
        timeLockBalance={vestingMinimumTimeLock}
        isLoadingTimeLocks={vestingTimeLocksLoading}
        isDepositsLimitReached={isDepositsLimitReached}
        onSubmit={loadAll}
      />

      <TimeLocksTable
        address={address}
        contract="vesting"
        lockAmountData={vestingTimeLocks}
        isLoading={vestingTimeLocksLoading}
        onSubmit={loadAll}
      />
    </div>
  );
}

export default VestingAccountTab;
