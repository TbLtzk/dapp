import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ManageBalance from './ManageBalance';
import LockCoin from './LockCoin';
import Panel from './Panel/Panel';

function PiggyBank() {
  return (
    <Row>
      <Col xs={12}>
        <Panel />
      </Col>
      <Col xs={12}>
        <h3 style={{ marginBottom: '24px' }}>PiggyBank</h3>
      </Col>
      <Col xs={6}>
        <ManageBalance />
      </Col>
      <Col xs={6}>
        <LockCoin />
      </Col>
    </Row>
  );
}

export default PiggyBank;
