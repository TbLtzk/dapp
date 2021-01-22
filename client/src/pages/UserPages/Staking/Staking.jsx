import React, { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';

import BigTabsView from 'components/Base/Tabs/BigTabsView';
import StakingContent from './StakingContent';
import ValidatorStaking from './ValidatorStaking';
import { useSelector } from 'react-redux';
import { rootNodeStake } from '../../../store/selectors/root-contract';

function Staking() {
  const amountNodeStake = useSelector(rootNodeStake);

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
        // content: <p>Validator Staking</p>,
        content: <ValidatorStaking />,
      },
    ]
  ), [amountNodeStake]);

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
