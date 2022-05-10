import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardBlock from 'components/Base/CardBlock';

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
    <CardBlock
      title="Outstanding Delegation Rewards"
      firstContent={fN(outstandingDelegationRewardsValue) + ' Q'}
      btnTitle="Claim Delegation Reward"
      btnHandler={handleClaim}
    />
  );
}

export default DelegationRewards;
