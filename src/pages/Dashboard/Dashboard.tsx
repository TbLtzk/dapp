import { Switch } from 'react-router';

import { TabRoute } from 'components/Tabs/components';

import useNetworkConfig from 'hooks/useNetworkConfig';

import DashboardLayout from './DashboardLayout';
import RootNodesMonitoring from './RootNodesMonitoring';
import RootNodesMonitoringLegacy from './RootNodesMonitoringLegacy';
import SavingBorrowing from './SavingBorrowing';
import Tokenomics from './Tokenomics';
import ValidatorsMonitoring from './ValidatorsMonitoring';

import { RoutePaths } from 'constants/routes';

function Dashboard () {
  const { featureFlags } = useNetworkConfig();

  return (
    <Switch>
      <TabRoute exact path={RoutePaths.dashboard}>
        <DashboardLayout />
      </TabRoute>

      <TabRoute exact path={RoutePaths.dashboardTokenomics}>
        <Tokenomics />
      </TabRoute>

      <TabRoute exact path={RoutePaths.dashboardSavingBorrowingTab}>
        <SavingBorrowing />
      </TabRoute>

      <TabRoute exact path={RoutePaths.dashboardRootNodesMonitoringTab}>
        {featureFlags.rootNodesMetrics
          ? (<RootNodesMonitoring />)
          : (<RootNodesMonitoringLegacy />)
        }
      </TabRoute>

      <TabRoute exact path={RoutePaths.dashboardValidatorsMonitoring}>
        <ValidatorsMonitoring />
      </TabRoute>
    </Switch>
  );
}

export default Dashboard;
