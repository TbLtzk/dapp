import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

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
      dispatch(setBorrowDeposit(form.amount, vaultNum));
    },
  });

  useMetamaskReset(formTypes.borrowAssetDeposit, form.reset);

  const isApproveMode = useMemo(() => {
    return Number(allowanceDeposit) < Number(form.values.amount);
  }, [allowanceDeposit, form.values.amount]);

  return (
    <form
      noValidate
      className="borrow-manage-form"
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        type="number"
        label="Deposit Collateral"
        prefix={collateralDetails?.assets}
        max={collateralDetails?.availableDeposit}
        placeholder="0.00"
      />
      {isApproveMode
        ? (
          <Button
            style={{ width: '100px' }}
            className="form-action"
            onClick={() => dispatch(setBorrowAprove(borrowTypes.deposit))}
          >
            Approve
          </Button>
        )
        : (
          <Button
            type="submit"
            className="form-action"
            style={{ width: '100px' }}
            disabled={!form.isValid}
          >
            Deposit
          </Button>
        )}
    </form>
  );
}

export default DepositForm;
