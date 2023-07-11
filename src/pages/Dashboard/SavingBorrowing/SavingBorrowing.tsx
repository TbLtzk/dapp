import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import PageLayout from 'components/PageLayout';
import Tabs from 'components/Tabs';
import { TabRoute, TabSwitch } from 'components/Tabs/components';

import useNetworkConfig from 'hooks/useNetworkConfig';

import DashboardLink from '../components/DashboardLink';

import StablecoinAssetTab from './components/StablecoinAssetTab';

import { RoutePaths } from 'constants/routes';

function SavingBorrowing () {
  const { replace } = useHistory();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { stablecoins } = useNetworkConfig();

  const tabs = useMemo(() => stablecoins.map((item) => ({
    id: item,
    label: item,
    link: RoutePaths.dashboardSavingBorrowing + '/' + item
  })), [stablecoins]);

  useEffect(() => {
    if (!tabs.some(({ link }) => pathname === link)) {
      replace(tabs[0].link);
    }
  }, []);

  return (
    <div>
      <DashboardLink />
      <PageLayout title={t('SAVING_BORROWING')}>
        <Tabs tabs={tabs} />

        <TabSwitch>
          <>
            {tabs.map((item) => (
              <TabRoute
                key={item.id}
                exact
                path={item.link}
              >
                <StablecoinAssetTab stablecoinAsset={item.id} />
              </TabRoute>
            ))}
          </>
        </TabSwitch>

      </PageLayout>
    </div>
  );
}

export default SavingBorrowing;
