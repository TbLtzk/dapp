import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setWithdrawCall } from 'store/q-vault/action-creators';
import { qVaultMinimumTimeLock, userBalance } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types';
import { subtractAmount } from 'utils/balance';
import { amount, required } from 'utils/validators';

function WithdrawForm () {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const address = useSelector(userAddressMetamask);
  const userQVaultBalance = useSelector(userBalance);
  const qVaultLockedAmount = useSelector(qVaultMinimumTimeLock);
  const maxAmount = subtractAmount(userQVaultBalance, qVaultLockedAmount);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(maxAmount)] },
    onSubmit: (form) => {
      dispatch(setWithdrawCall(address, form.amount, t('WITHDRAW_FROM_Q_VAULT_SUCCESS')));
    }
  });

  useMetamaskReset(formTypes.qVaultWithdraw, form.reset);

  return (
    <form noValidate onSubmit={form.submit}>
      <div className="card__one-line-simple-form">
        <Input
          {...form.fields.amount}
          type="number"
          label={t('WITHDRAW_FROM_Q_VAULT')}
          prefix="Q"
          max={String(maxAmount)}
          placeholder="0.0"
        />
        <Button
          type="submit"
          className="form-action"
          disabled={!form.isValid}
          style={{ width: '90px' }}
        >
          {t('WITHDRAW')}
        </Button>
      </div>
    </form>
  );
}

export default WithdrawForm;
