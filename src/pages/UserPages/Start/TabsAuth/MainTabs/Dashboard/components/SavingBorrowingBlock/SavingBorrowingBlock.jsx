import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';

import CustomBlock from 'components/Base/CustomBlock';
import CardBlock from '../CardBlock';
import Handler from './handler';

import { Container, Col, Row } from 'react-bootstrap';
import { TitleNotAlign } from '../../styles';
import { remainDateTimeSince } from 'func/convertDate';
import LoadingSpinner from 'components/Base/LoadingSpinner';

function SavingBorrowingBlock() {
  const userAddress = useSelector(userAddressMetamask);
  const handler = new Handler(userAddress);

  const [totalSupply, setTotalSupply] = useState('0');
  const [systemBalance, setSystemBalance] = useState('0');
  const [savingRate, setSavingRate] = useState('0');
  const [interestRate, setInterestRate] = useState('0');

  const [timeSinceRefreshBalance, setTimeSinceRefreshBalance] = useState('0');
  const [timeSinceUnixTimestampRefreshBalance, setTimeSinceUnixTimestampRefreshBalance] = useState('0');
  const [loadingTimeSinceRefreshBalance, setLoadingTimeSinceRefreshBalance] = useState(false);

  const [timeSinceOutstandingDebt, setTimeSinceOutstandingDeb] = useState('0');
  const [timeSinceUnixTimestampOutstandingDeb, setTimeSinceUnixTimestampOutstandingDeb] = useState('0');
  const [loadingTimeSinceOutstandingDeb, setLoadingTimeSinceOutstandingDeb] = useState(false);

  useEffect(async () => {
    handler.getTotalSupply(setTotalSupply);
    handler.getSystemBalance(setSystemBalance);
    handler.getSavingRate(setSavingRate);
    handler.getInterestRate(setInterestRate);
  }, []);

  useEffect(() => {
    setTimeSinceRefreshBalance('...');
    setTimeSinceOutstandingDeb('...');
    handler.getTimeSinceRefreshBalance(setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance);
    handler.getTimeSinceOutstandingDebt(setTimeSinceOutstandingDeb, setTimeSinceUnixTimestampOutstandingDeb);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceRefreshBalance(remainDateTimeSince(timeSinceUnixTimestampRefreshBalance));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [timeSinceUnixTimestampRefreshBalance]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceOutstandingDeb(remainDateTimeSince(timeSinceUnixTimestampOutstandingDeb));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [timeSinceUnixTimestampOutstandingDeb]);

  const onRefresh = useCallback((type) => {
    switch (type) {
      case 'of-balance':
        handler.refreshTimeSinceRefreshBalance(setTimeSinceRefreshBalance, setLoadingTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance);
        break;
      case 'of-outstanding-debt':
        handler.refreshTimeSinceOutstandingDebt(setTimeSinceOutstandingDeb, setLoadingTimeSinceOutstandingDeb, setTimeSinceUnixTimestampOutstandingDeb);
        break;
    }
  }, []);

  const dataArr = useMemo(() => {
    return [
      {
        title: 'QUSD Contract',
        firstContent: contractsToAddresses.StableCoinQUSD,
        btnTitle: null,
      },
      {
        title: 'QUSD Saving Reward (p.a.)',
        firstContent: savingRate + ' %',
        btnTitle: null,
      },
      {
        title: 'QUSD - QBTC Borrowing Fee (p.a.)',
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
        firstContent: timeSinceRefreshBalance,
        btnTitle: 'Refresh',
        btnType: 'of-balance'
      },
      {
        title: 'QUSD - QBTC Time since refresh of outstanding debt',
        firstContent: timeSinceOutstandingDebt,
        btnTitle: 'Refresh',
        btnType: 'of-outstanding-debt'
      },
    ];
  }, [totalSupply, systemBalance, savingRate, interestRate,
    timeSinceRefreshBalance, timeSinceOutstandingDebt]);

  const showBtnTitle = (title, type) => {
    switch (type) {
      case 'of-balance':
        if (loadingTimeSinceRefreshBalance) {
          return <LoadingSpinner/>;
        } else {
          return title;
        }
      case 'of-outstanding-debt':
        if (loadingTimeSinceOutstandingDeb) {
          return <LoadingSpinner/>;
        } else {
          return title;
        }
      default:
        return title;
    }
  };

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
                  btnTitle={showBtnTitle(el.btnTitle, el.btnType)}
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

