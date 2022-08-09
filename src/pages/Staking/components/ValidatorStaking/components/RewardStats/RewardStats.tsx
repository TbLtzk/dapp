import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { balance, delegatorShare, poolInfoSelector } from 'store/validation-reward-pools/selectors';
import { delegatedStakeSelector } from 'store/validators/selectors';

import { formatAsset, formatPercent } from 'utils/formatters';

function RewardStats () {
  const { t } = useTranslation();
  const delegatedStake = useSelector(delegatedStakeSelector);
  const delShare = useSelector(delegatorShare);
  const amountRP = useSelector(balance);
  const delClaim = useSelector(poolInfoSelector);

  const disDelClaims = amountRP - delClaim;

  const rewardStatsArray = [
    {
      id: 'collected-pool',
      label: t('COLLECTED_POOL_REWARDS'),
      value: formatAsset(amountRP, 'Q'),
    },
    {
      id: 'outstanding-claims',
      label: t('OUTSTANDING_DELEGATOR_CLAIMS'),
      value: formatAsset(delClaim, 'Q'),
    },
    {
      id: 'delegator-reward',
      label: t('DISTRIBUTABLE_DELEGATOR_REWARDS'),
      value: formatAsset(disDelClaims, 'Q'),
    },
    {
      id: 'delegator-percentage',
      label: t('DISTRIBUTABLE_DELEGATOR_PERCENTAGE'),
      value: formatPercent(disDelClaims / Number(delegatedStake)),
    },

    {
      id: 'validator-share',
      label: t('VALIDATOR_SHARE'),
      value: formatPercent(100 - Number(delShare || 0)),
    },
    {
      id: 'delegator-share',
      label: t('DELEGATOR_SHARE'),
      value: formatPercent(delShare)
    },
  ];

  return (
    <div className="reward-stats_container">
      <h3 className="text-h3">{t('REWARD_STATS')}</h3>
      <div className="reward-stats_cards">
        {rewardStatsArray.map(({ id, label, value }) => (
          <div key={id} className="reward-stats_info">
            <p className="text-md">{label}</p>
            <h4 className="text-xl">{value}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RewardStats;
