import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setWithdrawCall } from 'store/q-vault/action-creators';
import { qVaultMinimumTimeLock, userBalance } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types';
import { subtractAmount } from 'func/balance';
import { amount, required } from 'func/validators';

function WithdrawForm () {
  const dispatch = useDispatch();

  const address = useSelector(userAddressMetamask);
  const userQVaultBalance = useSelector(userBalance);
  const qVaultLockedAmount = useSelector(qVaultMinimumTimeLock);

  const maxAmount = subtractAmount(userQVaultBalance, qVaultLockedAmount);
  const form = useForm({
    initialValues: { amount: '' },
    validators: {
      amount: [required, amount(maxAmount)],
    },
    onSubmit: (form) => {
      dispatch(setWithdrawCall(address, form.amount));
    }
  });

  useMetamaskReset(formTypes.qVaultWithdraw, form);

  return (
    <form noValidate onSubmit={form.submit}>
      <div className="card__one-line-simple-form">
        <Input
          {...form.fields.amount}
          type="number"
          label="Withdraw from Q Vault"
          prefix="Q"
          max={maxAmount}
          placeholder="0.0"
        />
        <Button
          type="submit"
          style={{ width: '90px' }}
          disabled={!form.isValid}
        >
          Withdraw
        </Button>
      </div>
    </form>
  );
}

export default WithdrawForm;
