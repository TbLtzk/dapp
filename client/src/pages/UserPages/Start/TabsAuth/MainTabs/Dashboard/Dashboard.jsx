import React, { useEffect, useState } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import { Row, Col } from 'react-bootstrap';

import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';
import UserData from 'components/Custom/UserData';
import { roundBalance } from 'func/balance';

import { WrapContainer } from './styles';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function Dashboard() {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  return (
    <>
      <Row>
        <Col md={6}>
          <div>
            <p>Q current Block Height: {state?.currentBlock?.number}</p>
            <UserData/>
          </div>
        </Col>
        <Col md={6}>
          <RootNodePanel/>
        </Col>
      </Row>
      <Row>
        <Col md={6}>

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

