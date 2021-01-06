import React, { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';

import BigTabsView from 'components/Base/Tabs/BigTabsView';
import StakingContent from './StakingContent';

function Staking() {
  const tabsItems = useMemo(() => (
    [
      {
        label: 'root-node-staking',
        title: 'Root Node Staking',
        content: <StakingContent />,
      },
      {
        label: 'validator-staking',
        title: 'Validator Staking',
        content: <p>Validator Staking</p>,
      },
    ]
  ), []);

  return (
    <Row>
      <Col xs={12}>
        <BigTabsView
          tabsItems={tabsItems}
        />
      </Col>
    </Row>

  );
}

export default Staking;
