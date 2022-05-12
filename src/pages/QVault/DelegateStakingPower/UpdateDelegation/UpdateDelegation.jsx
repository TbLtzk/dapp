import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import FormInput from 'components/Base/Form/FormInput';

import useInputForm from 'hooks/useInputForm';

import { setDelegateStake } from 'store/q-vault/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types';
import { toWei } from 'func/balance';
import { fillArray, isAddress } from 'func/useful';

function UpdateDelegation () {
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);

  const { register, handleSubmit } = useInputForm(formTypes.qVaultDelegation);

  const [inputs, setInputs] = useState(1);

  function addInputField () {
    if (inputs < 30) {
      setInputs(inputs + 1);
    }
  }

  function removeInputField () {
    if (inputs > 1) {
      setInputs(inputs - 1);
    }
  }

  function trasformFormData (formData) {
    const delegatedTo = [];
    const stakes = [];
    Object.values(formData).forEach((item) =>
      item.startsWith('0x') ? delegatedTo.push(item) : stakes.push(toWei(Number(item)))
    );
    return [delegatedTo, stakes];
  }

  function updateDelegations (formData) {
    const [delegatedTo, stakes] = trasformFormData(formData);
    dispatch(setDelegateStake(address, delegatedTo, stakes));
  }

  return (
    <>
      <h3>Update Delegation</h3>
      <div className="card__one-line-form-2-2-1">
        <p>Address</p>
        <div style={{ position: 'relative' }}>
          <p>New Stake</p>
          <p style={{ fontSize: '10px', position: 'absolute', top: '18px' }}>0 will remove delegation </p>
        </div>
      </div>
      {fillArray(inputs).map((_, idx) => (
        <div key={idx + 'input_address'} className="card__one-line-form-2-2-1">
          <FormInput
            ref={register({
              required: 'Please, fill the field',
              validate: (address) => (isAddress(address) ? true : 'Incorrect address')
            })}
            name={'address' + idx}
            placeholder="0x000"
          />
          <FormInput
            ref={register({
              required: 'Please, fill the field',
              pattern: /[0-9]/i
            })}
            name={'share' + idx}
            type="number"
            prefix="Q"
            placeholder="0.00"
          />
          <div className="card__one-line-form-2-2-1-action">
            <Button
              icon="plus"
              style={{ width: '37px' }}
              onClick={addInputField}
            />
            <Button
              icon="minus"
              style={{ width: '37px' }}
              onClick={removeInputField}
            />
          </div>
        </div>
      ))}
      <div className="card__actions" style={{ marginBottom: '10px' }}>
        <Button
          icon="cached"
          title="Update Delegation"
          onClick={handleSubmit(updateDelegations)}
        />
      </div>
    </>
  );
}

export default UpdateDelegation;
