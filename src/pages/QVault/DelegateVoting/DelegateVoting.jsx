import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/user-inf/selectors'
import { getDelegationInfo, setAnnounceNewVotingAgent, setNewVotingAgent } from 'store/q-vault/action-creators'
import { getNowTimestamp, remainDate } from 'func/convertDate'
import { fromWei } from 'func/balance'
import { receivedWeight, votingAgent, isPendingDelegation, votingAgentPassOverTime } from 'store/q-vault/selectors'

import CustomBlock from 'components/Base/CustomBlock'
import CardBlock from 'components/Base/CardBlock'

import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'
import { useForm } from 'react-hook-form'
import { getVoteDelegation } from 'contracts/helpers/voting-helpers/base-voting-helper'
import { isAddress } from 'func/useful'

function DelegateVoting () {
  const dispatch = useDispatch()

  const address = useSelector(userAddressMetamask)
  const weight = useSelector(receivedWeight)
  const agent = useSelector(votingAgent)
  const isPending = useSelector(isPendingDelegation)
  const time = useSelector(votingAgentPassOverTime)

  const { register, handleSubmit, errors, setCurrentType } = useForm('announce')

  useEffect(() => {
    dispatch(getDelegationInfo(address))
  }, [])

  async function handleAnnounce (formData) {
    setCurrentType('announce')
    dispatch(setAnnounceNewVotingAgent(formData.address))
  }

  async function handleDelegate () {
    dispatch(setNewVotingAgent())
  }

  const { delegateInfo } = getVoteDelegation(agent, weight, address)

  return (
        <CustomBlock>
            <h1>Delegate Voting Power</h1>
            <h5>Total Voting Weight</h5>
            <h4>{fromWei(weight)}</h4>
            <h5>Current agent</h5>
            <h4>{delegateInfo}</h4>
            {!isPending
              ? null
              : time - getNowTimestamp() > 0
                ? (
                <>
                    <h5>Delegation info</h5>
                    <h4>{`This delegation info is currently pending. It can be finalized after ${remainDate(
                        time
                    )}`}</h4>
                </>
                  )
                : (
                <CardBlock
                    title="Confirm announced voting agent"
                    firstContent="This delegation info is currently pending. Need to confirm."
                    iconFontSize="20px"
                    btnTitle="Confirm"
                    btnHandler={handleDelegate}
                />
                  )}
            <div className="card__line" />
            <h3>Announce new voting agent</h3>
            <h4>Address</h4>
            <div className="card__one-line-simple-form">
                <FormInput
                    color={true}
                    name="address"
                    placeholder="0x000"
                    type="text"
                    ref={register({
                      required: 'Field is required!',
                      validate: (address) => (isAddress(address) ? true : 'Incorrect address')
                    })}
                    valid={errors?.address?.message}
                />
                <Button type="outline" title="Announce" width="90px" handleButton={handleSubmit(handleAnnounce)} />
            </div>
            <h4>This will immediately reduce the voting weight of your voting agent for new voting</h4>
        </CustomBlock>
  )
}

export default DelegateVoting
