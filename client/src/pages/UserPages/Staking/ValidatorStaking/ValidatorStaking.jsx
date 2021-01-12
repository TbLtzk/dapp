import React from 'react';
import { Col } from 'react-bootstrap';

import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';

import { WrapContainer } from './styles';

export default function ValidatorStaking() {
  return (
    <>
      <WrapContainer>
        <Col xs={6}>
          <p>Validator Staking</p>
        </Col>
        <Col xs={6}>
          <ValidatorsPanel type="with-total" bottom />
        </Col>
      </WrapContainer>
    </>
  );
}
