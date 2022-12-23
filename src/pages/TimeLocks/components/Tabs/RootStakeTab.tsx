import { useTranslation } from 'react-i18next';

import { useTimeLocksAddress } from 'pages/TimeLocks/TimeLocks';

import useRootStakeTimeLocks from '../../hooks/useRootStakeTimeLocks';
import useTimeLockLimits from '../../hooks/useTimeLockLimits';
import LocksOverview from '../LocksOverview';
import TimeLocksTable from '../TimeLocksTable';

function RootStakeTab () {
  const { t } = useTranslation();
  const { address } = useTimeLocksAddress();

  const {
    rootNodeStake,
    rootMinimumTimeLock,
    rootTimeLocks,
    getMinimumRootTimeLock,
    getRootNodeStakes,
    getRootTimeLocks,
    rootTimeLocksLoading,
  } = useRootStakeTimeLocks(address);

  const isDepositsLimitReached = useTimeLockLimits(rootTimeLocks);

  const loadAll = () => {
    getRootNodeStakes();
    getMinimumRootTimeLock();
    getRootTimeLocks();
  };

  return (
    <div>
      <LocksOverview
        title={t('ROOT_STAKE_BALANCE')}
        balance={rootNodeStake}
        contract="rootNodes"
        timeLockBalance={rootMinimumTimeLock}
        isLoadingTimeLocks={rootTimeLocksLoading}
        isDepositsLimitReached={isDepositsLimitReached}
        onSubmit={loadAll}
      />

      <TimeLocksTable
        address={address}
        contract="rootNodes"
        lockAmountData={rootTimeLocks}
        isLoading={rootTimeLocksLoading}
        onSubmit={loadAll}
      />
    </div>
  );
}

export default RootStakeTab;
