import React, { useEffect, useState } from 'react'
import CustomBlock from 'components/Base/CustomBlock'
import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'

import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { setDepositCall, setWithdrawCall, setSendCall } from 'store/q-vault/action-creators'
import { userAddressMetamask } from 'store/user-inf/selectors'
import { accountBalance } from 'store/q-vault/selectors'
import { getQVaultDepositAmount } from 'contracts/helpers/q-vault-helper'
import { WARNING_MAX_NUMBER } from 'constants/statuses'
import { BN, isAddress } from 'func/useful'

export default function ManageBalance ({ maxQVaultWithdrawAmount }) {
  const dispatch = useDispatch()
  const address = useSelector(userAddressMetamask)
  const depositMax = useSelector(accountBalance)

  const {
    register: registerSend,
    handleSubmit: submitSend,
    errors: errorsSend,
    setValue: setSendValue,
    clearErrors: clearSendErrors
  } = useForm()

  const {
    register: registerDeposit,
    handleSubmit: submitDeposit,
    errors: errorsDeposit,
    setValue: setDepositValue,
    setError: setDepositError,
    clearErrors: clearDepositErrors
  } = useForm()

  const {
    register: registerWithdraw,
    handleSubmit: submitWithdraw,
    errors: errorsWithdraw,
    setValue: setWithdrawValue,
    clearErrors: clearWithdrawErrors
  } = useForm()

  const [maxQVaultDepositAmount, setMaxQVaultDepositAmount] = useState(null)

  useEffect(() => {
    if (depositMax) {
      fetchQVaultDepositAmount()
    }
  }, [depositMax])

  async function fetchQVaultDepositAmount () {
    const amount = await getQVaultDepositAmount(address, depositMax)
    setMaxQVaultDepositAmount(amount)
  }

  async function handleDepositMax () {
    if (maxQVaultDepositAmount > 0) {
      setDepositValue('amount', maxQVaultDepositAmount)
      setDepositError('amount', {
        message: WARNING_MAX_NUMBER
      })
    }
  }

  function handleWithdrawMax () {
    if (Number(maxQVaultWithdrawAmount) > 0) {
      setWithdrawValue('amount', maxQVaultWithdrawAmount)
    }
  }

  function handleSendMax () {
    if (Number(maxQVaultWithdrawAmount) > 0) {
      setSendValue('amount', maxQVaultWithdrawAmount)
    }
  }

  function handleChangeDepositAmount (event) {
    const { value } = event.target
    const moreThanMaxAmount = BN(value).comparedTo(BN(maxQVaultDepositAmount))

    if (moreThanMaxAmount === 0) {
      setDepositError('amount', {
        message: WARNING_MAX_NUMBER
      })
    } else {
      if (moreThanMaxAmount === 1) {
        setDepositValue('amount', maxQVaultDepositAmount)
        setDepositError('amount', {
          message: WARNING_MAX_NUMBER
        })
      } else {
        clearDepositErrors()
      }
    }
  }

  function setDepositAmount (formData) {
    dispatch(setDepositCall(address, formData.amount))
    setDepositValue('amount', null)
  }

  function setSendAmount (formData) {
    dispatch(setSendCall(formData.address, formData.amount))
    setSendValue('amount', null)
    setSendValue('address', null)
  }

  function setWithdrawAmount (formData) {
    dispatch(setWithdrawCall(address, formData.amount))
    setWithdrawValue('amount', null)
  }

  return (
        <CustomBlock>
            <h1>Manage Balance</h1>
            <h4>Transfer Into Q Vault</h4>
            <div className="card__one-line-simple-form">
                <FormInput
                    lbl="Q"
                    min={0}
                    color={true}
                    name="amount"
                    type="number"
                    placeholder="0.0"
                    onMaxClick={handleDepositMax}
                    onClick={() => clearDepositErrors('amount')}
                    onChange={handleChangeDepositAmount}
                    ref={registerDeposit({
                      required: 'Field is required!'
                    })}
                    valid={errorsDeposit.amount?.message}
                />
                <Button type="outline" title="Transfer" width="90px" handleButton={submitDeposit(setDepositAmount)} />
            </div>
            <h4>Withdraw from Q Vault</h4>
            <div className="card__one-line-simple-form">
                <FormInput
                    min={0}
                    lbl="Q"
                    name="amount"
                    color={true}
                    type="number"
                    placeholder="0.0"
                    onMaxClick={handleWithdrawMax}
                    onClick={() => clearWithdrawErrors('amount')}
                    ref={registerWithdraw({
                      required: 'Field is required!'
                    })}
                    valid={errorsWithdraw.amount?.message}
                />
                <Button type="outline" title="Withdraw" width="90px" handleButton={submitWithdraw(setWithdrawAmount)} />
            </div>
            <h4>Send to foreign QVault account</h4>
            <div className="card__one-line-form-2-2-1">
                <h4>Address</h4>
                <h4>Amount</h4>
            </div>
            <div className="card__one-line-form-2-2-1">
                <FormInput
                    name="address"
                    type="text"
                    placeholder="0x000"
                    color={true}
                    valid={errorsSend.address?.message}
                    onClick={() => clearSendErrors('address')}
                    ref={registerSend({
                      required: 'Field is required!',
                      validate: (address) => (isAddress(address) ? true : 'Incorrect address')
                    })}
                />

                <FormInput
                    color={true}
                    min={0}
                    name="amount"
                    type="number"
                    lbl="Q"
                    placeholder="0.00"
                    onMaxClick={handleSendMax}
                    onClick={() => clearSendErrors('amount')}
                    ref={registerSend({
                      required: 'Field is required!'
                    })}
                    valid={errorsSend.amount?.message}
                />
                <div className="card__one-line-form-2-2-1-action">
                    <Button width="90px" title="Send" type="outline" handleButton={submitSend(setSendAmount)} />
                </div>
            </div>
        </CustomBlock>
  )
}
