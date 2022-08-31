import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import BalanceCard from '../TimeLocksTable';

import { getMinimumVestingTimeLock, getVestingBalance, getVestingTimeLocks } from 'store/vesting/action-creators';
import { vestingBalance, vestingMinimumTimeLock, vestingTimeLocks } from 'store/vesting/selectors';

import { CONTRACT_TYPES } from 'constants/contracts';

interface Props {
  currentAddress: string;
}

function VestingAccountTab ({ currentAddress }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const vestingStakeBalanceRef = useAnimateNumber(useSelector(vestingBalance));
  const vestingTimeLockMinimumBalanceRef = useAnimateNumber(useSelector(vestingMinimumTimeLock));
  const vestingTimeLocksArray = useSelector(vestingTimeLocks);

  useInterval(() => {
    dispatch(getMinimumVestingTimeLock(currentAddress));
  }, 5000);

  useEffect(() => {
    dispatch(getVestingBalance(currentAddress));
    dispatch(getMinimumVestingTimeLock(currentAddress));
    dispatch(getVestingTimeLocks(currentAddress));
  }, [dispatch, currentAddress]);

  return (
    <BalanceCard
      address={currentAddress}
      title={t('VESTING_ACCOUNT_BALANCE')}
      contract={CONTRACT_TYPES.vesting}
      balanceRef={vestingStakeBalanceRef}
      timeLockBalanceRef={vestingTimeLockMinimumBalanceRef}
      lockAmountData={vestingTimeLocksArray || []}
    />
  );
}

export default VestingAccountTab;
