import React from 'react';
import { Col } from 'react-bootstrap';

import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';
import FormStaking from 'pages/UserPages/Staking/FormStaking';

import { WrapContainer } from './styles';

export default function RootNodeStakingContent() {
  return (
    <>
      <WrapContainer>
        <Col xs={6}>
          <FormStaking />
        </Col>
        <Col xs={6}>
          <RootNodePanel type="with-total" bottom />
        </Col>
      </WrapContainer>
    </>
  );
}
