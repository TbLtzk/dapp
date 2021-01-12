import React, { useMemo, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import TabsView from 'components/Base/Tabs/TabsView';
import ModalWindow from 'components/Base/ModalWindow';
import Button from 'components/Base/Buttons/Button';
import Manage from './MainTabs/Manage';
import Dashboard from './MainTabs/Dashboard';

function TabsAuth() {
  const tabsItems = useMemo(() => {
    return (
      [
        {
          label: 'dashboard',
          title: 'Dashboard',
          content: <Dashboard/>
        },
        {
          label: 'manage',
          title: 'Manage',
          content: <Manage/>
        },
      ]
    );
  }, []);

  return (
    <Row>
      <Col xs={12}>
        <TabsView
          tabsItems={tabsItems}
        />
      </Col>
    </Row>
  );
}

export default TabsAuth;

