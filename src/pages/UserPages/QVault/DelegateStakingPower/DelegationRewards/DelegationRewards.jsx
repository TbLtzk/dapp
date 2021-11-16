import React, { useCallback, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { onClaimStakeDelegatorReward, getOutstandingDelegationRewards } from 'store/q-vault/action-creators'
import { outstandingDelegationRewards } from 'store/q-vault/selectors'

import { fN } from 'func/useful'
import CardBlock from 'components/Base/CardBlock'

export default function DelegationRewards () {
  const dispatch = useDispatch()
  const outstandingDelegationRewardsValue = useSelector(outstandingDelegationRewards)

  useEffect(() => {
    dispatch(getOutstandingDelegationRewards())
  }, [dispatch])

  const onClaim = useCallback(() => {
    dispatch(onClaimStakeDelegatorReward())
  }, [dispatch])

  return (
        <CardBlock
            title="Outstanding Delegation Rewards"
            firstContent={fN(outstandingDelegationRewardsValue) + ' Q'}
            btnTitle="Claim Delegation Reward"
            btnHandler={onClaim}
        />
  )
}
