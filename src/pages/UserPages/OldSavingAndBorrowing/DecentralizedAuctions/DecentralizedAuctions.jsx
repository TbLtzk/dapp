import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSymbol } from 'store/actions/action-creaters/stable-coin';

import ButtonsGroupTabs from 'components/Base/Tabs/ButtonsGroupTabs';
import Button from 'components/Base/Buttons/Button';
import CreateAuctionBtn from './components/CreateAuctionBtn';
import SidebarCards from './components/SidebarCards';
import TabContent from './components/TabContent';

import { Col, Row, Container } from 'react-bootstrap';
import { WrapBtn, WrapTabs } from 'components/Custom/PageLists/styles';

export default function DecentralizedAuctions() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSymbol());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState('liquidation');

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
          <SidebarCards/>
        </Col>
      </Row>
    </Container>
  );
}
