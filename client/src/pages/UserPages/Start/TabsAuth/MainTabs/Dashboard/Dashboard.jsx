import React, { useEffect, useState } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';

import { Row, Col } from 'react-bootstrap';

import RootNodePanel from 'components/Custom/MembersPanel/RootNodePanel';
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';
import CustomBlock from 'components/Base/CustomBlock';

import { WrapContainer, Title, BlockAlign, WrapTab } from './styles';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function Dashboard() {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  console.log('contractsToAddresses', contractsToAddresses);

  return (
    <>
      <WrapTab>
        <Col md={6}>
          <Row>
            <Col md={4} className="d-flex align-items-stretch">
              <CustomBlock style={{ padding: "14px 8px"}}>
                <Title>Blockchain</Title>
                <div>
                  <BlockAlign>
                    <p>Block Height</p>
                    <p> {state?.currentBlock?.number}</p>
                  </BlockAlign>
                  <BlockAlign>
                    <p>System Contract Registry: </p>
                    <p>
                      <span>{contractsToAddresses.ContractRegistry.slice(0, 14)} </span>
                      <span>{contractsToAddresses.ContractRegistry.slice(14, 28)} </span>
                      <span>{contractsToAddresses.ContractRegistry.slice(28)} </span>
                    </p>
                  </BlockAlign>
                </div>
              </CustomBlock>
            </Col>
            <Col md={4} className="d-flex align-items-stretch">
              <CustomBlock style={{ padding: "14px 8px"}}>
                <Title>Constitution</Title>
                <BlockAlign>
                  <p>Hash: </p>
                  <p>
                    <span>{contractsToAddresses.ContractRegistry.slice(0, 14)} </span>
                    <span>{contractsToAddresses.ContractRegistry.slice(14, 28)} </span>
                    <span>{contractsToAddresses.ContractRegistry.slice(28)} </span>
                  </p>
                </BlockAlign>
                <BlockAlign>
                  <p><a href="#" target="_blank">Download Latest</a></p>
                  <p><a href="#" target="_blank">Check archive</a></p>
                </BlockAlign>

              </CustomBlock>
            </Col>
            <Col md={4} className="d-flex align-items-stretch">
              <CustomBlock style={{ padding: "14px 8px", width: "100%"}}>
                <Title>Governance</Title>
                <BlockAlign>
                  <p>Active proposals</p>
                  <p>4</p>
                </BlockAlign>
                <BlockAlign>
                  <p>Past proposals</p>
                  <p>41</p>
                </BlockAlign>

              </CustomBlock>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <RootNodePanel/>
        </Col>
      </WrapTab>
      <Row>
        <Col md={6}>

        </Col>
        <Col md={6}>
          <WrapContainer>
            <ValidatorsPanel/>
          </WrapContainer>
        </Col>
      </Row>
    </>

  );
}

export default Dashboard;

