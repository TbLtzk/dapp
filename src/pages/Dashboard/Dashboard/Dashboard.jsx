import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from 'ui/Button';

import PageWrap from 'components/Base/PageWrap';
import DefiMembersPanel from 'components/Custom/Tables/DeFiMembersTable';
import EprsMembersPanel from 'components/Custom/Tables/EprsMembersTable';
import QFeesMembersPanel from 'components/Custom/Tables/QFeesMembersTable';

import InfBlock from './components/InfBlockUp';
import RootNodesBlock from './components/RootNodesBlock';
import SavingBorrowingBlock from './components/SavingBorrowingBlock';
import TokenomicsBlock from './components/TokenomicsBlock';
import ValidatorsBlock from './components/ValidatorsBlock';
import { DashboardContent } from './styles';

function Dashboard () {
  const { t } = useTranslation();

  return (
    <PageWrap
      pageHeader={t('DASHBOARD')}
      pageButton={
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to="/monitoring">
            <Button
              block
              alwaysEnabled
              look="secondary"
            >
              <i className="mdi mdi-monitor-dashboard" />
              <span>{t('MONITORING')}</span>
            </Button>
          </Link>

          <Link to="/q-parameters">
            <Button
              block
              alwaysEnabled
              look="secondary"
            >
              <i className="mdi mdi-text-box-search" />
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
    </PageWrap>
  );
}

export default Dashboard;
