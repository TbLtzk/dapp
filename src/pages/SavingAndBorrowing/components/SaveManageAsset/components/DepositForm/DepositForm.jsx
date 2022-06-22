import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setSavingAprove, setSavingDeposit } from 'store/saving-assets/action-creators';
import { savingAllowanceSelector, savingAviableToDepositSelector } from 'store/saving-assets/selectors';

import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function DepositForm ({ asset }) {
  const dispatch = useDispatch();

  const availableAmount = useSelector(savingAviableToDepositSelector);
  const savingAllowance = useSelector(savingAllowanceSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(availableAmount)] },
    onSubmit: (form) => {
      dispatch(setSavingDeposit(form.amount));
    },
  });

  useMetamaskReset(formTypes.savingAssetDeposit, form.reset);

  const isApproveMode = useMemo(() => {
    return Number(savingAllowance) < Number(form.values.amount);
  }, [savingAllowance, form.values.amount]);

  return (
    <form noValidate onSubmit={form.submit}>
      <h4>Deposit Saving Asset</h4>
      <div className="modal__one-line-form">
        <Input
          {...form.fields.amount}
          invertedColors
          type="number"
          prefix={asset}
          max={availableAmount}
          placeholder="0.00"
        />
        {isApproveMode
          ? (
            <Button
              style={{ width: '100px' }}
              onClick={() => dispatch(setSavingAprove())}
            >
              Approve
            </Button>
          )
          : (
            <Button
              type="submit"
              disabled={!form.isValid}
              style={{ width: '100px' }}
            >
              Deposit
            </Button>
          )}
      </div>
    </form>
  );
}

export default DepositForm;
