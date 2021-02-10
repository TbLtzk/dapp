import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSymbol } from 'store/actions/action-creaters/stable-coin';
import { getSurplus, getDebt, getSystemBalance } from 'store/actions/action-creaters/system-balance';
import { getAvailableAmount, } from 'store/actions/action-creaters/system-reserve';
import { surplusSB, systemBalanceSB, debtSB } from 'store/selectors/system-balance';
import { availableAmountSR } from 'store/selectors/system-reserve';

import ButtonsGroupTabs from 'components/Base/Tabs/ButtonsGroupTabs';
import Button from 'components/Base/Buttons/Button';
import CreateAuctionBtn from './components/CreateAuctionBtn';
import Stats from 'components/Custom/PageLists/Stats';
import SystemCard from 'components/Custom/PageLists/SystemCard';
import TabContent from './components/TabContent';
import References from 'components/Custom/PageLists/References';

import { Col, Row, Container } from 'react-bootstrap';
import { WrapBtn, WrapTabs } from 'components/Custom/PageLists/styles';
import { fN } from 'func/useful';

export default function DecentralizedAuctions() {
  const history = useHistory();
  const dispatch = useDispatch();

  const surplus = fN(useSelector(surplusSB));
  const debt = fN(useSelector(debtSB));
  const systemBalanceResult = fN(useSelector(systemBalanceSB));
  const availableAmount = fN(useSelector(availableAmountSR));

  useEffect(() => {
    dispatch(getSymbol());
    dispatch(getSurplus());
    dispatch(getDebt());
    dispatch(getSystemBalance());
    dispatch(getAvailableAmount());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState('liquidation');

  const statsData = useMemo(() => {
    return (
      [
        {
          title: 'Available Q Balance',
          value: '4563 Q',
        },
        {
          title: 'Q Balance in PiggyBank',
          value: '4563 Q',
        },
        {
          title: 'QUSD Balance',
          value: '4563 QUSD',
        },
      ]
    );
  }, []);

  const systemBalance = useMemo(() => {
    return (
      [
        {
          title: 'Collected Surplus',
          value: surplus + ' QUSD',
        },
        {
          title: 'Open Debt',
          value: debt + ' QUSD',
        },
        {
          title: 'Balance',
          value: systemBalanceResult + ' QUSD',
        },
      ]
    );
  }, [surplus, debt, systemBalanceResult]);

  const systemReserve = useMemo(() => {
    return (
      [
        {
          title: 'Reserve Amount',
          value: availableAmount + ' Q',
        },
      ]
    );
  }, [availableAmount]);

  const tabsItems = useMemo(() => {
    return (
      [
        {
          label: 'liquidation',
          title: 'Liquidation',
          content: (
            <WrapTabs>
              <TabContent activeTab={activeTab}/>
            </WrapTabs>
          )
        },
        {
          label: 'system-debt',
          title: 'System Debt',
        },
        {
          label: 'system-surplus',
          title: 'System Surplus',
        },
      ]
    );
  }, [activeTab]);

  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <ButtonsGroupTabs
            tabsItems={tabsItems}
            tabsHandler={(key) => {
              setActiveTab(key);
            }}
          />
          <WrapBtn>
            <Button
              title="View ended auctions"
              type="white"
              width="100%"
              handleButton={() => {
                history.push({
                  pathname: '/ended-auctions',
                  state: {
                    activeTab: activeTab,
                    numberOfAuctions: 0
                  }
                });
              }}
            />
          </WrapBtn>
        </Col>
        <Col md={4}>
          <CreateAuctionBtn activeTab={activeTab}/>
          <Stats statsData={statsData} type="Auction"/>
          <SystemCard data={systemBalance} title={'QUSD System Balance'}/>
          <SystemCard data={systemReserve} title={'Q System Reserve'}/>
          <References type="auction"/>
        </Col>
      </Row>
    </Container>
  );
}
