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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '16px'
        }}
      >
        <div style={{ display: 'grid', gap: '16px' }}>
          <SavingCryptoAssets />
          <BorrowCryptoAssets />
        </div>
        <Overview />
      </div>
    </PageLayout>
  );
}

export default SavingAndBorrowing;
