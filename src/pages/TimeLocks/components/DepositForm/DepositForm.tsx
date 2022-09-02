import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { TimeLockContractType } from 'typings/contracts';
import { TimeLockForm } from 'typings/time-locks';

import Button from 'ui/Button';
import Calendar from 'ui/Calendar';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useLockedAmount } from 'store/locked-amount/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { required } from 'utils/validators';

interface Props {
  contract: TimeLockContractType;
  address: string;
}

function ManageForm ({ contract, address }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { depositTimeLock } = useLockedAmount();

  const form = useForm({
    initialValues: {
      amount: '',
      startDate: null as Date | null,
      endDate: null as Date | null,
    },
    validators: {
      amount: [required],
      startDate: [required],
      endDate: [required]
    },
    onSubmit: (values) => {
      submitTransaction({
        successMessage: t('TIME_LOCKS_DEPOSIT_SUCCESS'),
        submitFn: () => depositTimeLock({ ...values, contract, address } as TimeLockForm),
        onSuccess: () => form.reset()
      });
    }
  });

  return (
    <form
      noValidate
      style={{ display: 'grid', gap: '16px' }}
      onSubmit={form.submit}
    >
      <Calendar
        {...form.fields.startDate}
        selectsStart
        value={form.values.startDate as Date}
        selectsEnd={false}
        label={t('START_DATE')}
        startDate={form.values.startDate ? new Date(form.values.startDate) : null}
        endDate={form.values.endDate ? new Date(form.values.endDate) : null}
        minDate={new Date()}
      />
      <Calendar
        {...form.fields.endDate}
        selectsEnd
        value={form.values.endDate as Date}
        label={t('END_DATE')}
        selectsStart={false}
        disabled={!form.values.startDate}
        startDate={form.values.startDate as Date}
        endDate={form.values.endDate as Date}
        minDate={form.values.startDate as Date}
      />

      <Input
        {...form.fields.amount}
        type="number"
        value={form.values.amount as string}
        label={t('AMOUNT')}
        prefix="Q"
        placeholder="0.0"
      />

      <Button
        type="submit"
        disabled={!form.isValid}
        style={{ width: '100%' }}
      >
        {t('DEPOSIT')}
      </Button>
    </form>
  );
}

export default memo(ManageForm);
