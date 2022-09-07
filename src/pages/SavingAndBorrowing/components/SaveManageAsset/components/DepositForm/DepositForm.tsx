import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useSavingAssets } from 'store/saving-assets/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { amount, required } from 'utils/validators';

function DepositForm ({ asset }: { asset: string }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const {
    savingAvailableToDeposit,
    savingAllowance,
    depositSaving,
    approveSaving
  } = useSavingAssets();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(savingAvailableToDeposit)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('DEPOSIT_SAVING_ASSET_SUCCESS'),
        submitFn: () => depositSaving(amount),
        onSuccess: () => form.reset(),
      });
    }
  });

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
        max={savingAvailableToDeposit}
        placeholder="0.00"
      />
      {isApproveMode
        ? (
          <Button
            className="form-action"
            style={{ width: '100px' }}
            onClick={() => submitTransaction({
              successMessage: t('APPROVE'),
              submitFn: approveSaving
            })}
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
