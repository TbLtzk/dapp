import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useInterval } from '@q-dev/react-hooks';

import { useTimeLocksAddress } from 'pages/TimeLocks/TimeLocks';

import useTimeLockLimits from '../../hooks/useTimeLockLimits';
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
    loadMinimumQVaultTimeLock,
    qVaultTimeLocksLoading,
  } = useQVault();

  useInterval(() => {
    loadMinimumQVaultTimeLock(address);
  }, 5000);

  useEffect(() => {
    loadVaultBalance(address);
    loadMinimumQVaultTimeLock(address);
    loadQVaultTimeLocks(address);
  }, [address]);

  const isDepositsLimitReached = useTimeLockLimits(qVaultTimeLocks);

  return (
    <div>
      <LocksOverview
        title={t('Q_VAULT_ACCOUNT_BALANCE')}
        balance={vaultBalance}
        contract="qVault"
        timeLockBalance={qVaultMinimumTimeLock}
        isLoadingTimeLocks={qVaultTimeLocksLoading}
        isDepositsLimitReached={isDepositsLimitReached}
      />

      <TimeLocksTable
        address={address}
        contract="qVault"
        lockAmountData={qVaultTimeLocks}
        isLoading={qVaultTimeLocksLoading}
      />
    </div>
  );
}

export default QVaultTab;
