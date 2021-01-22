import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CustomBlock from 'components/Base/CustomBlock';
import UpdateDelegation from './UpdateDelegation';

export default function DelegateStakingPower() {
  return (
    <CustomBlock style={{ height: '100%' }}>
      <Row>
        <Col xs={6}>
          <p>Your current delegations</p>
          <p>0x7B33eA70253c33E048A31b53BFbf90A0b456B6D3</p>
          <p>0x99aE671Ae4cCc0aE290128216B5453d6fee797f0</p>
        </Col>
        <Col xs={6}>
          <UpdateDelegation />
        </Col>
      </Row>
    </CustomBlock>
  );
}
