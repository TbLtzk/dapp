import { useTranslation } from 'react-i18next';

import { media } from '@q-dev/q-ui-kit';
import { formatAsset, formatPercent } from '@q-dev/utils';
import styled from 'styled-components';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useValidationRewards } from 'store/validation-rewards/hooks';
import { useValidators } from 'store/validators/hooks';

import { fromWei } from 'utils/web3';

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
  const { validatorDelegatedStake } = useValidators();
  const { qTicker } = useNetworkConfig();
  const { poolInfo } = useValidationRewards();
  const reserverdForClaims = Number(fromWei(poolInfo?.reservedForClaims ?? '0'));

  const distributableDelegatorsRewards = Number(fromWei(poolInfo.poolBalance)) - reserverdForClaims ?? 0;
  const delegatorPercentage = distributableDelegatorsRewards / Number(validatorDelegatedStake);

  const rewardStatsArray = [
    {
      id: 'collected-pool',
      label: t('COLLECTED_POOL_REWARDS'),
      value: formatAsset(fromWei(poolInfo.poolBalance), qTicker),
    },
    {
      id: 'outstanding-claims',
      label: t('OUTSTANDING_DELEGATOR_CLAIMS'),
      value: formatAsset(reserverdForClaims, qTicker),
    },
    {
      id: 'delegator-reward',
      label: t('DISTRIBUTABLE_DELEGATOR_REWARDS'),
      value: formatAsset(distributableDelegatorsRewards, qTicker),
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
