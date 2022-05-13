import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setBorrowAprove, setBorrowDeposit } from 'store/borrow-assets/action-creators';
import { allowanceDepositSelector, borrowVaultInfoSelector } from 'store/borrow-assets/selectors';

import { borrowTypes } from 'constants/borrowTypes';
import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function DepositForm ({ vaultNum }) {
  const dispatch = useDispatch();
  const allowanceDeposit = useSelector(allowanceDepositSelector);
  const { collateralDetails } = useSelector(borrowVaultInfoSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(collateralDetails?.availableDeposit)] },
    onSubmit: (form) => {
      const action = isApproveMode
        ? setBorrowAprove(borrowTypes.deposit)
        : setBorrowDeposit(form.amount, vaultNum);
      dispatch(action);
    }
  });
  useMetamaskReset(formTypes.borrowAssetDeposit, form.reset);

  const isApproveMode = useMemo(() => {
    return Number(allowanceDeposit) < Number(form.values.amount);
  }, [allowanceDeposit, form.values.amount]);

  return (
    <form noValidate onSubmit={form.submit}>
      <h4>Deposit Collateral</h4>
      <div className="modal__one-line-form">
        <Input
          {...form.fields.amount}
          invertedColors
          type="number"
          prefix={collateralDetails?.assets}
          max={collateralDetails?.availableDeposit}
          placeholder="0.00"
        />
        <Button
          type="submit"
          disabled={!form.isValid}
          style={{ width: '100px' }}
        >
          {isApproveMode ? 'Approve' : 'Deposit'}
        </Button>
      </div>
    </form>
  );
}

export default DepositForm;
