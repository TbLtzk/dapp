import { useSelector } from 'react-redux';
import { Link, Redirect, Route, useLocation } from 'react-router-dom';

import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import PageWrap from 'components/Base/PageWrap';

import AllAuctions from './components/AllAuctions';
import AuctionStats from './components/AuctionStats';

import { liquidationSelector, systemDebtSelector, systemSurplusSelector } from 'store/auctions/selectors';

import { AUCTIONS_TYPES } from 'contracts/helpers/auction';

import { RoutePaths } from 'constants/routes';

export const AUCTION_HEADERS = {
  [AUCTIONS_TYPES.liquidation]: 'Liquidation Auction',
  [AUCTIONS_TYPES.systemDebt]: 'System Debt Auction',
  [AUCTIONS_TYPES.systemSurplus]: 'System Surplus Auction',
};

function Auctions () {
  const { pathname } = useLocation();

  const { activeCount: activeLiquidation } = useSelector(liquidationSelector);
  const { activeCount: activeSystemDebt } = useSelector(systemDebtSelector);
  const { activeCount: activeSystemSurplus } = useSelector(systemSurplusSelector);

  const tabs = [
    {
      id: AUCTIONS_TYPES.liquidation,
      label: 'Liquidation',
      count: activeLiquidation,
      link: RoutePaths.liquidation,
    },
    {
      id: AUCTIONS_TYPES.systemDebt,
      label: 'System Debt',
      count: activeSystemDebt,
      link: RoutePaths.systemDebt,
    },
    {
      id: AUCTIONS_TYPES.systemSurplus,
      label: 'System Surplus',
      count: activeSystemSurplus,
      link: RoutePaths.systemSurplus,
    },
  ];

  const pathToNewAuctionPath: Record<string, string> = {
    [RoutePaths.liquidation]: RoutePaths.newLiquidation,
    [RoutePaths.systemDebt]: RoutePaths.newSystemDebt,
    [RoutePaths.systemSurplus]: RoutePaths.newSystemSurplus,
  };

  const redirectTab = tabs.find((tab) => tab.count > 0) || tabs[0];
  return (
    <PageWrap
      pageHeader="Auctions"
      pageButton={
        <Link to={pathToNewAuctionPath[pathname] || RoutePaths.newLiquidation}>
          <Button block>
            <Icon name="add" />
            <span>Create auction</span>
          </Button>
        </Link>
      }
    >
      <AuctionStats />
      <Tabs tabs={tabs} />
      <TabSwitch>
        <>
          <Route exact path={RoutePaths.auctions}>
            <Redirect to={redirectTab.link} />
          </Route>

          <TabRoute exact path={RoutePaths.liquidation}>
            <AllAuctions auctionType="liquidation" />
          </TabRoute>

          <TabRoute exact path={RoutePaths.systemDebt}>
            <AllAuctions auctionType="systemDebt" />
          </TabRoute>

          <TabRoute exact path={RoutePaths.systemSurplus}>
            <AllAuctions auctionType="systemSurplus" />
          </TabRoute>
        </>
      </TabSwitch>
    </PageWrap>
  );
}

export default Auctions;
