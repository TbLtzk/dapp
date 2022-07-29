import { useTranslation } from 'react-i18next';

import PageLayout from 'components/PageLayout';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import DelegateVoting from './components/DelegateVoting';
import LockCoin from './components/LockCoin';
import ManageBalance from './components/ManageBalance';
import VaultOverview from './components/VaultOverview';

function QVault () {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('Q_VAULT')} titleExtra={<InfoTooltip placement="bottom" topic="q-vault" />}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '16px',
        }}
      >
        <div style={{ display: 'grid', gap: '16px' }}>
          <ManageBalance />
          <LockCoin />
          <DelegateVoting />
        </div>
        <VaultOverview />
      </div>
    </PageLayout>
  );
}

export default QVault;
