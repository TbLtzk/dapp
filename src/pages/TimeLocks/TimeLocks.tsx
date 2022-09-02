import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route } from 'react-router';

import PageLayout from 'components/PageLayout';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import AddressForm from './components/AddressForm';
import {
  QVaultTab,
  RootStakeTab,
  ValidatorStakeTab,
  VestingAccountTab
} from './components/Tabs';

import { useUser } from 'store/user/hooks';

import { RoutePaths } from 'constants/routes';

function TimeLocks () {
  const { t } = useTranslation();
  const user = useUser();

  const [currentAddress, setCurrentAddress] = useState(user.address);

  const tabs = [
    {
      id: 'q-vault',
      label: t('Q_VAULT'),
      link: RoutePaths.timeLocksQVault
    },
    {
      id: 'root-stake',
      label: t('ROOT_STAKE'),
      link: RoutePaths.timeLocksRootStake
    },
    {
      id: 'validator-stake',
      label: t('VALIDATOR_STAKE'),
      link: RoutePaths.timeLocksValidatorStake
    },
    {
      id: 'vesting-account',
      label: t('VESTING_ACCOUNT'),
      link: RoutePaths.timeLocksVestingAccount
    },
  ];

  return (
    <PageLayout
      title={t('TIME_LOCKS')}
      titleExtra={<InfoTooltip topic="time-locks" placement="bottom" />}
    >
      <AddressForm userAddress={currentAddress} onChange={setCurrentAddress} />

      <Tabs tabs={tabs} />

      <TabSwitch>
        <>
          <Route exact path={RoutePaths.timeLocks}>
            <Redirect to={RoutePaths.timeLocksQVault} />
          </Route>

          <TabRoute exact path={RoutePaths.timeLocksQVault}>
            <QVaultTab currentAddress={currentAddress} />
          </TabRoute>

          <TabRoute exact path={RoutePaths.timeLocksRootStake}>
            <RootStakeTab currentAddress={currentAddress}/>
          </TabRoute>

          <TabRoute exact path={RoutePaths.timeLocksValidatorStake}>
            <ValidatorStakeTab currentAddress={currentAddress}/>
          </TabRoute>

          <TabRoute exact path={RoutePaths.timeLocksVestingAccount}>
            <VestingAccountTab currentAddress={currentAddress}/>
          </TabRoute>
        </>
      </TabSwitch>
    </PageLayout>
  );
}

export default TimeLocks;
