import React, { useEffect } from 'react';

import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';
import DefiMembersPanel from 'components/Custom/MembersPanel/DefiMembersPanel';
import QFeesMembersPanel from 'components/Custom/MembersPanel/QFeesMembersPanel';

import InfBlock from './components/InfBlockUp';
import TokenomicsBlock from './components/TokenomicsBlock';
import SavingBorrowingBlock from './components/SavingBorrowingBlock';
import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters';

import { Row, Col } from 'react-bootstrap';
import { WrapContainer, WrapTab } from './styles';

function Dashboard() {
  const EPDR_ParametersContract = new EPDR_Parameters();

  useEffect(async () => {
    // const getAddrGovernedEpdrQbtcQusdOracle = await EPDR_ParametersContract.getAddr('governed.EPDR.QBTC_QUSD_oracle');
    // const getAddrGovernedEpdrQbtcAddress = await EPDR_ParametersContract.getAddr('governed.EPDR.QBTC_address');
  }, [EPDR_ParametersContract]);

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
          <Col md={12}>
            <WrapContainer>
              <DefiMembersPanel/>
            </WrapContainer>
          </Col>
          <Col md={12}>
            <WrapContainer>
              <QFeesMembersPanel/>
            </WrapContainer>
          </Col>
        </Row>
      </Col>
    </WrapTab>
  );
}

export default Dashboard;

