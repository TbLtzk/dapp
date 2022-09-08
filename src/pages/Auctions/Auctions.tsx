import { useTranslation } from 'react-i18next';
import { Link, Redirect, Route, useLocation } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';
import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import AllAuctions from './components/AllAuctions';
import AuctionStats from './components/AuctionStats';

import { useAuctions } from 'store/auctions/hooks';

import { AUCTIONS_TYPES } from 'contracts/helpers/auction';

import { RoutePaths } from 'constants/routes';

export const AUCTION_HEADERS = {
  [AUCTIONS_TYPES.liquidation]: 'LIQUIDATION_AUCTION',
  [AUCTIONS_TYPES.systemDebt]: 'SYSTEM_DEBT_AUCTION',
  [AUCTIONS_TYPES.systemSurplus]: 'SYSTEM_SURPLUS_AUCTION',
};

function Auctions () {
  const { t } = useTranslation();

  const { auctions } = useAuctions();
  const { pathname } = useLocation();

  const tabs = [
    {
      id: AUCTIONS_TYPES.liquidation,
      label: t('LIQUIDATION'),
      count: auctions.liquidation.activeCount,
      link: RoutePaths.liquidation,
    },
    {
      id: AUCTIONS_TYPES.systemDebt,
      label: t('SYSTEM_DEBT'),
      count: auctions.systemDebt.activeCount,
      link: RoutePaths.systemDebt,
    },
    {
      id: AUCTIONS_TYPES.systemSurplus,
      label: t('SYSTEM_SURPLUS'),
      count: auctions.systemSurplus.activeCount,
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
