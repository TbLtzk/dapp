import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Base/Button';
import Calendar from 'components/Base/Calendar';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { CalendarWraper } from './styles';

import { setDepositLockedAmount, setPurgeTimeLocksAmount } from 'store/locked-amount/action-creators';

import formTypes from 'constants/form-types';
import { required } from 'func/validators';

function ManageForm ({ contract, address }) {
  const dispatch = useDispatch();

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
    <form noValidate onSubmit={form.submit}>
      <CalendarWraper>
        <Calendar
          {...form.fields.startDate}
          invertedColors
          selectsStart
          selectsEnd={false}
          label="Start date"
          startDate={form.values.startDate}
          endDate={form.values.endDate}
          minDate={new Date()}
        />
        <Calendar
          {...form.fields.endDate}
          invertedColors
          selectsEnd
          label="End Date"
          selectsStart={false}
          disabled={!form.values.startDate}
          startDate={form.values.startDate}
          endDate={form.values.endDate}
          minDate={form.values.startDate}
        />
      </CalendarWraper>

      <Input
        {...form.fields.amount}
        invertedColors
        type="number"
        label="Amount"
        prefix="Q"
        placeholder="0.0"
      />

      <Button
        type="submit"
        disabled={!form.isValid}
        style={{
          display: 'block',
          margin: '10px 0 10px auto'
        }}
      >
        Deposit
      </Button>

      <div className="modal-line" />

      <Button
        style={{
          display: 'block',
          margin: '10px 0 0 auto'
        }}
        onClick={() => dispatch(setPurgeTimeLocksAmount({ contract, address }))}
      >
        Purge Expired Time Locks
      </Button>
    </form>
  );
}

export default ManageForm;
