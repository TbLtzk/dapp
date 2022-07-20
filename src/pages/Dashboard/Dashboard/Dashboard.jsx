import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import PageLayout from 'components/PageLayout';
import DefiMembersPanel from 'components/Tables/DeFiMembersTable';
import EprsMembersPanel from 'components/Tables/EprsMembersTable';
import QFeesMembersPanel from 'components/Tables/QFeesMembersTable';

import InfBlock from './components/InfBlockUp';
import RootNodesBlock from './components/RootNodesBlock';
import SavingBorrowingBlock from './components/SavingBorrowingBlock';
import TokenomicsBlock from './components/TokenomicsBlock';
import ValidatorsBlock from './components/ValidatorsBlock';
import { DashboardContent } from './styles';

function Dashboard () {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('DASHBOARD')}
      action={
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to="/monitoring">
            <Button
              block
              alwaysEnabled
              look="secondary"
            >
              <Icon name="monitor" />
              <span>{t('MONITORING')}</span>
            </Button>
          </Link>

          <Link to="/q-parameters">
            <Button
              block
              alwaysEnabled
              look="secondary"
            >
              <Icon name="list" />
              <span>{t('Q_PARAMETERS')}</span>
            </Button>
          </Link>
        </div>
      }
    >
      <DashboardContent>
        <div className="dashboard-block">
          <InfBlock />
          <TokenomicsBlock />
          <SavingBorrowingBlock />
        </div>

        <div className="dashboard-block">
          <RootNodesBlock />
          <ValidatorsBlock />
          <DefiMembersPanel />
          <QFeesMembersPanel />
          <EprsMembersPanel />
        </div>
      </DashboardContent>
    </PageLayout>
  );
}

export default Dashboard;
