import { useTranslation } from 'react-i18next';
import { Redirect, Route } from 'react-router';

import PageLayout from 'components/PageLayout';
import Tabs from 'components/Tabs';
import { TabRoute, TabSwitch } from 'components/Tabs/components';
import { TabsType } from 'components/Tabs/Tabs';

import DelegationStaking from './components/DelegationStaking';
import RootNodeStaking from './components/RootNodeStaking';
import ValidatorStaking from './components/ValidatorStaking';
import { StakingContainer } from './styles';

import { RoutePaths } from 'constants/routes';

function Staking () {
  const { t } = useTranslation();

  const tabs: TabsType[] = [
    {
      id: 'root-node-staking',
      label: t('ROOT_NODE_STAKING'),
      link: RoutePaths.stakingRootNode,
    },
    {
      id: 'validator-staking',
      label: t('VALIDATOR_STAKING'),
      link: RoutePaths.stakingValidators,
    },

    {
      id: 'delegations',
      label: t('DELEGATOR_STAKING'),
      link: RoutePaths.stakingDelegations,
    },
  ];

  return (
    <PageLayout title={t('STAKING')}>
      <StakingContainer>
        <Tabs tabs={tabs} />
        <TabSwitch>
          <>
            <Route exact path={RoutePaths.staking}>
              <Redirect to={RoutePaths.stakingRootNode} />
            </Route>
            <TabRoute exact path={RoutePaths.stakingRootNode}>
              <RootNodeStaking />
            </TabRoute>
            <TabRoute exact path={RoutePaths.stakingValidators}>
              <ValidatorStaking />
            </TabRoute>
            <TabRoute exact path={RoutePaths.stakingDelegations}>
              <DelegationStaking />
            </TabRoute>
          </>
        </TabSwitch>
      </StakingContainer>
    </PageLayout>
  );
}

export default Staking;
