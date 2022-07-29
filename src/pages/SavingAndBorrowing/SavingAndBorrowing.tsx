import { useTranslation } from 'react-i18next';

import PageLayout from 'components/PageLayout';

import BorrowCryptoAssets from './components/BorrowCryptoAssets';
import CreateVault from './components/CreateVault';
import Overview from './components/Overview';
import SavingCryptoAssets from './components/SavingCryptoAssets';

function SavingAndBorrowing () {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('SAVING_BORROWING')}
      action={<CreateVault/>}
    >
      <div className="grid-2-1">
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'minmax(0, 1fr)' }}>
          <SavingCryptoAssets />
          <BorrowCryptoAssets />
        </div>
        <Overview />
      </div>
    </PageLayout>
  );
}

export default SavingAndBorrowing;
