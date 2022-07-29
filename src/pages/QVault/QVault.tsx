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
    <PageLayout
      title={t('Q_VAULT')}
      titleExtra={<InfoTooltip placement="bottom" topic="q-vault" />}
    >
      <div className="grid-2-1">
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
