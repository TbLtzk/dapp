import React, { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  onClaimStakeDelegatorReward,
  getOutstandingDelegationRewards
} from 'store/actions/action-creaters/q-piggy-bank';
import { outstandingDelegationRewards } from 'store/selectors/q-piggy-bank';

import Button from 'components/Base/Buttons/Button';

import { fN } from 'func/useful';

import { Col } from 'react-bootstrap';
import { DelegationBlock, Headline, } from './styles';

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
    <DelegationBlock>
      <Col md={12}>
        <div>
          <Headline>Delegation Rewards</Headline>
        </div>
      </Col>
      <Col md={4}>
        <p>Outstanding delegation rewards</p>
      </Col>
      <Col md={4}>
        <p>{fN(outstandingDelegationRewardsValue) + 'Q'}</p>
      </Col>
      <Col md={4}>
        <Button
          type="outline"
          title="Claim"
          width="100%"
          handleButton={onClaim}
        />
      </Col>
    </DelegationBlock>
  );
}
