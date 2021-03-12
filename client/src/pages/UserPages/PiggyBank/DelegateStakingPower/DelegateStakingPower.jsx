import React from 'react';

import DelegatedValidatorsPanel from 'components/Custom/MembersPanel/DelegatedValidatorsPanel';
import CustomBlock from 'components/Base/CustomBlock';

import UpdateDelegation from './UpdateDelegation';
import DelegationRewards from './DelegationRewards';

import { Row, Col } from 'react-bootstrap';

export default function DelegateStakingPower() {
  return (
    <CustomBlock style={{ height: '100%' }}>
      <Row>
        <Col xs={6}>
          <DelegatedValidatorsPanel/>
        </Col>
        <Col xs={6}>
          <DelegationRewards/>
          <UpdateDelegation/>
        </Col>
      </Row>
    </CustomBlock>
  );
}
