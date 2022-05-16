import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setVestingWithdraw } from 'store/vesting/action-creators';

import formTypes from 'constants/form-types';
import { required } from 'func/validators';

function VestingWithdrawForm () {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required] },
    onSubmit: (form) => {
      dispatch(setVestingWithdraw(form.amount));
    }
  });
  useMetamaskReset(formTypes.vestingWithdraw, form.reset);

  return (
    <form noValidate onSubmit={form.submit}>
      <h4>Amount</h4>
      <Input
        {...form.fields.amount}
        invertedColors
        type="number"
        prefix="Q"
        placeholder="0.0"
      />
      <Button
        type="submit"
        disabled={!form.isValid}
        style={{
          display: 'block',
          margin: '10px 0 10px auto'
        }}
      >
        Withdraw
      </Button>
      <div className="modal-line" />
    </form>
  );
}

export default VestingWithdrawForm;
