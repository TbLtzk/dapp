import React, { useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { WrapContainer } from './styles';
import { useHistory } from 'react-router-dom';
import { WrapBtn, WrapTabs } from '../../QGovernance/styles';
import Liquidation from './MainTabs/Liquidation';
import SystemDebt from './MainTabs/SystemDebt';
import SystemSurplus from './MainTabs/SystemSurplus';

import ButtonTabs from 'components/Base/Tabs/ButtonTabs';
import Button from 'components/Base/Buttons/Button';
import CreateAuctionBtn from './components/CreateAuctionBtn';
import Stats from 'components/Custom/PageLists/Stats';
import TabContent from './components/TabContent';
import References from 'components/Custom/PageLists/References';

export default function DecentralizedAuctions() {
  const history = useHistory();

  const [activeTab, setActiveTab] = useState("liquidation");

  const statsData = useMemo(() => {
    return (
      [
        {
          title: 'Available Q Balance',
          value: '4563Q',
        },
        {
          title: 'Q Balance in PiggyBank',
          value: '4563Q',
        },
        {
          title: 'QUSD Balance',
          value: '4563 QUSD',
        },
      ]
    );
  }, []);

  const tabsItems = useMemo(() => {
    return (
      [
        {
          label: 'liquidation',
          title: 'Liquidation',
          content: (
            <WrapTabs>
              <TabContent activeTab={activeTab}/>
              {/*<Liquidation/>*/}
            </WrapTabs>
          )
        },
        {
          label: 'system-debt',
          title: 'System Debt',
          content: (
            <WrapTabs>
              <TabContent activeTab={activeTab}/>
              {/*<SystemDebt/>*/}
            </WrapTabs>
          )
        },
        {
          label: 'system-surplus',
          title: 'System Surplus',
          content: (
            <WrapTabs>
              <TabContent activeTab={activeTab}/>
              {/*<SystemSurplus/>*/}
            </WrapTabs>
          )
        },
      ]
    );
  }, [activeTab]);



  return (
    <Row>
      <Col md={8}>
        <ButtonTabs
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
                  numberOfProposals: 0
                }
              });
            }}
          />
        </WrapBtn>
      </Col>
      <Col md={4}>
        <CreateAuctionBtn activeTab={activeTab}/>
        <Stats statsData={statsData} type="Auction"/>
        <References type="auction"/>
      </Col>
    </Row>
  );
}
