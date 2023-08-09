import { Switch } from 'react-router';

import { TabRoute } from 'components/Tabs/components';

import OnchainActiveDifferenceTab from './OnchainActiveDifferenceTab';
import RootNodesMonitoringTab from './RootNodesMonitoringTab';

import { RoutePaths } from 'constants/routes';

function RootNodesMonitoring () {
  return (
    <Switch>
      <TabRoute exact path={RoutePaths.dashboardRootNodesMonitoring}>
        <RootNodesMonitoringTab />
      </TabRoute>

      <TabRoute exact path={RoutePaths.dashboardRootNodesMonitoringOnchainActiveDifference}>
        <OnchainActiveDifferenceTab />
      </TabRoute>
    </Switch>
  );
}

export default RootNodesMonitoring;
