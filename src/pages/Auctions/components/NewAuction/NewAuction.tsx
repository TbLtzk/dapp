import { useTranslation } from 'react-i18next';

import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import PageWrap from 'components/Base/PageWrap';

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
    <PageWrap pageHeader={t('NEW_AUCTION')}>
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
