import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from 'ui/Button';
import Calendar from 'ui/Calendar';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setDepositLockedAmount, setPurgeTimeLocksAmount } from 'store/locked-amount/action-creators';

import formTypes from 'constants/form-types';
import { required } from 'utils/validators';

interface Props {
  contract: string;
  address: string;
}

function ManageForm ({ contract, address }: Props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
    onSubmit: (form) => {
      dispatch(setDepositLockedAmount({ ...form, contract, address }, t('TIME_LOCKS_DEPOSIT_SUCCESS')));
    }
  });
  useMetamaskReset(formTypes.timeLocksAmount, form.reset);

  return (
    <form
      noValidate
      className="balance-card-block"
      onSubmit={form.submit}
    >
      <div style={{ display: 'flex', gap: '8px' }}>
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
      </div>

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
        style={{ width: '100%', marginTop: '8px' }}
      >
        {t('DEPOSIT')}
      </Button>

      <div className="balance-card-block">
        <Button
          look="secondary"
          style={{ width: '100%' }}
          onClick={() => dispatch(setPurgeTimeLocksAmount({ contract, address }, t('PURGE_EXPIRED_TIME_LOCKS_SUCCESS')))}
        >
          {t('PURGE_EXPIRED_TIME_LOCKS')}
        </Button>
      </div>
    </form>
  );
}

export default memo(ManageForm);
