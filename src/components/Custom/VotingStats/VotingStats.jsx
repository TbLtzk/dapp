import React, { useEffect } from 'react'
import Stats from 'components/Custom/PageLists/SidebarCards/Stats'
import VoterStatus from 'components/Custom/PageLists/VoterStatus'

import { fN } from 'func/useful'
import { fromSolDateFormattingT1 } from 'func/date'
import { useSelector, useDispatch } from 'react-redux'
import { getDelegationInfo } from 'store/q-vault/action-creators'
import { baseVotingWeightInfoSelector } from 'store/voting/proposals/selectors'
import { getBaseVotingWeightInfo } from 'store/voting/proposals/action-creators'
import { userAddressMetamask } from 'store/user-inf/selectors'
import { fromWei } from 'func/balance'
import { votingAgent } from 'store/q-vault/selectors'
import { getVoteDelegation } from 'contracts/helpers/voting-helpers/base-voting-helper'

function VotingStats () {
  const address = useSelector(userAddressMetamask)
  const agent = useSelector(votingAgent)

  const dispatch = useDispatch()

  const { ownWeight, lockedUntil } = useSelector(baseVotingWeightInfoSelector)

  const { votingInfo } = getVoteDelegation(agent, ownWeight, agent)

  useEffect(() => {
    dispatch(getBaseVotingWeightInfo())
    dispatch(getDelegationInfo(address))
  }, [dispatch])

  const statsData = [
    {
      title: 'Total Voting Weight',
      value: !ownWeight ? '0 Q' : fN(fromWei(ownWeight)) + ' Q'
    },
    {
      title: 'Voting Locking End',
      value: !lockedUntil ? '0' : fromSolDateFormattingT1(lockedUntil)
    },
    {
      title: 'Voting Status',
      value: <VoterStatus />
    },
    {
      title: 'Vote Delegation',
      value: votingInfo
    }
  ]
  return <Stats statsData={statsData} type="Voting" />
}

export default VotingStats
