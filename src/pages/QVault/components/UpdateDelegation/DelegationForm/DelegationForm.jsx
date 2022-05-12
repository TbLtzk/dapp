import React, { useEffect } from 'react';

import Button from 'components/Base/Buttons/Button';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';

import { address, required } from 'func/validators';

function DelegationForm ({
  onAdd,
  onRemove,
  onChange
}) {
  const form = useForm({
    initialValues: { address: '', amount: '' },
    validators: {
      address: [required, address],
      amount: [required],
    },
  });

  useEffect(() => {
    onChange(form);
  }, [form.values, onChange]);

  return (
    <form
      noValidate
      className="card__one-line-form-2-2-1"
      onSubmit={e => e.preventDefault()}
    >
      <Input
        {...form.fields.address}
        placeholder="0x000"
      />
      <Input
        {...form.fields.amount}
        type="number"
        prefix="Q"
        placeholder="0.00"
      />
      <div className="card__one-line-form-2-2-1-action">
        <Button
          type="button"
          icon="plus"
          width="37px"
          handleButton={onAdd}
        />
        <Button
          type="button"
          icon="minus"
          width="37px"
          handleButton={onRemove}
        />
      </div>
    </form>
  );
}

export default DelegationForm;
