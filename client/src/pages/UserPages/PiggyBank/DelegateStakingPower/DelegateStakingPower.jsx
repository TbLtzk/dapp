import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CustomBlock from 'components/Base/CustomBlock';
import UpdateDelegation from './UpdateDelegation';
import DelegatedValidatorsPanel from 'components/Custom/MembersPanel/DelegatedValidatorsPanel';

export default function DelegateStakingPower() {
  return (
    <CustomBlock style={{ height: '100%' }}>
      <Row>
        <Col xs={6}>
          <DelegatedValidatorsPanel/>
        </Col>
        <Col xs={6}>
          <UpdateDelegation />
        </Col>
      </Row>
    </CustomBlock>
  );
}
