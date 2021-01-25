import React, { useMemo, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import PageWrap from 'components/Base/PageWrap';
import ButtonsGroupTabs from 'components/Base/Tabs/ButtonsGroupTabs';
import { WrapTabs } from 'components/Custom/PageLists/styles';
import TabContent from './TabContent';

export default function SavingAndBorrowing() {

  const [activeTab, setActiveTab] = useState('decentralized-saving-borrowing');

  const tabsItems = useMemo(() => {
    return (
      [
        {
          label: 'decentralized-saving-borrowing',
          title: 'Decentralized Saving and Borrowing',
          content: (
            <WrapTabs>
              <TabContent activeTab={activeTab}/>
            </WrapTabs>
          )
        },
        {
          label: 'decentralized-auctions',
          title: 'Decentralized auctions',
        },
      ]
    );
  }, [activeTab]);

  return (
    <PageWrap>
      <Row>
        <Col md={12}>
          <ButtonsGroupTabs
            tabsItems={tabsItems}
            tabsHandler={(key) => {
              setActiveTab(key);
            }}
          />
        </Col>
      </Row>
    </PageWrap>
  );
}
