import React from 'react';
import { Col } from 'react-bootstrap';
import { BlockInfo } from './styles';

export default function InfoBlocks() {
  return (
    <>
      <Col xs={4}>
        <BlockInfo xs={3}>
          <p className="info">
            Total
            <br />
            Saving balance
          </p>
          <p className="value">1345.48 USD</p>
        </BlockInfo>
      </Col>
      <Col xs={4}>
        <BlockInfo xs={3}>
          <p className="info">
            Outstanding
            <br />
            Debt
          </p>
          <p className="value">12.500 USD</p>
        </BlockInfo>
      </Col>
      <Col xs={4}>
        <BlockInfo xs={3}>
          <p className="info">
            Total
            <br />
            Collateral locked
          </p>
          <p className="value">30.000 USD</p>
        </BlockInfo>
      </Col>
    </>
  );
}
