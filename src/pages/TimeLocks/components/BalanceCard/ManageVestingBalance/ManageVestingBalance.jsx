import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import FormInput from 'components/Base/Form/FormInput';

import useInputForm from 'hooks/useInputForm';

import { setVestingWithdraw } from 'store/vesting/action-creators';

function ManageVestingBalance () {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, setCurrentType } = useInputForm('withdraw-vesting');

  const handleWithdrawVesting = (formData) => {
    setCurrentType('withdraw-vesting');
    dispatch(setVestingWithdraw(formData.amountQ));
  };

  return (
    <>
      <h4>Amount</h4>
      <FormInput
        ref={register({
          required: 'Field is required!',
          pattern: /[0-9]/i
        })}
        lbl={'Q'}
        min={0}
        name="amountQ"
        type="number"
        placeholder="0.0"
        valid={errors.amountQ?.message}
      />
      <Button
        position="relative"
        right="-367px"
        type="outline"
        margin="0px 0px 12px 0px"
        title="Withdraw"
        width="90px"
        handleButton={handleSubmit(handleWithdrawVesting)}
      />
      <div className="modal-line" />
    </>
  );
}

export default ManageVestingBalance;
