import { Switch } from 'react-router';

import { TabRoute } from 'components/Tabs/components';

import DashboardLayout from './DashboardLayout';
import RootNodesMonitoring from './RootNodesMonitoring';
import SavingBorrowing from './SavingBorrowing';
import Tokenomics from './Tokenomics';
import ValidatorsMonitoring from './ValidatorsMonitoring';

import { RoutePaths } from 'constants/routes';

function Dashboard () {
  return (
    <Switch>
      <TabRoute exact path={RoutePaths.dashboard}>
        <DashboardLayout />
      </TabRoute>

      <TabRoute exact path={RoutePaths.dashboardTokenomics}>
        <Tokenomics />
      </TabRoute>

      <TabRoute exact path={RoutePaths.dashboardSavingBorrowing}>
        <SavingBorrowing />
      </TabRoute>

      <TabRoute exact path={RoutePaths.dahboardRootNodesMonitoring}>
        <RootNodesMonitoring />
      </TabRoute>

      <TabRoute exact path={RoutePaths.dashboardValidatorsMonitoring}>
        <ValidatorsMonitoring />
      </TabRoute>
    </Switch>
  );
}

export default Dashboard;
