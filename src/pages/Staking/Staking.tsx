import { useTranslation } from 'react-i18next';
import { Redirect, Route } from 'react-router';

import PageLayout from 'components/PageLayout';
import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';
import { TabsType } from 'ui/Tabs/Tabs';

import DelegationStaking from './components/DelegationStaking';
import RootNodeStaking from './components/RootNodeStaking';
import ValidatorStaking from './components/ValidatorStaking';
import { StakingContainer } from './styles';

function Staking () {
  const { t } = useTranslation();

  const tabs: TabsType[] = [
    {
      id: 'root-node-staking',
      label: t('ROOT_NODE_STAKING'),
      link: '/staking/root-node-staking',
    },
    {
      id: 'validator-staking',
      label: t('VALIDATOR_STAKING'),
      link: '/staking/validator-staking',
    },

    {
      id: 'delegator-staking',
      label: t('DELEGATOR_STAKING'),
      link: '/staking/delegator-staking',
    },
  ];

  return (
    <PageLayout title={t('STAKING')}>
      <StakingContainer>
        <Tabs tabs={tabs} />
        <TabSwitch>
          <>
            <Route exact path="/staking">
              <Redirect to="/staking/root-node-staking" />
            </Route>
            <TabRoute exact path="/staking/root-node-staking">
              <RootNodeStaking />
            </TabRoute>
            <TabRoute exact path="/staking/validator-staking">
              <ValidatorStaking />
            </TabRoute>
            <TabRoute exact path="/staking/delegator-staking">
              <DelegationStaking />
            </TabRoute>
          </>
        </TabSwitch>
      </StakingContainer>
    </PageLayout>
  );
}

export default Staking;
