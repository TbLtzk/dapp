import React, { useEffect, useState } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import { Row, Col } from 'react-bootstrap';

import RootNodePanel from 'components/Custom/RootNodePanel';
import ValidatorsPanel from 'components/Custom/ValidatorsPanel';
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
        <Col xs={6}>
          <div>
            <p>Q current Block Height: {state?.currentBlock?.number}</p>
            <UserData/>
          </div>
        </Col>
        <Col xs={6}>
          <RootNodePanel/>
        </Col>
      </Row>
      {/*<Row>*/}
      {/*  <Col xs={6}>*/}
      {/*  </Col>*/}
      {/*  <Col xs={6}>*/}
      {/*    <ValidatorsPanel/>*/}
      {/*  </Col>*/}
      {/*</Row>*/}

    </>

  );
}

export default Dashboard;

