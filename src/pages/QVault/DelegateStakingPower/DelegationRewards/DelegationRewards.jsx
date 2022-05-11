import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';

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
    <div className="card_block">
      <div>
        <h5>Outstanding Delegation Rewards</h5>
        <p>{fN(outstandingDelegationRewardsValue) + ' Q'}</p>
      </div>
      <div>
        <Button
          icon="chart-pie"
          title={'Claim Delegation Reward'}
          handleButton={handleClaim}
        />
      </div>
    </div>
  );
}

export default DelegationRewards;
