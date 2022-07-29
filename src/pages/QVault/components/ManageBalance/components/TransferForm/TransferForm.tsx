import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setDepositCall } from 'store/q-vault/action-creators';
import { accountBalance } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getQVaultDepositAmount } from 'contracts/helpers/q-vault-helper';

import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function TransferForm () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);
  const balance = useSelector(accountBalance);

  const [maxAmount, setMaxAmount] = useState('0');

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(maxAmount)] },
    onSubmit: (form) => {
      dispatch(setDepositCall(address, form.amount));
    }
  });

  useMetamaskReset(formTypes.qVaultDeposit, form.reset);

  const updateMaxAmount = async () => {
    const depositAmount = await getQVaultDepositAmount(address);
    setMaxAmount(Number(depositAmount) < 0 ? '0' : String(depositAmount));
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
          label={t('TRANSFER_INTO_Q_VAULT')}
          prefix="Q"
          hint={Number(maxAmount) > 0 && form.values.amount === maxAmount ? t('WARNING_NO_Q_LEFT') : ''}
          max={maxAmount}
          placeholder="0.0"
        />
        <Button
          type="submit"
          className="form-action"
          disabled={!form.isValid}
          style={{ width: '90px' }}
        >
          {t('TRANSFER')}
        </Button>
      </div>
    </form>
  );
}

export default TransferForm;
