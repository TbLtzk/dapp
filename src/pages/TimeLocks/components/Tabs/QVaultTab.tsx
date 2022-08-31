import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import BalanceCard from '../TimeLocksTable';

import { getMinimumQVaultTimeLock, getQVaultTimeLocks, getUserBalance } from 'store/q-vault/action-creators';
import { qVaultMinimumTimeLock, qVaultTimeLocks, userBalance } from 'store/q-vault/selectors';

import { CONTRACT_TYPES } from 'constants/contracts';

interface Props {
  currentAddress: string;
}

function QVaultTab ({ currentAddress }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const qVaultStakeBalanceRef = useAnimateNumber(useSelector(userBalance));
  const qVaultTimeLockMinimumBalanceRef = useAnimateNumber(useSelector(qVaultMinimumTimeLock));
  const qVaultTimeLocksArray = useSelector(qVaultTimeLocks);

  useInterval(() => {
    dispatch(getMinimumQVaultTimeLock(currentAddress));
  }, 5000);

  useEffect(() => {
    dispatch(getUserBalance(currentAddress));
    dispatch(getMinimumQVaultTimeLock(currentAddress));
    dispatch(getQVaultTimeLocks(currentAddress));
  }, [dispatch, currentAddress]);

  return (
    <BalanceCard
      address={currentAddress}
      title={t('Q_VAULT_ACCOUNT_BALANCE')}
      contract={CONTRACT_TYPES.qVault}
      balanceRef={qVaultStakeBalanceRef}
      timeLockBalanceRef={qVaultTimeLockMinimumBalanceRef}
      lockAmountData={qVaultTimeLocksArray || []}
    />
  );
}

export default QVaultTab;
