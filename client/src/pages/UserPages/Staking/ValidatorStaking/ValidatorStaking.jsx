import React from 'react';

import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';
import AccountStatus from './AccountStatus';
import ValidatorPool from 'components/Custom/ValidatorPool/ValidatorPool';
import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow/ButtonLinkArrow';

import { Col } from 'react-bootstrap';
import { WrapContainer } from './styles';

export default function ValidatorStaking() {
  return (
    <>
      <WrapContainer>
        <Col md={6}>
          <AccountStatus/>
        </Col>
        <Col md={6}>
          <div className="block-name">
            <span>Validator Pool</span>
            <ButtonLinkArrow
              title="Manage"
              path="/manage-staker-reward-pool"
            />
          </div>
          <ValidatorPool/>
        </Col>
        <Col md={12} style={{ paddingTop: '40px' }}>
          <ValidatorsPanel
            type="with-total"
            bottom
            widened
          />
        </Col>
      </WrapContainer>
    </>
  );
}
