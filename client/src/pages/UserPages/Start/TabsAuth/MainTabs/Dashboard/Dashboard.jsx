import React from 'react';

import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';
import InfBlock from './components/InfBlockUp';
import TokenomicsBlock from './components/TokenomicsBlock';
import SavingBorrowingBlock from './components/SavingBorrowingBlock';

import { Row, Col } from 'react-bootstrap';
import { WrapContainer, Title, BlockAlign, WrapTab } from './styles';

function Dashboard() {

  return (
    <WrapTab>
      <Col md={6}>
        <Row>
          <Col md={12}>
            <InfBlock/>
          </Col>
          <Col md={12}>
            <TokenomicsBlock/>
          </Col>
          <Col md={12}>
            <SavingBorrowingBlock/>
          </Col>
        </Row>
      </Col>
      <Col md={6}>
        <Row>
          <Col md={12}>
            <RootNodePanel/>
          </Col>
          <Col md={12}>
            <WrapContainer>
              <ValidatorsPanel/>
            </WrapContainer>
          </Col>
        </Row>
      </Col>
    </WrapTab>
  );
}

export default Dashboard;

