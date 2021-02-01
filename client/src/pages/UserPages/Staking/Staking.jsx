import React, { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';

import BigTabsView from 'components/Base/Tabs/BigTabsView';
import RootNodeStakingContent from './RootNodeStakingContent';
import ValidatorStaking from './ValidatorStaking';
import { useSelector } from 'react-redux';
import { rootNodeStake } from '../../../store/selectors/root-contract';
import PageWrap from '../../../components/Base/PageWrap';

function Staking() {
  const amountNodeStake = useSelector(rootNodeStake);

  const tabsItems = useMemo(() => (
    [
      {
        label: 'root-node-staking',
        title: 'Root Node Staking',
        content: <RootNodeStakingContent/>,
      },
      {
        label: 'validator-staking',
        title: 'Validator Staking',
        content: <ValidatorStaking/>,
      },
    ]
  ), [amountNodeStake]);

  return (
    <PageWrap>
      <Row>
        <Col xs={12}>
          <BigTabsView
            tabsItems={tabsItems}
          />
        </Col>
      </Row>
    </PageWrap>
  );
}

export default Staking;
