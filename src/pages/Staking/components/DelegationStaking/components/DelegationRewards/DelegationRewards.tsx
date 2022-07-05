import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import { getOutstandingDelegationRewards, onClaimStakeDelegatorReward } from 'store/q-vault/action-creators';
import { outstandingDelegationRewards } from 'store/q-vault/selectors';

import { fN } from 'func/useful';

function DelegationRewards () {
  const dispatch = useDispatch();
  const outstandingDelegationRewardsValue = useSelector(outstandingDelegationRewards);

  useEffect(() => {
    dispatch(getOutstandingDelegationRewards());
  }, [dispatch]);

  function handleClaim () {
    dispatch(onClaimStakeDelegatorReward());
  }

  return (
    <div className="delegation-reward_container">
      <div>
        <p className="text-md">Outstanding Delegation Rewards</p>
        <h4 className="text-xl">{`${fN(outstandingDelegationRewardsValue)} Q`}</h4>
      </div>
      <Button onClick={handleClaim}>
        <Icon name="coins" />
        <span>Claim Delegation Reward</span>
      </Button>
    </div>
  );
}

export default DelegationRewards;
