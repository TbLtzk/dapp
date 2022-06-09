import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setBorrowAprove, setBorrowRepay } from 'store/borrow-assets/action-creators';
import { allowanceRepaySelector, borrowVaultInfoSelector } from 'store/borrow-assets/selectors';

import { borrowTypes } from 'constants/borrowTypes';
import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function RepayForm ({ vaultNum }) {
  const dispatch = useDispatch();
  const allowanceRepay = useSelector(allowanceRepaySelector);
  const { borrowingDetails } = useSelector(borrowVaultInfoSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(borrowingDetails?.availableRepay)] },
    onSubmit: (form) => {
      const action = isApproveMode
        ? setBorrowAprove(borrowTypes.repay)
        : setBorrowRepay(form.amount, vaultNum);
      dispatch(action);
    }
  });
  
  useMetamaskReset(formTypes.borrowAssetRepay, form.reset);

  const isApproveMode = useMemo(() => {
    return Number(allowanceRepay) < Number(form.values.amount);
  }, [allowanceRepay, form.values.amount]);

  return (
    <form noValidate onSubmit={form.submit}>
      <h4>Repay Borrowed Asset</h4>
      <div className="modal__one-line-form">
        <Input
          {...form.fields.amount}
          invertedColors
          type="number"
          prefix={borrowingDetails?.assets}
          max={borrowingDetails?.availableRepay}
          placeholder="0.00"
        />
        <Button
          type="submit"
          disabled={!form.isValid}
          style={{ width: '100px' }}
        >
          {isApproveMode ? 'Approve' : 'Repay'}
        </Button>
      </div>
    </form>
  );
}

export default RepayForm;
