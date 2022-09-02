import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import TimeLocksTable from '../TimeLocksTable';

import { useRootNodes } from 'store/root-nodes/hooks';

interface Props {
  currentAddress: string;
}

function RootStakeTab ({ currentAddress }: Props) {
  const { t } = useTranslation();
  const {
    rootNodeStake,
    rootMinimumTimeLock,
    rootTimeLocks,
    getMinimumRootTimeLock,
    getRootNodeStakes,
    getRootTimeLocks
  } = useRootNodes();

  const rootStakeBalanceRef = useAnimateNumber(rootNodeStake);
  const rootTimeLockMinimumBalanceRef = useAnimateNumber(rootMinimumTimeLock);

  useInterval(() => {
    getMinimumRootTimeLock(currentAddress);
  }, 5000);

  useEffect(() => {
    getRootNodeStakes(currentAddress);
    getMinimumRootTimeLock(currentAddress);
    getRootTimeLocks(currentAddress);
  }, [currentAddress]);

  return (
    <TimeLocksTable
      address={currentAddress}
      title={t('ROOT_STAKE_BALANCE')}
      contract="rootNodes"
      balanceRef={rootStakeBalanceRef}
      timeLockBalanceRef={rootTimeLockMinimumBalanceRef}
      lockAmountData={rootTimeLocks}
    />
  );
}

export default RootStakeTab;
