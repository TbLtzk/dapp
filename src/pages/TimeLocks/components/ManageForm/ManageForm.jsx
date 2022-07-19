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
import { required } from 'func/validators';

function ManageForm ({ contract, address }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      amount: '',
      startDate: null,
      endDate: null
    },
    validators: {
      amount: [required],
      startDate: [required],
      endDate: [required]
    },
    onSubmit: (form) => {
      dispatch(setDepositLockedAmount({ ...form, contract, address }));
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
          invertedColors
          selectsStart
          selectsEnd={false}
          label={t(
            'START_DATE'
          )}
          startDate={form.values.startDate}
          endDate={form.values.endDate}
          minDate={new Date()}
        />
        <Calendar
          {...form.fields.endDate}
          invertedColors
          selectsEnd
          label={t('END_DATE')}
          selectsStart={false}
          disabled={!form.values.startDate}
          startDate={form.values.startDate}
          endDate={form.values.endDate}
          minDate={form.values.startDate}
        />
      </div>

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
        style={{ width: '100%', marginTop: '8px' }}
      >
        {t('DEPOSIT')}
      </Button>

      <div className="balance-card-block">
        <Button
          look="secondary"
          style={{ width: '100%' }}
          onClick={() => dispatch(setPurgeTimeLocksAmount({ contract, address }))}
        >
          {t('PURGE_EXPIRED_TIME_LOCKS')}
        </Button>
      </div>
    </form>
  );
}

export default memo(ManageForm);
