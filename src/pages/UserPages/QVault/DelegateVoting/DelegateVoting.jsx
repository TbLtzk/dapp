import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'
import { getDelegationInfo } from 'store/actions/action-creaters/q-vault'
import { remainDateTimeSince } from 'func/convertDate'
import {
  receivedWeight,
  votingAgent,
  isPendingDelegation,
  votingAgentPassOverTime
} from 'store/selectors/q-vault'

import CustomBlock from 'components/Base/CustomBlock'

import 'react-datepicker/dist/react-datepicker.css'

export default function LockCoin () {
  const dispatch = useDispatch()
  const address = useSelector(userAddressMetamask)
  const weight = useSelector(receivedWeight)
  const agent = useSelector(votingAgent)
  const isPending = useSelector(isPendingDelegation)
  const time = useSelector(votingAgentPassOverTime)

  useEffect(() => {
    dispatch(getDelegationInfo(address))
  }, [])

  return (
    <CustomBlock>
      <h1>Delegate Voting Power</h1>
      <h5>Received weight</h5>
      <h4>{weight}</h4>
      <h5>Current agent</h5>
      <h4>{
        agent === address
          ? 'You exercise your voting right yourself'
          : `You delegated. Your voting rights to ${agent}`
      }</h4>
      <h5>Delegation info</h5>
      <h4>
        {
          isPending
            ? null
            : `This delegation info is currently pending. It can be finalized after ${remainDateTimeSince(+new Date() + +time)}`
        }
      </h4>
    </CustomBlock>
  )
}
