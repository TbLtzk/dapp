import React, { useEffect, useMemo } from 'react'
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

function VotingStats () {
  const address = useSelector(userAddressMetamask)
  const agent = useSelector(votingAgent)

  const dispatch = useDispatch()

  const { ownWeight, lockedUntil } = useSelector(baseVotingWeightInfoSelector)

  const checkVoteDelegations = useMemo(() => {
    if (!agent) {
      return '...'
    } else if (agent !== address) {
      return `Your voting agent is ${agent}`
    } else if (!Number(ownWeight)) {
      return 'You currently have no voting weight & rights'
    } else {
      return 'You vote for yourself'
    }
  }, [ownWeight, agent])

  useEffect(() => {
    dispatch(getBaseVotingWeightInfo())
    dispatch(getDelegationInfo(address))
  }, [])

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
      value: checkVoteDelegations
    }
  ]
  return <Stats statsData={statsData} type="Voting" />
}

export default VotingStats
