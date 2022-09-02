import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import BalanceCard from '../TimeLocksTable';

import { useVesting } from 'store/vesting/hooks';

import { CONTRACT_TYPES } from 'constants/contracts';

interface Props {
  currentAddress: string;
}

function VestingAccountTab ({ currentAddress }: Props) {
  const { t } = useTranslation();
  const {
    vestingBalance,
    vestingMinimumTimeLock,
    vestingTimeLocks,
    getVestingBalance,
    getMinimumVestingTimeLock,
    getVestingTimeLocks,
  } = useVesting();

  const vestingStakeBalanceRef = useAnimateNumber(vestingBalance);
  const vestingTimeLockMinimumBalanceRef = useAnimateNumber(vestingMinimumTimeLock);

  useInterval(() => {
    getMinimumVestingTimeLock(currentAddress);
  }, 5000);

  useEffect(() => {
    getVestingBalance(currentAddress);
    getMinimumVestingTimeLock(currentAddress);
    getVestingTimeLocks(currentAddress);
  }, [currentAddress]);

  return (
    <BalanceCard
      address={currentAddress}
      title={t('VESTING_ACCOUNT_BALANCE')}
      contract={CONTRACT_TYPES.vesting}
      balanceRef={vestingStakeBalanceRef}
      timeLockBalanceRef={vestingTimeLockMinimumBalanceRef}
      lockAmountData={vestingTimeLocks}
    />
  );
}

export default VestingAccountTab;
