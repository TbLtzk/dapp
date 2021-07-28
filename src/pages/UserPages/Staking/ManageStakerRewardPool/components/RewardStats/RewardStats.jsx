import React, { useEffect, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'

import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'

import { useForm } from 'react-hook-form'
import Handler from './handler'

import { errorHandler, fN } from 'func/useful'

export default function RewardStats () {
  const {
    register: reg1,
    handleSubmit: submit1,
    errors: err1
  } = useForm()
  const {
    register: reg2,
    handleSubmit: submit2,
    errors: err2
  } = useForm()

  const [amountRP, setAmountRP] = useState(0)
  const [delShare, setDelShare] = useState(0)
  const [intRate, setIntRate] = useState(0)

  const address = useSelector(userAddressMetamask)
  const handler = new Handler(address, useDispatch())

  useEffect(() => {
    handler.getAmountOfRewardPool(setAmountRP)
    handler.getDelegatorShare(setDelShare)
    handler.getInterestRate(setIntRate)
  }, [])

  const setInterestRate = (formData) => {
    handler.setInterestRate(formData, setIntRate)
  }

  const setDelegatorShare = (formData) => {
    handler.setDelegatorShare(formData, setDelShare)
  }

  const rewardStatsArr = useMemo(() => {
    return [
      [
        {
          label: 'Validator Pool Balance:',
          value: fN(amountRP) + 'Q'
        },
        {
          label: 'Validator Share:',
          value: delShare === 0 ? '100%' : fN(100 - delShare) + '%'
        }
      ],
      [
        {
          label: 'Delegator Share:',
          value: fN(delShare) + '%'
        },
        {
          label: 'Delegator Reward (p.a.):',
          value: fN(intRate) + '%'
        }
      ]
    ]
  }, [amountRP, delShare, intRate])

  return (
    <>
      <h3 className="title type-1">Reward Stats</h3>
      {rewardStatsArr?.map((line, index) => {
        return (
          <div key={index + '--reward-line'} style={{ display: 'flex' }}>
            {
              line.map(el => {
                return (
                  <div key={el.label + '-reward-stats'} style={{ width: '50%' }}>
                    <h5>{el.label}</h5>
                    <p>{el.value}</p>
                  </div>
                )
              })
            }
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
        <Button
          type="outline"
          title="Set"
          width="94px"
          handleButton={submit1(setDelegatorShare)}
        />
      </div>
      <h4>Set Delegator Reward (p.a.)</h4>
      <div className="modal-one-line-form">
        <FormInput
          name="amount"
          type="number"
          lbl="%"
          placeholder="0"
          palette="dark"
          ref={reg2({
            required: true,
            min: 0,
            max: 100.0001
          })}
          valid={errorHandler(err2, 'amount')}
        />
        <Button
          type="outline"
          title="Set"
          width="94px"
          handleButton={submit2(setInterestRate)}
        />
      </div>
    </>
  )
}
