import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ValidatorPool from 'components/Custom/ValidatorPool';
import RewardStats from './RewardStats';

export default function ManageStakerRewardPool() {
  return (
    <Row>
      <Col xs={12}>
        <h3 style={{ margin: '30px 0 24px' }}>Manage Staker Reward Pool</h3>
      </Col>
      <Col xs={6}>
        <ValidatorPool showTitle={true} />
      </Col>
      <Col xs={6}>
        <RewardStats />
      </Col>
    </Row>
  );
}
