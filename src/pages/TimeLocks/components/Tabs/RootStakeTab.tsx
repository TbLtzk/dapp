import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useTimeLocksAddress } from 'pages/TimeLocks/TimeLocks';

import useInterval from 'hooks/useInterval';

import LocksOverview from '../LocksOverview';
import TimeLocksTable from '../TimeLocksTable';

import { useRootNodes } from 'store/root-nodes/hooks';

function RootStakeTab () {
  const { t } = useTranslation();
  const { address } = useTimeLocksAddress();

  const {
    rootNodeStake,
    rootMinimumTimeLock,
    rootTimeLocks,
    getMinimumRootTimeLock,
    getRootNodeStakes,
    getRootTimeLocks
  } = useRootNodes();

  useInterval(() => {
    getMinimumRootTimeLock(address);
  }, 5000);

  useEffect(() => {
    getRootNodeStakes(address);
    getMinimumRootTimeLock(address);
    getRootTimeLocks(address);
  }, [address]);

  return (
    <div>
      <LocksOverview
        title={t('ROOT_STAKE_BALANCE')}
        balance={rootNodeStake}
        contract="rootNodes"
        timeLockBalance={rootMinimumTimeLock}
      />

      <TimeLocksTable
        address={address}
        contract="rootNodes"
        lockAmountData={rootTimeLocks}
      />
    </div>
  );
}

export default RootStakeTab;
