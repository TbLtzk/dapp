import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setSavingWithdraw } from 'store/saving-assets/action-creators';
import { savingBalanceDetailsSelector } from 'store/saving-assets/selectors';

import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function WithdrawForm ({ asset }) {
  const dispatch = useDispatch();
  const { currentBalance } = useSelector(savingBalanceDetailsSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(currentBalance)] },
    onSubmit: (form) => {
      dispatch(setSavingWithdraw(form.amount));
    }
  });
  useMetamaskReset(formTypes.savingAssetWithdraw, form.reset);

  return (
    <form
      noValidate
      className="saving-form"
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        type="number"
        label="Withdraw Saving Asset"
        prefix={asset}
        max={currentBalance}
        placeholder="0.00"
      />
      <Button
        type="submit"
        className="form-action"
        disabled={!form.isValid}
        style={{ width: '100px' }}
      >
        Withdraw
      </Button>
    </form>
  );
}

export default WithdrawForm;
