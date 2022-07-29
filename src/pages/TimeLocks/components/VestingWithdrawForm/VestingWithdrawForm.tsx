import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setVestingWithdraw } from 'store/vesting/action-creators';

import formTypes from 'constants/form-types';
import { required } from 'func/validators';

function VestingWithdrawForm () {
  const { t } = useTranslation();
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
    <form
      noValidate
      className="balance-card-block"
      style={{ display: 'flex', gap: '8px' }}
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT')}
        prefix="Q"
        placeholder="0.0"
      />
      <Button
        type="submit"
        disabled={!form.isValid}
        style={{ marginTop: '33px' }}
      >
        {t('WITHDRAW')}
      </Button>
    </form>
  );
}

export default VestingWithdrawForm;
