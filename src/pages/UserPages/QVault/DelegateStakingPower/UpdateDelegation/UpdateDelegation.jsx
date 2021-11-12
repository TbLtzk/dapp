import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/user-inf/selectors'
import { userBalance } from 'store/q-vault/selectors'
import { setDelegateStake } from 'store/q-vault/action-creators'
import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'

import { ComponentHandler } from './handler'

import { useAlert } from 'react-alert'

export default function UpdateDelegation () {
  const { register: reg1 } = useForm()
  const dispatch = useDispatch()
  const address = useSelector(userAddressMetamask)
  const userQVBalanceL = useSelector(userBalance)

  const compHandler = new ComponentHandler(useAlert())

  const [items, setItems] = useState(1)

  function addInputContainer () {
    if (items < 30) setItems(items + 1)
  }

  function removeInputContainer () {
    if (items > 1) setItems(items - 1)
  }

  function updateDelegations (applyZeroShare) {
    const data = compHandler.getAddressesAndShares(applyZeroShare, userQVBalanceL)
    if (data.addresses.length !== 0 && data.shares.length !== 0) {
      dispatch(setDelegateStake(address, data.addresses, data.shares))
    }
  }

  function getForms () {
    const elements = []
    for (let i = 0; i < items; i++) {
      elements.push(
                <div key={i + 'input_address'} className="card__one-line-form-2-2-1">
                        <FormInput
                            color={true}
                            name="address"
                            type="text"
                            placeholder="0x000"
                            ref={reg1({
                              required: 'Field is required!',
                              pattern: /[0-9]/i
                            })}
                        />
                        <FormInput
                            color={true}
                            name="share"
                            type="number"
                            lbl="Q"
                            placeholder="0.00"
                            ref={reg1({
                              required: 'Field is required!',
                              min: 100
                            })}
                        />
                    <div className="card__one-line-form-2-2-1-action">
                        <Button type="outline" icon="plus" width="37px" handleButton={() => addInputContainer()} />
                        <Button type="outline" icon="minus" width="37px" handleButton={() => removeInputContainer()} />
                    </div>
                </div>
      )
    }
    return elements
  }

  return (
        <>
            <h3>Update Delegation</h3>
            <div className="card__one-line-form-2-2-1">
                <p>Address</p>
                <p>Share</p>
            </div>

            {getForms()}

            <div className="card__actions" style={{ marginBottom: '30px' }}>
                <Button
                    icon="cached"
                    type="outline"
                    title="Update Delegation"
                    handleButton={() => updateDelegations(false)}
                />
                <Button
                    type="outline"
                    icon="minus-circle-outline"
                    title="Remove Delegation"
                    handleButton={() => updateDelegations(true)}
                />
            </div>
        </>
  )
}
