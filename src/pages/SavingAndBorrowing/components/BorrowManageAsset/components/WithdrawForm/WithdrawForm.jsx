import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setBorrowWithdraw } from 'store/borrow-assets/action-creators';
import { borrowVaultInfoSelector } from 'store/borrow-assets/selectors';

import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function WithdrawForm ({ vaultNum }) {
  const dispatch = useDispatch();
  const { collateralDetails } = useSelector(borrowVaultInfoSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(collateralDetails?.availableWithdraw)] },
    onSubmit: (form) => {
      dispatch(setBorrowWithdraw(form.amount, vaultNum));
    }
  });
  useMetamaskReset(formTypes.borrowAssetWithdraw, form.reset);

  return (
    <form noValidate onSubmit={form.submit}>
      <h4>Withdraw Collateral</h4>
      <div className="modal__one-line-form">
        <Input
          {...form.fields.amount}
          invertedColors
          type="number"
          prefix={collateralDetails?.assets}
          max={collateralDetails?.availableWithdraw}
          placeholder="0.00"
        />
        <Button
          type="submit"
          disabled={!form.isValid}
          style={{ width: '100px' }}
        >
          Withdraw
        </Button>
      </div>
    </form>
  );
}

export default WithdrawForm;
