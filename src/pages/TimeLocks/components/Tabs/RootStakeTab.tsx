import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import BalanceCard from '../TimeLocksTable';

import { getMinimumRootTimeLock, getRootNodeStakes, getRootTimeLocks } from 'store/root-node/action-creators';
import { rootMinimumTimeLock, rootNodeStake, rootTimeLocks } from 'store/root-node/selectors';

import { CONTRACT_TYPES } from 'constants/contracts';

interface Props {
  currentAddress: string;
}

function RootStakeTab ({ currentAddress }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const rootStakeBalanceRef = useAnimateNumber(useSelector(rootNodeStake));
  const rootTimeLockMinimumBalanceRef = useAnimateNumber(useSelector(rootMinimumTimeLock));
  const rootTimeLocksArray = useSelector(rootTimeLocks);

  useInterval(() => {
    dispatch(getMinimumRootTimeLock(currentAddress));
  }, 5000);

  useEffect(() => {
    dispatch(getRootNodeStakes(currentAddress));
    dispatch(getMinimumRootTimeLock(currentAddress));
    dispatch(getRootTimeLocks(currentAddress));
  }, [dispatch, currentAddress]);

  return (
    <BalanceCard
      address={currentAddress}
      title={t('ROOT_STAKE_BALANCE')}
      contract={CONTRACT_TYPES.root}
      balanceRef={rootStakeBalanceRef}
      timeLockBalanceRef={rootTimeLockMinimumBalanceRef}
      lockAmountData={rootTimeLocksArray || []}
    />
  );
}

export default RootStakeTab;
