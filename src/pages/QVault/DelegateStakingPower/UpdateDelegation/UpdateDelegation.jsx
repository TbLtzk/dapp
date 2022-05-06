import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import FormInput from 'components/Base/Form/FormInput';

import useInputForm from 'hooks/useInputForm';

import { setDelegateStake } from 'store/q-vault/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { toWei } from 'func/balance';
import { fillArray, isAddress } from 'func/useful';

function UpdateDelegation () {
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);

  const { register, handleSubmit, setCurrentType } = useInputForm('delegation');

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
    setCurrentType('delegation');
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
              required: 'Field is required!',
              validate: (address) => (isAddress(address) ? true : 'Incorrect address')
            })}
            color={true}
            name={'address' + idx}
            type="text"
            placeholder="0x000"
          />
          <FormInput
            ref={register({
              required: 'Field is required!',
              pattern: /[0-9]/i
            })}
            color={true}
            name={'share' + idx}
            type="number"
            lbl="Q"
            placeholder="0.00"
          />
          <div className="card__one-line-form-2-2-1-action">
            <Button
              type="outline"
              icon="plus"
              width="37px"
              handleButton={addInputField}
            />
            <Button
              type="outline"
              icon="minus"
              width="37px"
              handleButton={removeInputField}
            />
          </div>
        </div>
      ))}
      <div className="card__actions" style={{ marginBottom: '10px' }}>
        <Button
          icon="cached"
          type="outline"
          title="Update Delegation"
          handleButton={handleSubmit(updateDelegations)}
        />
      </div>
    </>
  );
}

export default UpdateDelegation;
