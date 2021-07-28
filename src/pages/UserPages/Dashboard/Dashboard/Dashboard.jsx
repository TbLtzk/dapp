import React from 'react';
import { useSelector } from 'react-redux';

import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';
import DefiMembersPanel from 'components/Custom/MembersPanel/DefiMembersPanel';
import QFeesMembersPanel from 'components/Custom/MembersPanel/QFeesMembersPanel';

import InfBlock from './components/InfBlockUp';
import TokenomicsBlock from './components/TokenomicsBlock';
import SavingBorrowingBlock from './components/SavingBorrowingBlock';
import Button from 'components/Base/Buttons/Button';
import PageWrap from 'components/Base/PageWrap';

import { Link } from 'react-router-dom';

import { mode } from 'store/selectors/dashboardMode';
import { MODE } from 'components/Base/DashboardMode/DashboarModeButton';

function Dashboard() {
  const appMode = useSelector(mode)
  return (
    <PageWrap
      wrapContentClasses={'wrap-content__tow-colm'}
      headerTitle={'Dashboard'}
      headerExtra={appMode === MODE.advanced
        ? (
        <Link to={'/q-parameters'}>
          <Button
            type={'white'}
            title={'Q Parameters'}
            handleButton={() => {
            }}
          />
          </Link>
        )
        : null
      }
    >
      <div>
        <InfBlock/>
        {appMode ===  MODE.advanced ? <TokenomicsBlock/> : null}
        <SavingBorrowingBlock />
      </div>
      <div>
        <RootNodePanel/>
        <ValidatorsPanel/>
        {appMode ===  MODE.advanced ? <DefiMembersPanel /> : null}
        {appMode ===  MODE.advanced ? <QFeesMembersPanel /> : null}
      </div>
    </PageWrap>
  );
}

export default Dashboard;

