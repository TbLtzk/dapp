import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import FormInput from 'components/Base/Form/FormInput';

import { setDelegateStake } from 'store/q-vault/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { toWei } from 'func/balance';
import { fillArray, isAddress } from 'func/useful';

export default function UpdateDelegation () {
  const { register, handleSubmit, setValue } = useForm();

  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);

  const [items, setItems] = useState(1);

  function addInputContainer () {
    if (items < 30) {
      setItems(items + 1);
    }
  }

  function removeInputContainer () {
    if (items > 1) {
      setItems(items - 1);
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
    delegatedTo.forEach((_, idx) => {
      setValue(`address${idx}`, null);
      setValue(`share${idx}`, null);
    });
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
      {fillArray(items).map((_, idx) => (
        <div key={idx + 'input_address'} className="card__one-line-form-2-2-1">
          <FormInput
            ref={register({
              required: 'Please, fill the field',
              validate: (address) => isAddress(address)
            })}
            color={true}
            name={'address' + idx}
            type="text"
            placeholder="0x000"
          />
          <FormInput
            ref={register({
              required: 'Please, fill the field',
              pattern: /[0-9]/i
            })}
            color={true}
            name={'share' + idx}
            type="number"
            prefix="Q"
            placeholder="0.00"
          />
          <div className="card__one-line-form-2-2-1-action">
            <Button
              type="outline"
              icon="plus"
              width="37px"
              handleButton={addInputContainer}
            />
            <Button
              type="outline"
              icon="minus"
              width="37px"
              handleButton={removeInputContainer}
            />
          </div>
        </div>
      ))}
      <div className="card__actions" style={{ marginBottom: '30px' }}>
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
