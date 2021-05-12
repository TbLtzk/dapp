import React, { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  onClaimStakeDelegatorReward,
  getOutstandingDelegationRewards
} from 'store/actions/action-creaters/q-piggy-bank';
import { outstandingDelegationRewards } from 'store/selectors/q-piggy-bank';

import { fN } from 'func/useful';
import CardBlock from 'components/Base/CardBlock';

export default function DelegationRewards() {
  const dispatch = useDispatch();
  const outstandingDelegationRewardsValue = useSelector(outstandingDelegationRewards);

  useEffect(() => {
    dispatch(getOutstandingDelegationRewards());
  }, [dispatch]);

  const onClaim = useCallback(() => {
    dispatch(onClaimStakeDelegatorReward());
  }, [dispatch]);

  return (
    <CardBlock
      title={'Outstanding delegation rewards'}
      firstContent={fN(outstandingDelegationRewardsValue) + 'Q'}
      btnTitle={'Claim delegation reward'}
      btnHandler={onClaim}
    />
  );
}
