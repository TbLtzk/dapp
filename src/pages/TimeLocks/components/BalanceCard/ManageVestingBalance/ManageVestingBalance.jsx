import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Base/Button';
import FormInput from 'components/Base/Form/FormInput';

import useInputForm from 'hooks/useInputForm';

import { setVestingWithdraw } from 'store/vesting/action-creators';

import formTypes from 'constants/form-types';

function ManageVestingBalance () {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useInputForm(formTypes.vestingWithdraw);

  const handleWithdrawVesting = (formData) => {
    dispatch(setVestingWithdraw(formData.amountQ));
  };

  return (
    <>
      <h4>Amount</h4>
      <FormInput
        ref={register({
          required: 'Please, fill the field',
          pattern: /[0-9]/i
        })}
        prefix="Q"
        min={0}
        name="amountQ"
        type="number"
        placeholder="0.0"
        error={errors.amountQ?.message}
      />
      <Button
        position="relative"
        right="-367px"
        type="outline"
        margin="0px 0px 12px 0px"
        title="Withdraw"
        width="90px"
        onClick={handleSubmit(handleWithdrawVesting)}
      />
      <div className="modal-line" />
    </>
  );
}

export default ManageVestingBalance;
