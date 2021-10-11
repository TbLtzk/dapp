import React from 'react'
import CustomBlock from 'components/Base/CustomBlock'
import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'

import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { setDepositCall, setWithdrawCall } from 'store/actions/action-creaters/q-vault'
import { userAddressMetamask } from 'store/selectors/user-inf'

export default function ManageBalance () {
  const {
    register: reg2,
    handleSubmit: submit2,
    errors: err2
  } = useForm()
  const {
    register: reg3,
    handleSubmit: submit3,
    errors: err3
  } = useForm()

  const dispatch = useDispatch()
  const address = useSelector(userAddressMetamask)

  function setDepositL (formData) {
    dispatch(setDepositCall(address, formData.amountQ))
  }

  function withdrawL (formData) {
    dispatch(setWithdrawCall(address, formData.amountQ))
  }

  return (
    <CustomBlock>
      <h1>Manage Balance</h1>
      <h4>Transfer Into Q Vault</h4>
      <div className={'card__one-line-form'}>
        <FormInput
          lbl={'Q'}
          min={0}
          color={true}
          name="amountQ"
          type="number"
          placeholder="0.0"
          ref={reg2({
            required: 'Field is required!',
            pattern: /[0-9]/i
          })}
          valid={err2.amountQ?.message}
        />
        <Button
          type="outline"
          title="Transfer"
          width="90px"
          handleButton={submit2(setDepositL)}
        />
      </div>
      <h4>Withdraw from Q Vault</h4>
      <div className={'card__one-line-form'}>
        <FormInput
          min={0}
          name="amountQ"
          color={true}
          type="number"
          lbl={'Q'}
          placeholder="0.0"
          ref={reg3({ required: 'Field is required!' })}
          valid={err3.amountQ?.message}
        />
        <Button
          type="outline"
          title="Withdraw"
          width="90px"
          handleButton={submit3(withdrawL)}
        />
      </div>
    </CustomBlock>
  )
}
