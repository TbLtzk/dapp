import { useTranslation } from 'react-i18next';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useTransaction } from 'store/transaction/hooks';
import { useVesting } from 'store/vesting/hooks';

import { required } from 'utils/validators';

function VestingWithdrawForm () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { withdrawVesting } = useVesting();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('WITHDRAW_FROM_VESTING_SUCCESS'),
        submitFn: () => withdrawVesting(amount),
        onSuccess: () => form.reset()
      });
    }
  });

  return (
    <form
      noValidate
      className="time-locks-block"
      style={{ display: 'grid', gap: '16px' }}
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
        style={{ width: '100%' }}
      >
        {t('WITHDRAW')}
      </Button>
    </form>
  );
}

export default VestingWithdrawForm;
