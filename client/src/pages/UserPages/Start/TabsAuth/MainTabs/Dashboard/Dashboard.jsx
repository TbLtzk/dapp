import React, { useEffect, useState } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';
import CustomBlock from 'components/Base/CustomBlock';
import InfBlock from './components/InfBlockUp';
import TokenomicsBlock from './components/TokenomicsBlock';
import SavingBorrowingBlock from './components/SavingBorrowingBlock';

import { Row, Col } from 'react-bootstrap';
import { WrapContainer, Title, BlockAlign, WrapTab } from './styles';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function Dashboard() {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  return (
    <>
      <WrapTab>
        <Col md={6}>
          <InfBlock/>
        </Col>
        <Col md={6}>
          <RootNodePanel/>
        </Col>
      </WrapTab>
      <Row>
        <Col md={6}>
          <TokenomicsBlock/>
          <SavingBorrowingBlock/>
        </Col>
        <Col md={6}>
          <WrapContainer>
            <ValidatorsPanel/>
          </WrapContainer>
        </Col>
      </Row>
    </>

  );
}

export default Dashboard;

