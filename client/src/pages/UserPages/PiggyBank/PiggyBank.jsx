import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import ManageBalance from './ManageBalance';
import LockCoin from './LockCoin';
import Panel from './Panel/Panel';
import DelegateStakingPower from './DelegateStakingPower';
import PageWrap from 'components/Base/PageWrap';

import validateContractsAddress from 'contracts/config/cotracts-address-checker';

function PiggyBank() {
  useEffect(async () => {
    const res = await validateContractsAddress();
    // console.log('Result', res);
  });

  return (
    <PageWrap>
      <Row>
        <Col xs={12}>
          <Panel/>
        </Col>
        <Col xs={12}>
          <h3 style={{ marginBottom: '24px' }}>PiggyBank</h3>
        </Col>
        <Col xs={6}>
          <ManageBalance/>
        </Col>
        <Col xs={6}>
          <LockCoin/>
        </Col>
        <Col xs={12}>
          <h3 style={{ margin: '37px 0 24px 0' }}>Delegate Staking Power</h3>
        </Col>
        <Col xs={12}>
          <DelegateStakingPower/>
        </Col>
      </Row>
    </PageWrap>
  );
}

export default PiggyBank;
