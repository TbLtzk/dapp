import { Redirect, Route } from 'react-router';

import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import PageWrap from 'components/Base/PageWrap';

const RootNode = () => <div>RootNode Staking</div>;
const Validator = () => <div>Validator Staking</div>;
const Delegator = () => <div>Delegator Staking</div>;

function Staking () {
  const tabs = [
    {
      id: 'root-node-staking',
      label: 'Root Node Staking',
      link: '/staking/root-node-staking',
    },
    {
      id: 'validator-staking',
      label: 'Validator Staking',
      link: '/staking/validator-staking',
    },
    {
      id: 'delegator-staking',
      label: 'Delegator Staking',
      link: '/staking/delegator-staking',
    },
  ];

  return (
    <PageWrap pageHeader="Staking">
      <Tabs tabs={tabs} />
      <TabSwitch>
        <>
          <Route exact path="/staking">
            <Redirect to="/staking/root-node-staking" />
          </Route>
          <TabRoute exact path="/staking/root-node-staking">
            <RootNode />
          </TabRoute>
          <TabRoute exact path="/staking/validator-staking">
            <Validator />
          </TabRoute>
          <TabRoute exact path="/staking/delegator-staking">
            <Delegator />
          </TabRoute>
        </>
      </TabSwitch>
    </PageWrap>
  );
}

export default Staking;
