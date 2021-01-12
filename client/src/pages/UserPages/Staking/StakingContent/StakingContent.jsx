import React from 'react';
import { Col } from 'react-bootstrap';

import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';
import FormStaking from 'pages/UserPages/Staking/FormStaking';
import ValidatorPool from 'components/Custom/ValidatorPool';
import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow';

import { WrapContainer } from './styles';

export default function StakingContent() {
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
      <WrapContainer style={{ paddingTop: '60px' }}>
        <Col xs={6}>
          <div className="block-name">
            <span>Validator Pool</span>
            <ButtonLinkArrow
              title="Manage"
              path="/manage-staker-reward-pool"
            />
          </div>
          <ValidatorPool />
        </Col>
      </WrapContainer>
    </>
  );
}
