import { useSelector } from 'react-redux';

import { balance, delegatorShare, poolInfoSelector } from 'store/validation-reward-pools/selectors';
import { delegatedStakeSelector } from 'store/validators/selectors';

import { fN } from 'func/useful';

function RewardStats () {
  const delegatedStake = useSelector(delegatedStakeSelector);
  const delShare = useSelector(delegatorShare);
  const amountRP = useSelector(balance);
  const delClaim = useSelector(poolInfoSelector);

  const disDelClaims = amountRP - delClaim;

  const rewardStatsArray = [
    {
      id: 'collected-pool',
      label: 'Collected Pool Rewards:',
      value: `${fN(amountRP)} Q`,
    },
    {
      id: 'outstanding-claims',

      label: 'Outstanding Delegator Claims:',
      value: `${fN(delClaim)} Q`,
    },
    {
      id: 'delegator-reward',

      label: 'Distributable Delegator Rewards:',
      value: `${fN(disDelClaims)} Q`,
    },
    {
      id: 'delegator-percentage',

      label: 'Distributable Delegator Percentage:',
      value: `${fN(disDelClaims / Number(delegatedStake))}%`,
    },

    {
      id: 'validator-share',

      label: 'Validator Share:',
      value: delShare ? `${fN(100 - delShare)}%` : '100%',
    },
    {
      id: 'delegator-share',

      label: 'Delegator Share:',
      value: `${fN(delShare)}%`,
    },
  ];

  return (
    <div className="reward-stats_container">
      <h3 className="text-h3">Reward Stats</h3>
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
