import React from 'react';
import { Col } from 'react-bootstrap';

import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';
import AccountStatus from './AccountStatus';

import { WrapContainer } from './styles';
import ValidatorPool from '../../../../components/Custom/ValidatorPool/ValidatorPool';
import ButtonLinkArrow from '../../../../components/Base/Buttons/ButtonLinkArrow/ButtonLinkArrow';

export default function ValidatorStaking() {
  return (
    <>
      <WrapContainer>
        <Col xs={6}>
          <AccountStatus />
        </Col>
        <Col xs={6}>
          <ValidatorsPanel type="with-total" bottom />
        </Col>
        <Col xs={6} style={{ paddingTop: '60px' }}>
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
