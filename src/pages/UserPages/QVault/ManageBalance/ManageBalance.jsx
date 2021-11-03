import React, { useEffect, useState } from 'react'
import CustomBlock from 'components/Base/CustomBlock'
import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'

import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { setDepositCall, setWithdrawCall } from 'store/actions/action-creaters/q-vault'
import { userAddressMetamask } from 'store/selectors/user-inf'
import { accountBalance } from 'store/selectors/q-vault'
import { getQVaultDepositAmount } from 'contracts/helpers/q-vault-helper'
import { WARNING_MAX_NUMBER } from 'constants/statuses'

export default function ManageBalance ({ maxQVaultWithdrawAmount }) {
  const {
    register: reg2,
    handleSubmit: submit2,
    errors: err2,
    setValue: setTransferMax,
    setError: setTransferMaxError,
    clearErrors: clearTransferMaxError
  } = useForm()
  const { register: reg3, handleSubmit: submit3, errors: err3, setValue: setWithdrawMax } = useForm()

  const [maxQVaultTransferAmount, setMaxQVaultTransferAmount] = useState(null)

  const dispatch = useDispatch()
  const address = useSelector(userAddressMetamask)
  const transferMax = useSelector(accountBalance)

  useEffect(() => {
    if (transferMax) {
      fetchQVaultTransferAmount()
    }
  }, [transferMax])

  async function fetchQVaultTransferAmount () {
    const amount = await getQVaultDepositAmount(address, transferMax)
    setMaxQVaultTransferAmount(amount)
  }

  async function handleTransferMax () {
    console.log(maxQVaultTransferAmount)
    if (Number(maxQVaultTransferAmount) > 0) {
      setTransferMax('amountQ', maxQVaultTransferAmount)
      setTransferMaxError('amountQ', {
        message: WARNING_MAX_NUMBER
      })
    }
  }

  function handleChangeTransferAmount (event) {
    if (Number(event.target.value) === maxQVaultTransferAmount) {
      setTransferMaxError('amountQ', {
        message: WARNING_MAX_NUMBER
      })
    } else {
      clearTransferMaxError()
    }
  }

  function handleWithdrawMax () {
    if (maxQVaultWithdrawAmount > 0) {
      setWithdrawMax('amountQ', maxQVaultWithdrawAmount)
    }
  }

  function setDepositL (formData) {
    dispatch(setDepositCall(address, formData.amountQ))
    setTransferMax('amountQ', null)
  }

  function withdrawL (formData) {
    dispatch(setWithdrawCall(address, formData.amountQ))
    setWithdrawMax('amountQ', null)
  }

  return (
        <CustomBlock>
            <h1>Manage Balance</h1>
            <h4>Transfer Into Q Vault</h4>
            <div className="card__one-line-form">
                <FormInput
                    lbl='Q'
                    min={0}
                    color={true}
                    name="amountQ"
                    onChange={handleChangeTransferAmount}
                    type="number"
                    placeholder="0.0"
                    ref={reg2({
                      required: 'Field is required!',
                      pattern: /[0-9]/i
                    })}
                    onMaxClick={handleTransferMax}
                    valid={err2.amountQ?.message}
                />
                <Button type="outline" title="Transfer" width="90px" handleButton={submit2(setDepositL)} />
            </div>
            <h4>Withdraw from Q Vault</h4>
            <div className="card__one-line-form">
                <FormInput
                    min={0}
                    name="amountQ"
                    color={true}
                    type="number"
                    lbl='Q'
                    placeholder="0.0"
                    onMaxClick={handleWithdrawMax}
                    ref={reg3({ required: 'Field is required!' })}
                    valid={err3.amountQ?.message}
                />
                <Button type="outline" title="Withdraw" width="90px" handleButton={submit3(withdrawL)} />
            </div>
        </CustomBlock>
  )
}
