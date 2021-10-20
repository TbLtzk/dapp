import React, { useEffect } from 'react'
import Stats from 'components/Custom/PageLists/SidebarCards/Stats'
import VoterStatus from 'components/Custom/PageLists/VoterStatus'

import { fN } from 'func/useful'
import { fromSolDateFormattingT1 } from 'func/date'
import { useSelector, useDispatch } from 'react-redux'
import {
  votingLockingEnd,
  votingWeight,
  votingAgent
} from 'store/selectors/q-vault'
import { rootNodeStake } from 'store/selectors/root-contract'
import { selfStake } from 'store/selectors/validators'
import { getSelfStake } from 'store/actions/action-creaters/validators'
import { getRootNodeStakes } from 'store/actions/action-creaters/root-contract'
import { getLockedAssets, getDelegationInfo } from 'store/actions/action-creaters/q-vault'
import { userAddressMetamask } from 'store/selectors/user-inf'

function VotingStats () {
  const rootStakeBalance = useSelector(rootNodeStake)
  const validatorSelfStake = useSelector(selfStake)
  const userVotingWeight = fN(useSelector(votingWeight))
  const address = useSelector(userAddressMetamask)
  const agent = useSelector(votingAgent)

  const dispatch = useDispatch()

  const userLockingEnd = fromSolDateFormattingT1(useSelector(votingLockingEnd))

  useEffect(() => {
    dispatch(getLockedAssets(address))
    dispatch(getRootNodeStakes(address))
    dispatch(getSelfStake(address))
    dispatch(getDelegationInfo(address))
  }, [])

  const statsData = [
    {
      title: 'Total Voting Weight',
      value: Number(userVotingWeight) + Number(rootStakeBalance) + Number(validatorSelfStake) + ' Q'
    },
    {
      title: 'Voting Locking End',
      value: userLockingEnd
    },
    {
      title: 'Voting Status',
      value: <VoterStatus />
    },
    {
      title: 'Vote Delegation',
      value: agent === address ? 'You vote for yourself' : `Your voting agent is ${agent}`
    }
  ]
  return <Stats statsData={statsData} type="Voting" />
}

export default VotingStats
