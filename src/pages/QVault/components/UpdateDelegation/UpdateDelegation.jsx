import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uniqueId } from 'lodash';

import Button from 'components/Base/Buttons/Button';

import useMetamaskReset from 'hooks/useMetamaskReset';

import DelegationForm from './DelegationForm';

import { setDelegateStake } from 'store/q-vault/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types';
import { toWei } from 'func/balance';

function UpdateDelegation () {
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);

  const [forms, setForms] = useState([uniqueId()]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useMetamaskReset(formTypes.qVaultDelegation, () => {
    setForms([uniqueId()]);
  });

  function addForm () {
    if (forms.length >= 30) return;
    setForms(prev => [...prev, uniqueId()]);
  }

  function removeForm (id) {
    if (forms.length === 1) return;
    setForms(prev => prev.filter(form => form !== id));
  }

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

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

  const handleFormSubmit = (id, form) => {
    console.log(id, form);
  };

  return (
    <>
      <h3>Update Delegation</h3>
      <div className="card__one-line-form-2-2-1">
        <p>Address</p>
        <div style={{ position: 'relative' }}>
          <p>New Stake</p>
          <p style={{ fontSize: '10px', position: 'absolute', top: '18px' }}>
            0 will remove delegation
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {forms.map(id => (
          <DelegationForm
            key={id}
            isSubmitting={isSubmitting}
            onAdd={addForm}
            onRemove={() => removeForm(id)}
            onSubmit={form => handleFormSubmit(id, form)}
          />
        ))}
      </div>

      <div className="card__actions" style={{ marginBottom: '10px' }}>
        <Button
          icon="cached"
          type="outline"
          title="Update Delegation"
          handleButton={handleSubmit}
        />
      </div>
    </>
  );
}

export default UpdateDelegation;
