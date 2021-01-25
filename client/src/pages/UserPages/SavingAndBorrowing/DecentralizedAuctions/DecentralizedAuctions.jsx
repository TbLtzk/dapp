import React, { useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';

import ButtonsGroupTabs from 'components/Base/Tabs/ButtonsGroupTabs';
import Button from 'components/Base/Buttons/Button';
import CreateAuctionBtn from './components/CreateAuctionBtn';
import Stats from 'components/Custom/PageLists/Stats';
import TabContent from './components/TabContent';
import References from 'components/Custom/PageLists/References';

import { WrapBtn, WrapTabs } from 'components/Custom/PageLists/styles';
import PageWrap from '../../../../components/Base/PageWrap';

export default function DecentralizedAuctions() {
  const history = useHistory();

  const [activeTab, setActiveTab] = useState('liquidation');

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
    <PageWrap>
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
          <References type="auction"/>
        </Col>
      </Row>
    </PageWrap>
  );
}
