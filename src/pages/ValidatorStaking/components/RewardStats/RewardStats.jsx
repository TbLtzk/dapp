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

  const rewardStats = [
    [
      {
        label: 'Collected Pool Rewards:',
        value: `${fN(amountRP)} Q`,
      },
      {
        label: 'Outstanding Delegator Claims:',
        value: `${fN(delClaim)} Q`,
      },
      {
        label: 'Distributable Delegator Rewards:',
        value: `${fN(disDelClaims)} Q`,
      },
      {
        label: 'Distributable Delegator Percentage:',
        value: `${fN(disDelClaims / Number(delegatedStake))}%`,
      },
    ],
    [
      {
        label: 'Validator Share:',
        value: delShare ? `${fN(100 - delShare)}%` : '100%',
      },
      {
        label: 'Delegator Share:',
        value: `${fN(delShare)}%`,
      },
    ],
  ];

  return (
    <>
      <h3 className="title type-1">Reward Stats</h3>
      {rewardStats.map((rewardItem, index) => (
        <div
          key={index}
          style={{ display: 'flex' }}
        >
          {rewardItem.map((item) => (
            <div
              key={`${item.label}-reward-stats`}
              style={{ width: '50%' }}
            >
              <h5>{item.label}</h5>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default RewardStats;
