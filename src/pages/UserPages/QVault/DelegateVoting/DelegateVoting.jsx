import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'
import { getDelegationInfo, setAnnounceNewVotingAgent, setNewVotingAgent } from 'store/actions/action-creaters/q-vault'
import { remainDateTimeSince } from 'func/convertDate'
import { fromWei } from 'func/balance'
import {
  receivedWeight,
  votingAgent,
  isPendingDelegation,
  votingAgentPassOverTime
} from 'store/selectors/q-vault'

import CustomBlock from 'components/Base/CustomBlock'
import CardBlock from 'components/Base/CardBlock'

import 'react-datepicker/dist/react-datepicker.css'
import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'
import { useForm } from 'react-hook-form'

export default function LockCoin () {
  const dispatch = useDispatch()
  const address = useSelector(userAddressMetamask)
  const weight = useSelector(receivedWeight)
  const agent = useSelector(votingAgent)
  const isPending = useSelector(isPendingDelegation)
  const time = useSelector(votingAgentPassOverTime)

  const {
    register: reg1,
    handleSubmit: submit1,
    errors: err1
  } = useForm()

  useEffect(() => {
    dispatch(getDelegationInfo(address))
  }, [])

  async function announce (formData) {
    dispatch(setAnnounceNewVotingAgent(formData.address))
  }

  async function btnHandler () {
    dispatch(setNewVotingAgent())
  }

  return (
    <CustomBlock>
      <h1>Delegate Voting Power</h1>
      <h5>Received weight</h5>
      <h4>{fromWei(weight)}</h4>
      <h5>Current agent</h5>
      <h4>{
        agent === address
          ? 'You exercise your voting right yourself'
          : `You delegated. Your voting rights to ${agent}`
      }</h4>
      {
        !isPending
          ? null
          : +time > 0
              ? (
            <>
              <h5>Delegation info</h5>
              <h4>`This delegation info is currently pending. It can be finalized after ${remainDateTimeSince(+new Date() + +time)}`</h4>
            </>
                )
              : <CardBlock
            title={'Confirm announced voting agent'}
            firstContent={'This delegation info is currently pending. Need to confirm.'}
            iconFontSize={'20px'}
            btnTitle={'Confirm'}
            btnHandler={btnHandler}
          />

      }
      <div className="card__line"/>
      <h3>Announce new voting agent</h3>
      <h4>Address</h4>
      <div className={'card__one-line-form'}>
        <FormInput
          color={true}
          name="address"
          placeholder="0x000"
          type="text"
          ref={reg1({
            required: 'Field is required!',
            pattern: /[0-9]/i
          })}
          valid={err1.address?.message}
        />
        <Button
          type="outline"
          title="Announce"
          width="90px"
          handleButton={submit1(announce)}
        />
      </div>
      <h4>This will immediately reduce the voting weight of your voting agent for new votings</h4>
    </CustomBlock>
  )
}
