import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';
import { fromWei } from 'web3-utils';

import { poolInfoSelector } from 'store/validation-reward-pools/selectors';
import { validatorDelegatedStakeSelector } from 'store/validators/selectors';

import { formatAsset, formatPercent } from 'utils/numbers';

const StyledWrapper = styled.div`
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  ${media.lessThan('medium')} {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .balance-overview-refresh {
    display: flex;
    gap: 16px;
    align-items: center;

    ${media.lessThan('medium')} {
      justify-content: space-between;
    }
  }

  .balance-overview-refresh-icon {
    font-size: 20px;
  }
`;

function RewardStats () {
  const { t } = useTranslation();
  const delegatedStake = useSelector(validatorDelegatedStakeSelector);
  const poolInfo = useSelector(poolInfoSelector);
  const reserverdForClaims = Number(fromWei(poolInfo?.reservedForClaims ?? '0'));

  const distributableDelegatorsRewards = poolInfo?.poolBalance - reserverdForClaims ?? 0;
  const delegatorPercentage = distributableDelegatorsRewards / Number(delegatedStake);

  const rewardStatsArray = [
    {
      id: 'collected-pool',
      label: t('COLLECTED_POOL_REWARDS'),
      value: formatAsset(poolInfo.poolBalance, 'Q'),
    },
    {
      id: 'delegator-reward',
      label: t('DISTRIBUTABLE_DELEGATOR_REWARDS'),
      value: formatAsset(distributableDelegatorsRewards, 'Q'),
    },
    {
      id: 'outstanding-claims',
      label: t('OUTSTANDING_DELEGATOR_CLAIMS'),
      value: formatAsset(reserverdForClaims, 'Q'),
    },

    {
      id: 'delegator-percentage',
      label: t('DISTRIBUTABLE_DELEGATOR_PERCENTAGE'),
      value: isFinite(delegatorPercentage) ? formatPercent(delegatorPercentage) : '-',
    },

  ];

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('REWARD_STATS')}</h3>
      </div>
      <div className="content block__content">
        {rewardStatsArray.map(({ id, label, value }) => (
          <div key={id}>
            <p className="color-secondary text-md">{label}</p>
            <p className="color-primary text-md">{value}</p>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
}

export default RewardStats;
