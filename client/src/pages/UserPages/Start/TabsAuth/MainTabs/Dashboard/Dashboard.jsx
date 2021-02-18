import React, { useEffect, lazy, Suspense } from 'react';

// import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';
// import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';
// import DefiMembersPanel from 'components/Custom/MembersPanel/DefiMembersPanel';
// import QFeesMembersPanel from 'components/Custom/MembersPanel/QFeesMembersPanel';
import InfBlock from './components/InfBlockUp';
import TokenomicsBlock from './components/TokenomicsBlock';
import SavingBorrowingBlock from './components/SavingBorrowingBlock';
import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import { Row, Col } from 'react-bootstrap';
import { WrapContainer, WrapTab } from './styles';

const DefiMembersPanel = lazy(() => import('components/Custom/MembersPanel/DefiMembersPanel'));
const QFeesMembersPanel = lazy(() => import('components/Custom/MembersPanel/QFeesMembersPanel'));
const ValidatorsPanel = lazy(() => import('components/Custom/MembersPanel/ValidatorsPanel'));
const RootNodePanel = lazy(() => import('components/Custom/MembersPanel/RootNodePanel'));

function Dashboard() {
  const EPDR_ParametersContract = new EPDR_Parameters();

  useEffect(async () => {
    console.log('EPDR_ParametersContract', EPDR_ParametersContract);
    const getAddrKeys = await EPDR_ParametersContract.getAddrKeys();
    const getUintKeys = await EPDR_ParametersContract.getUintKeys();
    const getStringKeys = await EPDR_ParametersContract.getStringKeys();
    const getBytesKeys = await EPDR_ParametersContract.getBytesKeys();
    const getBoolKeys = await EPDR_ParametersContract.getBoolKeys();
    console.log('getAddrKeys', getAddrKeys);
    console.log('getUintKeys', getUintKeys);
    console.log('getStringKeys', getStringKeys);
    console.log('getBytesKeys', getBytesKeys);
    console.log('getBoolKeys', getBoolKeys);
    const getAddrGovernedEpdrQbtcQusdOracle = await EPDR_ParametersContract.getAddr('governed.EPDR.QBTC_QUSD_oracle');
    const getAddrGovernedEpdrQbtcAddress = await EPDR_ParametersContract.getAddr('governed.EPDR.QBTC_address');
    console.log('getAddrGovernedEpdrQbtcQusdOracle', getAddrGovernedEpdrQbtcQusdOracle);
    console.log('getAddrGovernedEpdrQbtcAddress', getAddrGovernedEpdrQbtcAddress);
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
            <Suspense fallback={<LoadingSpinner/>}>
              <RootNodePanel/>
            </Suspense>
          </Col>
          <Col md={12}>
            <WrapContainer>
              <Suspense fallback={<LoadingSpinner/>}>
                <ValidatorsPanel/>
              </Suspense>
            </WrapContainer>
          </Col>
          <Col md={12}>
            <WrapContainer>
              <Suspense fallback={<LoadingSpinner/>}>
                <DefiMembersPanel/>
              </Suspense>
            </WrapContainer>
          </Col>
          <Col md={12}>
            <WrapContainer>
              <Suspense fallback={<LoadingSpinner/>}>
                <QFeesMembersPanel/>
              </Suspense>
            </WrapContainer>
          </Col>
        </Row>
      </Col>
    </WrapTab>
  );
}

export default Dashboard;

