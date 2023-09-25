
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, Redirect, Route, useHistory, useLocation } from 'react-router-dom';

import { StablecoinAsset } from 'typings/defi';

import Tabs from 'components/Tabs';
import { TabRoute, TabSwitch } from 'components/Tabs/components';

import AllAuctions from '../AllAuctions';
import AuctionStats from '../AuctionStats';

import { useAuctions } from 'store/auctions/hooks';

import { AUCTIONS_TYPES } from 'contracts/helpers/auction';

import { RoutePaths } from 'constants/routes';

interface Props {
  stablecoinAsset: StablecoinAsset;
}

function AuctionTab ({ stablecoinAsset }: Props) {
  const { t } = useTranslation();

  const { auctions } = useAuctions();
  const { pathname } = useLocation();
  const { replace } = useHistory();

  const auctionsByAsset = auctions[stablecoinAsset];

  const tabs = [
    {
      id: AUCTIONS_TYPES.liquidation,
      label: t('LIQUIDATION'),
      count: auctionsByAsset.liquidation.activeCount,
      link: generatePath(RoutePaths.liquidation, { asset: stablecoinAsset })
    },
    {
      id: AUCTIONS_TYPES.systemDebt,
      label: t('SYSTEM_DEBT'),
      count: auctionsByAsset.systemDebt.activeCount,
      link: generatePath(RoutePaths.systemDebt, { asset: stablecoinAsset })
    },
    {
      id: AUCTIONS_TYPES.systemSurplus,
      label: t('SYSTEM_SURPLUS'),
      count: auctionsByAsset.systemSurplus.activeCount,
      link: generatePath(RoutePaths.systemSurplus, { asset: stablecoinAsset })
    },
  ];

  useEffect(() => {
    if (!tabs.some(({ link }) => pathname === link)) {
      replace(tabs[0].link);
    }
  }, []);

  return (
    <>
      <AuctionStats stablecoinAsset={stablecoinAsset} />
      <Tabs tabs={tabs} />
      <TabSwitch>
        <>
          <Route exact path={RoutePaths.auctionsTab}>
            <Redirect to={tabs[0].link} />
          </Route>

          {tabs.map((item) => (
            <TabRoute
              key={item.id}
              exact
              path={item.link}
            >
              <AllAuctions auctionType={item.id} stablecoinAsset={stablecoinAsset} />
            </TabRoute>
          ))}
        </>
      </TabSwitch>
    </>
  );
}

export default AuctionTab;
