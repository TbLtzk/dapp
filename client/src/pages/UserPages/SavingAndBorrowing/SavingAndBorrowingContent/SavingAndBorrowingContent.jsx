import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BorrowingCoreQUSD } from 'contracts/BorrowingCore';
import { userAddressMetamask } from 'store/selectors/user-inf';
import Button from 'components/Base/Buttons/Button';
import InfoBlocks from '../InfoBlocks';
import SavingCard from '../SavingCard';
import BorrowCard from '../BorrowCard';
import SavingBlock from '../SavingBlock';
import BorrowBlock from '../BorrowBlock';

import { ContainerSB } from '../styles';
import PageWrap from 'components/Base/PageWrap';
import { useHistory } from 'react-router-dom';

export default function SavingAndBorrowingContent() {
  const [actCardData, setActCardData] = useState({ type: 1 });
  const history = useHistory();
  const address = useSelector(userAddressMetamask);

  const createVault = (collateral) => {
    const contract = new BorrowingCoreQUSD();
    contract.createVault(address, collateral)
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <PageWrap>
      <Row>
        <Col md={6}>
          <h3 style={{ margin: '0px 0 36px' }}>Decentralized Saving and Borrowing</h3>
        </Col>
        <Col md={6} style={{textAlign: 'right'}}>
            <Button
              title="Go to Decentralized auctions"
              width="30%"
              handleButton={() => {
                // console.log('click');
                history.push('decentralized-auctions');
              }}
            />
        </Col>
      </Row>
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
              <Button
                type="outline"
                title="Create QETH vault"
                width="100%"
                handleButton={() => createVault('QETH')}
              />
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
    </PageWrap>
  );
}
