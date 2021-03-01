import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore';
import { userAddressMetamask } from 'store/selectors/user-inf';

import Button from 'components/Base/Buttons/Button';
import InfoBlocks from '../components/InfoBlocks';
import SavingCard from '../components/SavingCard';
import BorrowCard from '../components/BorrowCard';
import SavingBlock from '../components/SavingBlock';
import BorrowBlock from '../components/BorrowBlock';

import { Row, Col } from 'react-bootstrap';
import { ContainerSB } from '../styles';

export default function SavingAndBorrowingContent() {
  const [actCardData, setActCardData] = useState({ type: 1 });
  const address = useSelector(userAddressMetamask);

  const createVault = (collateral) => {
    const contract = new BorrowingCoreQUSD();
    contract.createVault(address, collateral)
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <ContainerSB>
        <Col xs={12} className="col-container">
          <Row>
            <InfoBlocks/>
          </Row>
          <Row style={{ marginBottom: '24px' }}>
            <SavingCard setActCardData={setActCardData}/>
          </Row>
          <Row>
            <BorrowCard setActCardData={setActCardData}/>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col xs={6}> </Col>
            <Col xs={3}>
              {/*<Button*/}
              {/*  type="outline"*/}
              {/*  title="Create QETH vault"*/}
              {/*  width="100%"*/}
              {/*  handleButton={() => createVault('QETH')}*/}
              {/*/>*/}
            </Col>
            <Col xs={3}>
              <Button
                type="outline"
                title="Create QBTC vault"
                width="100%"
                handleButton={() => createVault('QBTC')}
              />
            </Col>

          </Row>
        </Col>
        <Col xs={4} className="col-info-container saving">
          <SavingBlock actCardData={actCardData}/>
        </Col>
        <Col xs={4} className="col-info-container borrow">
          <BorrowBlock actCardData={actCardData}/>
        </Col>
      </ContainerSB>
    </>
  );
}
