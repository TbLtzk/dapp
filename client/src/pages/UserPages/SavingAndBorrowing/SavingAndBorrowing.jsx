import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BorrowingCoreQUSD } from 'contracts/BorrowingCore';
import { userAddressMetamask } from 'store/selectors/user-inf';
import Button from 'components/Base/Buttons/Button';
import InfoBlocks from './InfoBlocks';
import SavingCard from './SavingCard';
import BorrowCard from './BorrowCard';
import SavingBlock from './SavingBlock';
import BorrowBlock from './BorrowBlock';

import { ContainerSB } from './styles';

export default function SavingAndBorrowing() {
  const [actCardData, setActCardData] = useState({ type: 1 });

  const address = useSelector(userAddressMetamask);

  const createVault = (collateral) => {
    const contract = new BorrowingCoreQUSD();
    contract.createVault(address, collateral).then((data) => {
      console.log(data);
    });
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <h3 style={{ margin: '30px 0 36px' }}>Decentralized Saving and Borrowing</h3>
        </Col>
      </Row>
      <ContainerSB>
        <Col xs={12} className="col-container">
          <Row>
            <InfoBlocks />
          </Row>
          <Row style={{ marginBottom: '24px' }}>
            <SavingCard setActCardData={setActCardData} />
          </Row>
          <Row>
            <BorrowCard setActCardData={setActCardData} />
          </Row>
          <Button
            type="outline"
            title="Create QETH vault"
            width="auto"
            handleButton={() => createVault('QETH')}
          />
          <Button
            type="outline"
            title="Create QBTC vault"
            width="auto"
            handleButton={() => createVault('QBTC')}
          />
        </Col>
        <Col xs={4} className="col-info-container saving">
          <SavingBlock actCardData={actCardData} />
        </Col>
        <Col xs={4} className="col-info-container borrow">
          <BorrowBlock actCardData={actCardData} />
        </Col>
      </ContainerSB>
    </>
  );
}
