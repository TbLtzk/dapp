import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setSavingAprove, setSavingDeposit } from 'store/saving-assets/action-creators';
import { savingAllowanceSelector, savingAviableToDepositSelector } from 'store/saving-assets/selectors';

import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function DepositForm ({ asset }: { asset: string }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const availableAmount = useSelector(savingAviableToDepositSelector);
  const savingAllowance = useSelector(savingAllowanceSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(availableAmount)] },
    onSubmit: (form) => {
      dispatch(setSavingDeposit(form.amount, t('DEPOSIT_SAVING_ASSET_SUCCESS')));
    },
  });

  useMetamaskReset(formTypes.savingAssetDeposit, form.reset);

  const isApproveMode = useMemo(() => {
    return Number(savingAllowance) < Number(form.values.amount);
  }, [savingAllowance, form.values.amount]);

  return (
    <form
      noValidate
      className="saving-form"
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        type="number"
        label={t('DEPOSIT_SAVING_ASSET')}
        prefix={asset}
        max={availableAmount}
        placeholder="0.00"
      />
      {isApproveMode
        ? (
          <Button
            className="form-action"
            style={{ width: '100px' }}
            onClick={() => dispatch(setSavingAprove())}
          >
            {t('APPROVE')}
          </Button>
        )
        : (
          <Button
            type="submit"
            className="form-action"
            disabled={!form.isValid}
            style={{ width: '100px' }}
          >
            {t('DEPOSIT')}
          </Button>
        )}
    </form>
  );
}

export default DepositForm;
