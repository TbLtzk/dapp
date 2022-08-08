import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, Redirect, Route, useLocation } from 'react-router-dom';

import PageLayout from 'components/PageLayout';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import AllAuctions from './components/AllAuctions';
import AuctionStats from './components/AuctionStats';

import { liquidationSelector, systemDebtSelector, systemSurplusSelector } from 'store/auctions/selectors';

import { AUCTIONS_TYPES } from 'contracts/helpers/auction';

import { RoutePaths } from 'constants/routes';

export const AUCTION_HEADERS = {
  [AUCTIONS_TYPES.liquidation]: 'LIQUIDATION_AUCTION',
  [AUCTIONS_TYPES.systemDebt]: 'SYSTEM_DEBT_AUCTION',
  [AUCTIONS_TYPES.systemSurplus]: 'SYSTEM_SURPLUS_AUCTION',
};

function Auctions () {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const { activeCount: activeLiquidation } = useSelector(liquidationSelector);
  const { activeCount: activeSystemDebt } = useSelector(systemDebtSelector);
  const { activeCount: activeSystemSurplus } = useSelector(systemSurplusSelector);

  const tabs = [
    {
      id: AUCTIONS_TYPES.liquidation,
      label: t('LIQUIDATION'),
      count: activeLiquidation,
      link: RoutePaths.liquidation,
    },
    {
      id: AUCTIONS_TYPES.systemDebt,
      label: t('SYSTEM_DEBT'),
      count: activeSystemDebt,
      link: RoutePaths.systemDebt,
    },
    {
      id: AUCTIONS_TYPES.systemSurplus,
      label: t('SYSTEM_SURPLUS'),
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
    <PageLayout
      title={t('AUCTIONS')}
      action={
        <Link to={pathToNewAuctionPath[pathname] || RoutePaths.newLiquidation}>
          <Button block>
            <Icon name="add" />
            <span>{t('CREATE_AUCTION')}</span>
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
    </PageLayout>
  );
}

export default Auctions;
