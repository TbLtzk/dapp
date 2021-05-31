import React, { useMemo, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import PageWrap from 'components/Base/PageWrap';
import BigTabsGroupView from 'components/Base/Tabs/BigTabsGroupView';
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
            <div style={{paddingTop: '40px'}}>
              <TabContent activeTab={activeTab}/>
            </div>
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
          <BigTabsGroupView
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
