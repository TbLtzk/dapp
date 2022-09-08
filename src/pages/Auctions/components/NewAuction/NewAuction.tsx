import { useTranslation } from 'react-i18next';

import PageLayout from 'components/PageLayout';
import Tabs from 'components/Tabs';
import { TabRoute, TabSwitch } from 'components/Tabs/components';

import NewLiquidationAuction from './components/NewLiquidationAuction';
import NewSystemDebtAuction from './components/NewSystemDebtAuction';
import NewSystemSurplusAuction from './components/NewSystemSurplusAuction';

import { RoutePaths } from 'constants/routes';

function NewAuction () {
  const { t } = useTranslation();

  const tabs = [
    {
      id: 'liquidation',
      label: t('LIQUIDATION'),
      link: RoutePaths.newLiquidation
    },
    {
      id: 'system-debt',
      label: t('SYSTEM_DEBT'),
      link: RoutePaths.newSystemDebt
    },
    {
      id: 'system-surplus',
      label: t('SYSTEM_SURPLUS'),
      link: RoutePaths.newSystemSurplus
    },
  ];

  return (
    <PageLayout title={t('NEW_AUCTION')}>
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
    </PageLayout>
  );
}

export default NewAuction;
