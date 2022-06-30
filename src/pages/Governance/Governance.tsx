import { Redirect, Route } from 'react-router';

import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import Proposals from './Proposals';

function Governance () {
  return (
    <TabSwitch>
      <>
        <Route exact path="/governance">
          <Redirect to="/governance/q-proposals" />
        </Route>

        <TabRoute exact path="/governance/q-proposals">
          <Proposals type="q" />
        </TabRoute>

        <TabRoute exact path="/governance/q-root-node-panel">
          <Proposals type="rootNode" />
        </TabRoute>

        <TabRoute exact path="/governance/q-expert-proposals">
          <Proposals type="expert" />
        </TabRoute>

        <TabRoute exact path="/governance/slashing-proposals">
          <Proposals type="slashing" />
        </TabRoute>

        <TabRoute exact path="/governance/contract-updates">
          <Proposals type="contractUpdate" />
        </TabRoute>
      </>
    </TabSwitch>
  );
}

export default Governance;
