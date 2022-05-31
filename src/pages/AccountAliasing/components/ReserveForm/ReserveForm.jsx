import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';

import { ReserveTip } from './styles';

import { reserveAlias } from 'store/account-aliases/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { trimAddress } from 'func/useful';
import { address, required } from 'func/validators';

function ReserveForm () {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  const form = useForm({
    initialValues: { address: '' },
    validators: { address: [required, address] },
    onSubmit: (form) => {
      dispatch(reserveAlias(form.address));
    }
  });

  return (
    <form
      noValidate
      style={{ display: 'grid', gap: '20px' }}
      onSubmit={form.submit}
    >
      <ReserveTip>
        <i className="mdi mdi-information" />
        <p>{`You can reserve your current address (${trimAddress(userAddress)}) as an alias for some main account`}</p>
      </ReserveTip>

      <Input
        {...form.fields.address}
        invertedColors
        label="Main account address"
        placeholder="0x..."
      />

      <Button
        type="submit"
        disabled={!form.isValid}
        style={{ marginTop: '10px', width: '150px' }}
      >
        Reserve alias
      </Button>
    </form>
  );
}

export default ReserveForm;
