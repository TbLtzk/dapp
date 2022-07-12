import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

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
    <form
      noValidate
      className="borrow-manage-form"
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        type="number"
        label="Borrow Asset"
        prefix={borrowingDetails?.assets}
        max={borrowingDetails?.availableBorrow}
        placeholder="0.00"
      />
      <Button
        type="submit"
        className="form-action"
        disabled={!form.isValid}
        style={{ width: '100px' }}
      >
        Borrow
      </Button>
    </form>
  );
}

export default BorrowForm;
