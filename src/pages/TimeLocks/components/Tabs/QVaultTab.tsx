import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import BalanceCard from '../TimeLocksTable';

import { useQVault } from 'store/q-vault/hooks';

import { CONTRACT_TYPES } from 'constants/contracts';

interface Props {
  currentAddress: string;
}

function QVaultTab ({ currentAddress }: Props) {
  const { t } = useTranslation();
  const {
    vaultBalance,
    qVaultMinimumTimeLock,
    qVaultTimeLocks,
    loadVaultBalance,
    loadQVaultTimeLocks,
    loadMinimumQVaultTimeLock
  } = useQVault();

  const qVaultStakeBalanceRef = useAnimateNumber(vaultBalance);
  const qVaultTimeLockMinimumBalanceRef = useAnimateNumber(qVaultMinimumTimeLock);

  useInterval(() => {
    loadMinimumQVaultTimeLock(currentAddress);
  }, 5000);

  useEffect(() => {
    loadVaultBalance(currentAddress);
    loadMinimumQVaultTimeLock(currentAddress);
    loadQVaultTimeLocks(currentAddress);
  }, [currentAddress]);

  return (
    <BalanceCard
      address={currentAddress}
      title={t('Q_VAULT_ACCOUNT_BALANCE')}
      contract={CONTRACT_TYPES.qVault}
      balanceRef={qVaultStakeBalanceRef}
      timeLockBalanceRef={qVaultTimeLockMinimumBalanceRef}
      lockAmountData={qVaultTimeLocks}
    />
  );
}

export default QVaultTab;
