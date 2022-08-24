import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import PageLayout from 'components/PageLayout';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';
import { TabsType } from 'ui/Tabs/Tabs';

import useMetamaskReset from 'hooks/useMetamaskReset';

import ManualDelegation from './components/ManualDelegation';
import { ManageDelegationsContainer } from './components/ManualDelegation/styles';
import ValidatorsList from './components/ValidatorsList';

import { getDelegationStakeInfo } from 'store/q-vault/action-creators';
import { getValidatorMembers } from 'store/validators/action-creators';

import formTypes from 'constants/form-types';
import { RoutePaths } from 'constants/routes';

function ManageDelegations () {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    history.push(RoutePaths.stakingDelegations);
  };

  const getDelegationsManagingInfo = () => {
    dispatch(getValidatorMembers('validators-widened'));
    dispatch(getDelegationStakeInfo());
  };

  useEffect(() => {
    getDelegationsManagingInfo();
  }, [dispatch]);

  useMetamaskReset(formTypes.qVaultDelegation, getDelegationsManagingInfo);

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
