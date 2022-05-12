import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setSendCall } from 'store/q-vault/action-creators';
import { qVaultMinimumTimeLock, userBalance } from 'store/q-vault/selectors';

import formTypes from 'constants/form-types';
import { subtractAmount } from 'func/balance';
import { address, amount, required } from 'func/validators';

function SendForm () {
  const dispatch = useDispatch();

  const userQVaultBalance = useSelector(userBalance);
  const qVaultLockedAmount = useSelector(qVaultMinimumTimeLock);

  const maxAmount = subtractAmount(userQVaultBalance, qVaultLockedAmount);
  const form = useForm({
    initialValues: { address: '', amount: '' },
    validators: {
      address: [required, address],
      amount: [required, amount(maxAmount)],
    },
    onSubmit: (form) => {
      dispatch(setSendCall(form.address, form.amount));
    }
  });

  useMetamaskReset(formTypes.qVaultSend, form);

  return (
    <form noValidate onSubmit={form.submit}>
      <h4>Send to foreign QVault account</h4>
      <div className="card__send-form">
        <Input
          {...form.fields.address}
          label="Address"
          prefix={<i className="mdi mdi-wallet-outline btn-icon" />}
          placeholder="0x000"
        />
        <Input
          {...form.fields.amount}
          type="number"
          label="Amount"
          prefix="Q"
          max={maxAmount}
          placeholder="0.0"
        />
        <div className="card__one-line-form-2-2-1-action">
          <Button
            type="submit"
            title="Send"
            style={{ width: '90px' }}
            disabled={!form.isValid}
          />
        </div>
      </div>
    </form>
  );
}

export default SendForm;
