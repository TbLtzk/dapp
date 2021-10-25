import React, { useEffect } from 'react'
import Stats from 'components/Custom/PageLists/SidebarCards/Stats'
import VoterStatus from 'components/Custom/PageLists/VoterStatus'

import { fN } from 'func/useful'
import { fromSolDateFormattingT1 } from 'func/date'
import { useSelector, useDispatch } from 'react-redux'
import { baseVotingWeightInfoSelector } from 'store/selectors/voting/proposals'
import { getBaseVotingWeightInfo } from 'store/actions/action-creaters/voting/proposals'
import { fromWei } from 'func/balance'

function VotingStats () {
  const dispatch = useDispatch()

  const { ownWeight, lockedUntil } = useSelector(baseVotingWeightInfoSelector)

  useEffect(() => {
    dispatch(getBaseVotingWeightInfo())
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
    }
  ]
  return <Stats statsData={statsData} type="Voting" />
}

export default VotingStats
