import React, { useEffect } from 'react'
import Stats from 'components/Custom/PageLists/SidebarCards/Stats'
import VoterStatus from 'components/Custom/PageLists/VoterStatus'

import { fN } from 'func/useful'
import { fromSolDateFormattingT1 } from 'func/date'
import { useSelector, useDispatch } from 'react-redux'
import { getDelegationInfo } from 'store/actions/action-creaters/q-vault'
import { baseVotingWeightInfoSelector } from 'store/selectors/voting/proposals'
import { getBaseVotingWeightInfo } from 'store/actions/action-creaters/voting/proposals'
import { userAddressMetamask } from 'store/selectors/user-inf'
import { fromWei } from 'func/balance'
import { votingAgent } from 'store/selectors/q-vault'

function VotingStats () {
  const address = useSelector(userAddressMetamask)
  const agent = useSelector(votingAgent)

  const dispatch = useDispatch()

  const { ownWeight, lockedUntil } = useSelector(baseVotingWeightInfoSelector)

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
      value: agent === address ? 'You vote for yourself' : `Your voting agent is ${agent}`
    }
  ]
  return <Stats statsData={statsData} type="Voting" />
}

export default VotingStats
