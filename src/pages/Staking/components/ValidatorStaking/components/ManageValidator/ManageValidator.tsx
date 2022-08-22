import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import PageLayout from 'components/PageLayout';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';
import Tabs, { TabsType } from 'ui/Tabs/Tabs';

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
