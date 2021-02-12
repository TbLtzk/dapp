import React, { useEffect } from 'react';

import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';
import InfBlock from './components/InfBlockUp';
import TokenomicsBlock from './components/TokenomicsBlock';
import SavingBorrowingBlock from './components/SavingBorrowingBlock';
import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters';

import { Row, Col } from 'react-bootstrap';
import { WrapContainer, Title, BlockAlign, WrapTab } from './styles';

function Dashboard() {
  const EPDR_ParametersContract = new EPDR_Parameters();

  useEffect(async () => {
    console.log("EPDR_ParametersContract", EPDR_ParametersContract);
      const getAddrKeys = await EPDR_ParametersContract.getAddrKeys();
      const getUintKeys = await EPDR_ParametersContract.getUintKeys();
      const getStringKeys = await EPDR_ParametersContract.getStringKeys();
      const getBytesKeys = await EPDR_ParametersContract.getBytesKeys();
      const getBoolKeys = await EPDR_ParametersContract.getBoolKeys();
      console.log("getAddrKeys", getAddrKeys);
      console.log("getUintKeys", getUintKeys);
      console.log("getStringKeys", getStringKeys);
      console.log("getBytesKeys", getBytesKeys);
      console.log("getBoolKeys", getBoolKeys);
      const getAddrGovernedEpdrQbtcQusdOracle = await EPDR_ParametersContract.getAddr("governed.EPDR.QBTC_QUSD_oracle");
      const getAddrGovernedEpdrQbtcAddress = await EPDR_ParametersContract.getAddr("governed.EPDR.QBTC_address");
      console.log("getAddrGovernedEpdrQbtcQusdOracle", getAddrGovernedEpdrQbtcQusdOracle);
      console.log("getAddrGovernedEpdrQbtcAddress", getAddrGovernedEpdrQbtcAddress);
  },[EPDR_ParametersContract]);

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

