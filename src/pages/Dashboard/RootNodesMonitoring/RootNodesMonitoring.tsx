import { Switch } from 'react-router';

import { TabRoute } from 'components/Tabs/components';

import OnchainActiveDifferenceTab from './OnchainActiveDifferenceTab';
import RootNodesMonitoringContext from './RootNodesMonitoringContext';
import RootNodesMonitoringTab from './RootNodesMonitoringTab';

import { RoutePaths } from 'constants/routes';

function RootNodesMonitoring () {
  return (
    <RootNodesMonitoringContext>
      <Switch>
        <TabRoute exact path={RoutePaths.dashboardRootNodesMonitoring}>
          <RootNodesMonitoringTab />
        </TabRoute>

        <TabRoute exact path={RoutePaths.dashboardRootNodesMonitoringOnchainActiveDifference}>
          <OnchainActiveDifferenceTab />
        </TabRoute>
      </Switch>
    </RootNodesMonitoringContext>
  );
}

export default RootNodesMonitoring;
