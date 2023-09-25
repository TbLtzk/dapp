import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, Link, Redirect, Route, useHistory, useLocation, useParams } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';
import { StablecoinAsset } from 'typings/defi';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';
import Tabs from 'components/Tabs';
import { TabRoute, TabSwitch } from 'components/Tabs/components';

import useNetworkConfig from 'hooks/useNetworkConfig';

import AuctionTab from './components/AuctionTab';

import { useAuctions } from 'store/auctions/hooks';

import { RoutePaths } from 'constants/routes';

function Auctions () {
  const { t } = useTranslation();
  const { asset: assetUrlParam } = useParams<{asset: StablecoinAsset}>();
  const { replace } = useHistory();
  const { pathname } = useLocation();

  const { stablecoins } = useNetworkConfig();
  const { getActiveAuctionsCountByAsset } = useAuctions();

  const tabs = useMemo(() => stablecoins.map((asset) => ({
    id: asset,
    label: asset,
    count: getActiveAuctionsCountByAsset(asset),
    link: generatePath(RoutePaths.auctionsTab, { asset })
  })), [stablecoins, getActiveAuctionsCountByAsset]);

  useEffect(() => {
    if (!assetUrlParam || !stablecoins.includes(assetUrlParam)) {
      replace(tabs[0].link);
    }
  }, []);

  const pathToNewAuctionPath: Record<string, string> = {
    [RoutePaths.liquidation]: RoutePaths.newLiquidation,
    [RoutePaths.systemDebt]: RoutePaths.newSystemDebt,
    [RoutePaths.systemSurplus]: RoutePaths.newSystemSurplus,
  };

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
      <Tabs tabs={tabs} />
      <TabSwitch>
        <>
          <Route exact path={RoutePaths.auctions}>
            <Redirect to={tabs[0].link} />
          </Route>

          {tabs.map((item) => (
            <TabRoute
              key={item.id}
              exact={false}
              path={item.link}
            >
              <AuctionTab stablecoinAsset={item.id} />
            </TabRoute>
          ))}
        </>
      </TabSwitch>
    </PageLayout>
  );
}

export default Auctions;
