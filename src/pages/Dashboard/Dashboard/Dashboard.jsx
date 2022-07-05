import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from 'ui/Button';

import PageWrap from 'components/Base/PageWrap';
import DefiMembersPanel from 'components/Custom/Tables/DeFiMembersTable';
import EprsMembersPanel from 'components/Custom/Tables/EprsMembersTable';
import QFeesMembersPanel from 'components/Custom/Tables/QFeesMembersTable';
import RootNodeTable from 'components/Custom/Tables/RootNodeTable';
import ValidatorsTable from 'components/Custom/Tables/ValidatorsTable';

import InfBlock from './components/InfBlockUp';
import SavingBorrowingBlock from './components/SavingBorrowingBlock';
import TokenomicsBlock from './components/TokenomicsBlock';

function Dashboard () {
  const { t } = useTranslation();

  const infoBlock = <InfBlock />;
  const tokenomiks = <TokenomicsBlock />;
  const savingAndBorrowing = <SavingBorrowingBlock />;

  const rootAndValidatorsPanels = (
    <>
      <RootNodeTable tableType="rootNodesShort" />
      <ValidatorsTable
        tableType="validators-short"
        buttons={
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <Link to="/validator-staking">
              <Button
                compact
                alwaysEnabled
                look="secondary"
              >
                <i className="mdi mdi-arrow-right" />
                <span>{t('SEE_MORE_DETAILS')}</span>
              </Button>
            </Link>
            <Link to="/monitoring">
              <Button
                compact
                alwaysEnabled
                look="secondary"
              >
                <i className="mdi mdi-arrow-right" />
                <span>{t('MONITORING')}</span>
              </Button>
            </Link>
          </div>
        }
      />
    </>
  );

  const defiAndQFeesPanels = (
    <>
      <DefiMembersPanel />
      <QFeesMembersPanel />
      <EprsMembersPanel />
    </>
  );

  return (
    <PageWrap
      pageHeader={t('DASHBOARD')}
      pageButton={
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to="/monitoring">
            <Button alwaysEnabled look="secondary">
              {t('MONITORING')}
            </Button>
          </Link>

          <Link to="/q-parameters">
            <Button alwaysEnabled look="secondary">
              {t('Q_PARAMETERS')}
            </Button>
          </Link>
        </div>
      }
    >
      <div className="content__colm-1">
        {infoBlock}
        {rootAndValidatorsPanels}
        {tokenomiks}
        {rootAndValidatorsPanels}
        {defiAndQFeesPanels}
      </div>
      <div className="content__colm-2">
        <div>
          {infoBlock}
          {tokenomiks}
          {savingAndBorrowing}
        </div>
        <div>
          {rootAndValidatorsPanels}
          {defiAndQFeesPanels}
        </div>
      </div>
    </PageWrap>
  );
}

export default Dashboard;
