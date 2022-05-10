import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import CustomBlock from 'components/Base/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';

import { setDepositCall, setSendCall, setWithdrawCall } from 'store/q-vault/action-creators';
import { accountBalance } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getQVaultDepositAmount } from 'contracts/helpers/q-vault-helper';

import { WARNING_MAX_NUMBER } from 'constants/statuses';
import { BN, isAddress } from 'func/useful';

export default function ManageBalance ({ maxQVaultWithdrawAmount }) {
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);
  const depositMax = useSelector(accountBalance);

  const { register: registerSend, handleSubmit: submitSend, errors: errorsSend, setValue: setSendValue } = useForm();

  const {
    register: registerDeposit,
    handleSubmit: submitDeposit,
    errors: errorsDeposit,
    setValue: setDepositValue,
    setError: setDepositError,
    clearErrors: clearDepositErrors
  } = useForm();

  const {
    register: registerWithdraw,
    handleSubmit: submitWithdraw,
    errors: errorsWithdraw,
    setValue: setWithdrawValue
  } = useForm();

  const [maxQVaultDepositAmount, setMaxQVaultDepositAmount] = useState(null);

  useEffect(() => {
    if (depositMax) {
      fetchQVaultDepositAmount();
    }
  }, [depositMax]);

  async function fetchQVaultDepositAmount () {
    const amount = await getQVaultDepositAmount(address, depositMax);
    setMaxQVaultDepositAmount(amount);
  }

  async function handleDepositMax () {
    if (maxQVaultDepositAmount > 0) {
      setDepositValue('amount', maxQVaultDepositAmount);
      setDepositError('amount', {
        message: WARNING_MAX_NUMBER
      });
    }
  }

  function handleWithdrawMax () {
    if (Number(maxQVaultWithdrawAmount) > 0) {
      setWithdrawValue('amount', maxQVaultWithdrawAmount);
    }
  }

  function handleSendMax () {
    if (Number(maxQVaultWithdrawAmount) > 0) {
      setSendValue('amount', maxQVaultWithdrawAmount);
    }
  }

  function handleChangeDepositAmount (event) {
    const { value } = event.target;
    const moreThanMaxAmount = BN(value).comparedTo(BN(maxQVaultDepositAmount));

    if (moreThanMaxAmount === 0) {
      setDepositError('amount', {
        message: WARNING_MAX_NUMBER
      });
    } else {
      if (moreThanMaxAmount === 1) {
        setDepositValue('amount', maxQVaultDepositAmount);
        setDepositError('amount', {
          message: WARNING_MAX_NUMBER
        });
      } else {
        clearDepositErrors();
      }
    }
  }

  function setDepositAmount (formData) {
    dispatch(setDepositCall(address, formData.amount));
    setDepositValue('amount', null);
  }

  function setSendAmount (formData) {
    dispatch(setSendCall(formData.address, formData.amount));
    setSendValue('amount', null);
    setSendValue('address', null);
  }

  function setWithdrawAmount (formData) {
    dispatch(setWithdrawCall(address, formData.amount));
    setWithdrawValue('amount', null);
  }

  return (
    <CustomBlock>
      <h1>Manage Balance</h1>
      <h4>Transfer Into Q Vault</h4>
      <div className="card__one-line-simple-form">
        <FormInput
          ref={registerDeposit({
            required: 'Please, fill the field',
            pattern: {
              value: /[0-9.]/gim,
              message: 'Invalid amount'
            }
          })}
          prefix="Q"
          min={0}
          color={true}
          name="amount"
          type="number"
          placeholder="0.0"
          error={errorsDeposit.amount?.message}
          onMaxClick={handleDepositMax}
          onChange={handleChangeDepositAmount}
        />
        <Button
          type="outline"
          title="Transfer"
          width="90px"
          handleButton={submitDeposit(setDepositAmount)}
        />
      </div>
      <h4>Withdraw from Q Vault</h4>
      <div className="card__one-line-simple-form">
        <FormInput
          ref={registerWithdraw({
            required: 'Please, fill the field',
            pattern: {
              value: /[0-9.]/gim,
              message: 'Invalid amount'
            }
          })}
          min={0}
          prefix="Q"
          name="amount"
          color={true}
          type="number"
          placeholder="0.0"
          error={errorsWithdraw.amount?.message}
          onMaxClick={handleWithdrawMax}
        />
        <Button
          type="outline"
          title="Withdraw"
          width="90px"
          handleButton={submitWithdraw(setWithdrawAmount)}
        />
      </div>
      <h4>Send to foreign QVault account</h4>
      <div className="card__one-line-form-2-2-1">
        <h4>Address</h4>
        <h4>Amount</h4>
      </div>
      <div className="card__one-line-form-2-2-1">
        <FormInput
          ref={registerSend({
            required: 'Please, fill the field',
            validate: (address) => (isAddress(address) ? true : 'Incorrect address')
          })}
          name="address"
          type="text"
          placeholder="0x000"
          color={true}
          error={errorsSend.address?.message}
        />

        <FormInput
          ref={registerSend({
            required: 'Please, fill the field',
            pattern: {
              value: /[0-9.]/gim,
              message: 'Invalid amount'
            }
          })}
          color={true}
          min={0}
          name="amount"
          type="number"
          prefix="Q"
          placeholder="0.00"
          error={errorsSend.amount?.message}
          onMaxClick={handleSendMax}
        />
        <div className="card__one-line-form-2-2-1-action">
          <Button
            width="90px"
            title="Send"
            type="outline"
            handleButton={submitSend(setSendAmount)}
          />
        </div>
      </div>
    </CustomBlock>
  );
}
