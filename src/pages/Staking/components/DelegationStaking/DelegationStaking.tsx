import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon, Tooltip } from '@q-dev/q-ui-kit';

import Button from 'components/Button';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import DelegationsTable from './components/DelegationsTable';
import DelegationStakeInfo from './components/DelegationStakeInfo';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { RoutePaths } from 'constants/routes';

function DelegationStaking () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const {
    delegationStakeInfo,
    loadDelegationStakeInfo,
    claimStakeDelegatorReward
  } = useQVault();

  useEffect(() => {
    loadDelegationStakeInfo();
  }, []);

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
                  onClick={() => submitTransaction({
                    successMessage: t('ON_OUTSTANDING_DELEGATION_REWARDS_TX'),
                    submitFn: claimStakeDelegatorReward
                  })}
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
