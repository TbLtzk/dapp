import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import ErrorInputMessage from 'components/Base/ErrorInputMessage';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setDepositCall } from 'store/q-vault/action-creators';
import { accountBalance } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getQVaultDepositAmount } from 'contracts/helpers/q-vault-helper';

import formTypes from 'constants/form-types';
import { WARNING_MAX_NUMBER } from 'constants/statuses';
import { amount, required } from 'func/validators';

function TransferForm () {
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);
  const balance = useSelector(accountBalance);

  const [maxAmount, setMaxAmount] = useState('0');
  const form = useForm({
    initialValues: { amount: '' },
    validators: {
      amount: [required, amount(maxAmount)],
    },
    onSubmit: (form) => {
      dispatch(setDepositCall(address, form.amount));
    }
  });
  useMetamaskReset(formTypes.qVaultDeposit, form);

  const updateMaxAmount = async () => {
    const depositAmount = await getQVaultDepositAmount(address, balance);
    setMaxAmount(depositAmount);
  };

  useEffect(() => {
    updateMaxAmount();
  }, [balance]);

  return (
    <form noValidate onSubmit={form.submit}>
      <div className="card__one-line-simple-form">
        <Input
          {...form.fields.amount}
          type="number"
          label="Transfer Into Q Vault"
          prefix="Q"
          max={maxAmount}
          placeholder="0.0"
        />
        <Button
          type="submit"
          style={{ width: '90px' }}
          disabled={!form.isValid}
        >
          Transfer
        </Button>
        {Number(maxAmount) && form.values.amount === maxAmount
          ? <ErrorInputMessage message={WARNING_MAX_NUMBER} />
          : null
        }
      </div>
    </form>
  );
}

export default TransferForm;
