import { useTranslation } from 'react-i18next';
import { Redirect, Route } from 'react-router';

import PageLayout from 'components/PageLayout';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import useNetworkConfig from 'hooks/useNetworkConfig';

import Saving from './Saving/Saving';
import Borrowing from './Borrowing';

import { RoutePaths } from 'constants/routes';

function SavingBorrowing () {
  const { t } = useTranslation();
  const { qBridgeUrl } = useNetworkConfig();

  const tabs = [
    {
      id: 'saving',
      label: t('SAVING'),
      link: RoutePaths.saving
    },
    {
      id: 'borrowing',
      label: t('BORROWING'),
      link: RoutePaths.borrowing
    },
  ];

  return (
    <PageLayout
      title={t('SAVING_BORROWING')}
      action={(
        <a
          href={qBridgeUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Button block>
            <Icon name="bridge" />
            <span>{t('BRIDGE')}</span>
          </Button>
        </a>
      )}
    >
      <Tabs tabs={tabs} />
      <TabSwitch>
        <>
          <Route exact path={RoutePaths.savingBorrowing}>
            <Redirect to={RoutePaths.saving} />
          </Route>

          <TabRoute exact path={RoutePaths.saving}>
            <Saving />
          </TabRoute>

          <TabRoute exact path={RoutePaths.borrowing}>
            <Borrowing />
          </TabRoute>
        </>
      </TabSwitch>
    </PageLayout>
  );
}

export default SavingBorrowing;
