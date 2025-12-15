import { useTranslation } from 'react-i18next';

import { useTimeLocksAddress } from 'pages/TimeLocks/TimeLocks';

import useQVaultTimeLocks from '../../hooks/useQVaultTimeLocks';
import useTimeLockLimits from '../../hooks/useTimeLockLimits';
import LocksOverview from '../LocksOverview';
import TimeLocksTable from '../TimeLocksTable';

function QVaultTab () {
  const { t } = useTranslation();
  const { address } = useTimeLocksAddress();

  const {
    vaultBalance,
    qVaultMinimumTimeLock,
    qVaultTimeLocks,
    qVaultTimeLocksLoading,
    loadMinimumQVaultTimeLock,
    loadVaultBalance,
    loadQVaultTimeLocks,
  } = useQVaultTimeLocks(address);

  const isDepositsLimitReached = useTimeLockLimits(qVaultTimeLocks);

  const loadAll = () => {
    loadMinimumQVaultTimeLock();
    loadVaultBalance();
    loadQVaultTimeLocks();
  };

  return (
    <div>
      <LocksOverview
        title={t('QGOV_VAULT_ACCOUNT_BALANCE')}
        balance={vaultBalance}
        contract="qVault"
        timeLockBalance={qVaultMinimumTimeLock}
        isLoadingTimeLocks={qVaultTimeLocksLoading}
        isDepositsLimitReached={isDepositsLimitReached}
        onSubmit={loadAll}
      />

      <TimeLocksTable
        address={address}
        contract="qVault"
        lockAmountData={qVaultTimeLocks}
        isLoading={qVaultTimeLocksLoading}
        onSubmit={loadAll}
      />
    </div>
  );
}

export default QVaultTab;
