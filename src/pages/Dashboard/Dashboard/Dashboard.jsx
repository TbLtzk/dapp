import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import PageWrap from 'components/Base/PageWrap';
import DefiMembersPanel from 'components/Custom/MembersPanel/DefiMembersPanel';
import EprsMembersPanel from 'components/Custom/MembersPanel/EprsMembersPanel';
import QFeesMembersPanel from 'components/Custom/MembersPanel/QFeesMembersPanel';
import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';

import InfBlock from './components/InfBlockUp';
import SavingBorrowingBlock from './components/SavingBorrowingBlock';
import TokenomicsBlock from './components/TokenomicsBlock';

import { mode } from 'store/dashboard-mode/selectors';

import { MODE } from 'constants/config';
import TABLE_TYPES from 'constants/tableTypes';

function Dashboard () {
  const appMode = useSelector(mode);
  const { t } = useTranslation();

  const advancedMode = appMode === MODE.advanced;

  const parametersButton = advancedMode
    ? (
      <Link to="/q-parameters">
        <Button alwaysEnabled look="white">
          {t('Q_PARAMETERS')}
        </Button>
      </Link>
    )
    : null;

  const infoBlock = <InfBlock />;
  const tokenomiks = advancedMode ? <TokenomicsBlock /> : null;
  const savingAndBorrowing = <SavingBorrowingBlock />;

  const rootAndValidatorsPanels = (
    <>
      <RootNodePanel tableType={TABLE_TYPES.rootNodesShort} />
      <ValidatorsPanel
        buttons={
          <div className="card__actions__between">
            <Link to="/validator-staking">
              <Button alwaysEnabled look="white">
                <i className="mdi mdi-arrow-right" />
                <span>{t('SEE_MORE_DETAILS')}</span>
              </Button>
            </Link>
            <Link to="/monitoring">
              <Button alwaysEnabled look="white">
                <i className="mdi mdi-arrow-right" />
                <span>{t('MONITORING')}</span>
              </Button>
            </Link>
          </div>
        }
        tableType={TABLE_TYPES.validatorsShort}
      />
    </>
  );

  const defiAndQFeesPanels = advancedMode
    ? (
      <>
        <DefiMembersPanel />
        <QFeesMembersPanel />
        <EprsMembersPanel />
      </>
    )
    : null;

  return (
    <PageWrap pageHeader={t('DASHBOARD')} pageButton={parametersButton}>
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
