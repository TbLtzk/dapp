import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useTimeLocksAddress } from 'pages/TimeLocks/TimeLocks';

import useInterval from 'hooks/useInterval';

import LocksOverview from '../LocksOverview';
import TimeLocksTable from '../TimeLocksTable';

import { useQVault } from 'store/q-vault/hooks';

function QVaultTab () {
  const { t } = useTranslation();
  const { address } = useTimeLocksAddress();

  const {
    vaultBalance,
    qVaultMinimumTimeLock,
    qVaultTimeLocks,
    loadVaultBalance,
    loadQVaultTimeLocks,
    loadMinimumQVaultTimeLock
  } = useQVault();

  useInterval(() => {
    loadMinimumQVaultTimeLock(address);
  }, 5000);

  useEffect(() => {
    loadVaultBalance(address);
    loadMinimumQVaultTimeLock(address);
    loadQVaultTimeLocks(address);
  }, [address]);

  return (
    <div>
      <LocksOverview
        title={t('Q_VAULT_ACCOUNT_BALANCE')}
        balance={vaultBalance}
        contract="qVault"
        timeLockBalance={qVaultMinimumTimeLock}
      />

      <TimeLocksTable
        address={address}
        contract="qVault"
        lockAmountData={qVaultTimeLocks}
      />
    </div>
  );
}

export default QVaultTab;
