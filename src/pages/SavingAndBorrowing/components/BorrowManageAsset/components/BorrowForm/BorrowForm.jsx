import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setBorrowAsBorrow } from 'store/borrow-assets/action-creators';
import { borrowVaultInfoSelector } from 'store/borrow-assets/selectors';

import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function BorrowForm ({ vaultNum }) {
  const dispatch = useDispatch();
  const { borrowingDetails } = useSelector(borrowVaultInfoSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(borrowingDetails?.availableBorrow)] },
    onSubmit: (form) => {
      dispatch(setBorrowAsBorrow(form.amount, vaultNum));
    }
  });
  useMetamaskReset(formTypes.borrowAssetBorrow, form.reset);

  return (
    <form noValidate onSubmit={form.submit}>
      <h4>Borrow Asset</h4>
      <div className="modal__one-line-form">
        <Input
          {...form.fields.amount}
          invertedColors
          type="number"
          prefix={borrowingDetails?.assets}
          max={borrowingDetails?.availableBorrow}
          placeholder="0.00"
        />
        <Button
          type="submit"
          disabled={!form.isValid}
          style={{ width: '100px' }}
        >
          Borrow
        </Button>
      </div>
    </form>
  );
}

export default BorrowForm;
