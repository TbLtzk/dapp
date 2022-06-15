import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

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
    <form noValidate onSubmit={form.submit}>
      <h4>Withdraw Saving Asset</h4>
      <div className="modal__one-line-form">
        <Input
          {...form.fields.amount}
          invertedColors
          type="number"
          prefix={asset}
          max={currentBalance}
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
