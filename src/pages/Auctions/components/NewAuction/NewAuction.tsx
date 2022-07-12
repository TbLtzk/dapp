import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import PageWrap from 'components/Base/PageWrap';

import NewLiquidationAuction from './components/NewLiquidationAuction';
import NewSystemDebtAuction from './components/NewSystemDebtAuction';
import NewSystemSurplusAuction from './components/NewSystemSurplusAuction';

import { RoutePaths } from 'constants/routes';

function NewAuction () {
  const tabs = [
    {
      id: 'liquidation',
      label: 'Liquidation',
      link: RoutePaths.newLiquidation
    },
    {
      id: 'system-debt',
      label: 'System Debt',
      link: RoutePaths.newSystemDebt
    },
    {
      id: 'system-surplus',
      label: 'System Surplus',
      link: RoutePaths.newSystemSurplus
    },
  ];

  return (
    <PageWrap pageHeader="New Auction">
      <Tabs tabs={tabs} />
      <TabSwitch>
        <>
          <TabRoute exact path={RoutePaths.newLiquidation}>
            <NewLiquidationAuction />
          </TabRoute>

          <TabRoute exact path={RoutePaths.newSystemDebt}>
            <NewSystemDebtAuction />
          </TabRoute>

          <TabRoute exact path={RoutePaths.newSystemSurplus}>
            <NewSystemSurplusAuction />
          </TabRoute>
        </>
      </TabSwitch>
    </PageWrap>
  );
}

export default NewAuction;
