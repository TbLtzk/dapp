import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Tooltip from 'ui/Tooltip';

import DelegationsTable from './components/DelegationsTable';
import DelegationStakeInfo from './components/DelegationStakeInfo';

import { getDelegationStakeInfo, onClaimStakeDelegatorReward } from 'store/q-vault/action-creators';
import { delegationStakeInfoSelector } from 'store/q-vault/selectors';

import { RoutePaths } from 'constants/routes';

function DelegationStaking () {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const delegationStakeInfo = useSelector(delegationStakeInfoSelector);

  function handleClaim () {
    dispatch(onClaimStakeDelegatorReward(t('ON_OUTSTANDING_DELEGATION_REWARDS_SUCCESS')));
  }

  useEffect(() => {
    dispatch(getDelegationStakeInfo());
  }, [dispatch]);

  const isMoreThanZero = Number(delegationStakeInfo?.totalStakeReward ?? 0) > 0;

  return (
    <>
      <div className="block">
        <div className="block_header">
          <div className="block_header-title">
            <h2 className="text-h2">{t('DELEGATIONS_OVERVIEW')}</h2>
            <InfoTooltip topic="delegate-staking-power" />
          </div>

          <div className="block_header-buttons">
            <Tooltip
              disabled={isMoreThanZero}
              trigger={
                <Button
                  disabled={!isMoreThanZero}
                  className="claim-btn"
                  onClick={handleClaim}
                >
                  <Icon name="coins" />
                  <span>{t('CLAIM_REWARDS')}</span>
                </Button>
              }
            >
              {t('REWARDS_NOT_DISTRIBUTED_YET')}
            </Tooltip>

            <Link to={RoutePaths.stakingDelegationsValidators}>
              <Button
                block
                alwaysEnabled
                look="secondary"
              >
                {t('STAKE_MY_TOKENS')}
              </Button>
            </Link>
          </div>
        </div>
        <DelegationStakeInfo />
      </div>
      <DelegationsTable />
    </>
  );
}

export default DelegationStaking;
