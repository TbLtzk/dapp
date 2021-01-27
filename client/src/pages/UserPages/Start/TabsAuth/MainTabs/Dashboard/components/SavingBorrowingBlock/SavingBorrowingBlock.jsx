import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';

import CustomBlock from 'components/Base/CustomBlock';
import CardBlock from '../CardBlock';
import Handler from './handler';

import { Container, Col, Row } from 'react-bootstrap';
import { TitleNotAlign } from '../../styles';

const { useDrizzle } = drizzleReactHooks;

function SavingBorrowingBlock() {
  const { drizzle } = useDrizzle();
  const handler = new Handler(drizzle);

  const [totalSupply, setTotalSupply] = useState('0');
  const [systemBalance, setSystemBalance] = useState('0');
  const [savingRate, setSavingRate] = useState('0');
  const [interestRate, setInterestRate] = useState('0');


  useEffect(async () => {
    handler.getTotalSupply(setTotalSupply);
    handler.getSystemBalance(setSystemBalance);
    handler.getSavingRate(setSavingRate);
    handler.getSavingRate(setInterestRate);
  }, []);

  const onRefresh = useCallback((type) => {
    console.log('onRefresh', type);
  }, []);

  const dataArr = useMemo(() => {
    return [
      {
        title: 'QUSD Contract',
        firstContent: contractsToAddresses.StableCoinQUSD,
        btnTitle: null,
      },
      {
        title: 'QUSD Saving Rate (p a.)',
        firstContent: savingRate + ' %',
        btnTitle: null,
      },
      {
        title: 'QUSD - QBTC Borrowing interest Rate (p a.)',
        firstContent: interestRate + ' %',
        btnTitle: null,
      },
      {
        title: 'QUSD System Balance',
        firstContent: systemBalance + ' QUSD',
        btnTitle: null,
      },
      {
        title: 'QUSD Total Supply',
        firstContent: totalSupply + ' QUSD',
        btnTitle: null,
      },
      {
        title: 'QUSD Saving time since refresh of balance',
        firstContent: '0d 1h 34m',
        btnTitle: 'Refresh',
        btnType: 'of-balance'
      },
      {
        title: 'QUSD - QBTC Time since refresh of outstanding debt',
        firstContent: '0d 1h 34m',
        btnTitle: 'Refresh',
        btnType: 'of-outstanding-debt'
      },
    ];
  }, [totalSupply, systemBalance, savingRate, interestRate]);

  return (
    <CustomBlock style={{
      padding: '14px 10px',
      width: '100%',
      marginTop: '20px'
    }}>
      <Container fluid>
        <Row>
          <Col md={12}>
            <TitleNotAlign>Saving and Borrowing</TitleNotAlign>
          </Col>
          {
            dataArr?.map((el) => {
              return (
                <CardBlock
                  key={el.title.replace(' ', '-')}
                  title={el.title}
                  firstContent={el.firstContent}
                  btnTitle={el.btnTitle}
                  btnHandler={!el.btnTitle ? null : () => {
                    onRefresh(el.btnType);
                  }}
                />
              );
            })
          }
        </Row>
      </Container>
    </CustomBlock>

  );
}

export default SavingBorrowingBlock;

