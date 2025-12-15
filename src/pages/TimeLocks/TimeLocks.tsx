import { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route } from 'react-router';

import { useWeb3Context } from 'context/Web3ContextProvider';

import PageLayout from 'components/PageLayout';
import Tabs from 'components/Tabs';
import { TabRoute, TabSwitch } from 'components/Tabs/components';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import {
  QVaultTab,
  RootStakeTab,
  ValidatorStakeTab,
  VestingAccountTab
} from './components/Tabs';

import { RoutePaths } from 'constants/routes';

interface AddressContext {
  address: string;
  setAddress: (address: string) => void;
}

export const TimeLocksAddressContext = createContext({} as AddressContext);

function TimeLocks () {
  const { t } = useTranslation();

  const { address: accountAddress } = useWeb3Context();
  const [address, setAddress] = useState(accountAddress);

  const tabs = [
    {
      id: 'q-vault',
      label: t('QGOV_VAULT'),
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
      label: t('VESTING'),
      link: RoutePaths.timeLocksVestingAccount
    },
  ];

  return (
    <PageLayout
      title={t('TIME_LOCKS')}
      titleExtra={<InfoTooltip topic="time-locks" placement="bottom" />}
    >
      <TimeLocksAddressContext.Provider value={{ address, setAddress }}>
        <Tabs tabs={tabs} />
        <TabSwitch>
          <>
            <Route exact path={RoutePaths.timeLocks}>
              <Redirect to={RoutePaths.timeLocksQVault} />
            </Route>

            <TabRoute exact path={RoutePaths.timeLocksQVault}>
              <QVaultTab />
            </TabRoute>

            <TabRoute exact path={RoutePaths.timeLocksRootStake}>
              <RootStakeTab />
            </TabRoute>

            <TabRoute exact path={RoutePaths.timeLocksValidatorStake}>
              <ValidatorStakeTab />
            </TabRoute>

            <TabRoute exact path={RoutePaths.timeLocksVestingAccount}>
              <VestingAccountTab />
            </TabRoute>
          </>
        </TabSwitch>
      </TimeLocksAddressContext.Provider>
    </PageLayout>
  );
}

export const useTimeLocksAddress = () => useContext(TimeLocksAddressContext);

export default TimeLocks;
