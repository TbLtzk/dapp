import React, { useEffect, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'
import { delegatedStakeSelector } from 'store/selectors/validators'
import { delegatorShare, balance, poolInfo } from 'store/selectors/validation-reward-pools'
import {
  getVRPBalance,
  getVRPDelegatorsShare,
  getVRPPoolInfo,
  setVRPDelegatorsShare
} from 'store/actions/action-creaters/validation-reward-pools'

import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'

import { useForm } from 'react-hook-form'

import { errorHandler, fN } from 'func/useful'

export default function RewardStats ({ setModalShow }) {
  const { register: reg1, handleSubmit: submit1, errors: err1 } = useForm()

  const dispatch = useDispatch()

  const delegatedStake = useSelector(delegatedStakeSelector)
  const userDelegatorShare = useSelector(delegatorShare)
  const userBalance = useSelector(balance)
  const userPoolInfo = useSelector(poolInfo)

  const address = useSelector(userAddressMetamask)

  useEffect(() => {
    dispatch(getVRPDelegatorsShare(address))
    dispatch(getVRPBalance(address))
    dispatch(getVRPPoolInfo(address))
  }, [])

  const setDelegatorShareFunc = (formData) => {
    dispatch(setVRPDelegatorsShare(formData.amount))
    setModalShow()
  }

  const disDelClaims = userBalance - userPoolInfo

  const rewardStatsArr = useMemo(() => {
    return [
      [
        {
          label: 'Collected Pool Rewards:',
          value: fN(userBalance) + 'Q'
        },
        {
          label: 'Outstanding Delegator Claims:',
          value: fN(userPoolInfo) + 'Q'
        },
        {
          label: 'Distributable Delegator Rewards:',
          value: fN(disDelClaims) + 'Q'
        },
        {
          label: 'Distributable Delegator Percentage:',
          value: fN(disDelClaims / delegatedStake) + '%'
        }
      ],
      [
        {
          label: 'Validator Share:',
          value: userDelegatorShare === 0 ? '100%' : fN(100 - userDelegatorShare) + '%'
        },
        {
          label: 'Delegator Share:',
          value: fN(userDelegatorShare) + '%'
        }
      ]
    ]
  }, [userBalance, userDelegatorShare, userPoolInfo, disDelClaims, delegatedStake])

  return (
        <>
            <h3 className="title type-1">Reward Stats</h3>
            {rewardStatsArr?.map((line, index) => {
              return (
                    <div key={index + '--reward-line'} style={{ display: 'flex' }}>
                        {line.map((el) => {
                          return (
                                <div key={el.label + '-reward-stats'} style={{ width: '50%' }}>
                                    <h5>{el.label}</h5>
                                    <p>{el.value}</p>
                                </div>
                          )
                        })}
                    </div>
              )
            })}
            <h4>Set Delegator Share</h4>
            <div className="modal-one-line-form">
                <FormInput
                    name="amount"
                    type="number"
                    lbl="%"
                    placeholder="0"
                    palette="dark"
                    ref={reg1({
                      required: true,
                      min: 0,
                      max: 100.0001
                    })}
                    valid={errorHandler(err1, 'amount')}
                />
                <Button type="outline" title="Set" width="94px" handleButton={submit1(setDelegatorShareFunc)} />
            </div>
        </>
  )
}
