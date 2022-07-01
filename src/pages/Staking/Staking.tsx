import { Redirect, Route } from 'react-router';

import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import PageWrap from 'components/Base/PageWrap';

import DelegationStaking from './components/DelegationStaking';
import RootNodeStaking from './components/RootNodeStaking';
import ValidatorStaking from './components/ValidatorStaking';
import { StakingContainer } from './styles';

function Staking () {
  const tabs = [
    {
      id: 'validator-staking',
      label: 'Validator Staking',
      link: '/staking/validator-staking',
    },
    {
      id: 'root-node-staking',
      label: 'Root Node Staking',
      link: '/staking/root-node-staking',
    },
    {
      id: 'delegator-staking',
      label: 'Delegator Staking',
      link: '/staking/delegator-staking',
    },
  ];

  return (
    <PageWrap pageHeader="Staking">
      <StakingContainer>
        <Tabs tabs={tabs} />
        <TabSwitch>
          <>
            <Route exact path="/staking">
              <Redirect to="/staking/root-node-staking" />
            </Route>
            <TabRoute exact path="/staking/root-node-staking">
              <RootNodeStaking />
            </TabRoute>
            <TabRoute exact path="/staking/validator-staking">
              <ValidatorStaking />
            </TabRoute>
            <TabRoute exact path="/staking/delegator-staking">
              <DelegationStaking />
            </TabRoute>
          </>
        </TabSwitch>
      </StakingContainer>
    </PageWrap>
  );
}

export default Staking;
