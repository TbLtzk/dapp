import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';
import { TabRoute, TabSwitch } from 'components/Tabs/components';
import Tabs, { TabsType } from 'components/Tabs/Tabs';

import ManageBalance from './components/ManageBalance';
import ManageStakeReward from './components/ManageStakeReward';

import { RoutePaths } from 'constants/routes';

function ManageValidator () {
  const { t } = useTranslation();

  const tabs: TabsType[] = [
    {
      id: 'manage-validator-balance',
      label: t('MANAGE_VALIDATOR_BALANCE'),
      link: RoutePaths.stakingValidatorManage,
    },
    {
      id: 'manage-stake-reward-pool',
      label: t('MANAGE_STAKE_REWARD_POOL'),
      link: RoutePaths.stakingValidatorStakeRewarPoolManage,
    },
  ];

  return (
    <>
      <Link to={RoutePaths.stakingValidators}>
        <Button
          alwaysEnabled
          compact
          look="ghost"
          style={{ marginBottom: '24px' }}
        >
          <Icon name="arrow-left" />
          <span>{t('GO_TO_VALIDATOR_STAKING')}</span>
        </Button>
      </Link>
      <PageLayout title={t('MANAGING_A_VALIDATOR')}>
        <Tabs tabs={tabs} />
        <TabSwitch>
          <>
            <TabRoute exact path={RoutePaths.stakingValidatorManage}>
              <ManageBalance />
            </TabRoute>

            <TabRoute exact path={RoutePaths.stakingValidatorStakeRewarPoolManage}>
              <ManageStakeReward />
            </TabRoute>
          </>
        </TabSwitch>
      </PageLayout>
    </>
  );
}

export default ManageValidator;
