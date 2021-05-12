import React from 'react';

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

function Dashboard() {
  return (
    <PageWrap
      wrapContentClasses={'wrap-content__tow-colm'}
      headerTitle={'Dashboard'}
      headerExtra={(
        <Link to={'/q-parameters'}>
          <Button
            type={'white'}
            title={'Q Parameters'}
            handleButton={() => {
            }}
          />
        </Link>
      )}
    >
      <div>
        <InfBlock/>
        <TokenomicsBlock/>
        <SavingBorrowingBlock/>
      </div>
      <div>
        <RootNodePanel/>
        <ValidatorsPanel/>
        <DefiMembersPanel/>
        <QFeesMembersPanel/>
      </div>
    </PageWrap>
  );
}

export default Dashboard;

