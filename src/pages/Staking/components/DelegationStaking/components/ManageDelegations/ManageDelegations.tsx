import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Icon from 'ui/Icon';
import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';
import { TabsType } from 'ui/Tabs/Tabs';

import ManualDelegation from './components/ManualDelegation';
import { ManageDelegationsContainer } from './components/ManualDelegation/styles';
import ValidatorsList from './components/ValidatorsList';

import { useQVault } from 'store/q-vault/hooks';
import { useValidators } from 'store/validators/hooks';

import { RoutePaths } from 'constants/routes';

function ManageDelegations () {
  const { t } = useTranslation();
  const history = useHistory();

  const { loadDelegationStakeInfo } = useQVault();
  const { loadValidatorStats } = useValidators();

  const handleBackClick = () => {
    history.push(RoutePaths.stakingDelegations);
  };

  useEffect(() => {
    loadValidatorStats();
    loadDelegationStakeInfo();
  }, []);

  const tabs: TabsType[] = [
    {
      id: 'select-validator',
      label: t('VALIDATORS_LIST'),
      link: RoutePaths.stakingDelegationsValidators,
    },
    {
      id: 'manual-staking',
      label: t('MANUAL_STAKING'),
      link: RoutePaths.stakingDelegationsManual
    },
  ];

  return (
    <>
      <Link to={RoutePaths.stakingDelegations}>
        <Button
          alwaysEnabled
          compact
          look="ghost"
          style={{ marginBottom: '24px' }}
          onClick={handleBackClick}
        >
          <Icon name="arrow-left" />
          <span>{t('GO_TO_DELEGATIONS')}</span>
        </Button>
      </Link>

      <PageLayout
        title={t('MANAGE_DELEGATIONS')}
        titleExtra={<InfoTooltip placement="bottom" topic="delegate-staking-power" />}
      >
        <ManageDelegationsContainer>
          <Tabs tabs={tabs} />
          <TabSwitch>
            <>
              <TabRoute exact path={RoutePaths.stakingDelegationsValidators}>
                <ValidatorsList />
              </TabRoute>

              <TabRoute exact path={RoutePaths.stakingDelegationsManual}>
                <ManualDelegation />
              </TabRoute>
            </>
          </TabSwitch>
        </ManageDelegationsContainer>
      </PageLayout>
    </>
  );
}

export default ManageDelegations;
