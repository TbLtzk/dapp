import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useSavingAssets } from 'store/saving-assets/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { amount, required } from 'utils/validators';

function WithdrawForm ({ asset }: { asset: string }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { savingBalanceDetails, withdrawSaving } = useSavingAssets();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(savingBalanceDetails.currentBalance)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('WITHDRAW_SAVING_ASSET_SUCCESS'),
        submitFn: () => withdrawSaving(amount),
        onSuccess: () => form.reset(),
      });
    }
  });

  return (
    <form
      noValidate
      className="saving-form"
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        type="number"
        label={t('WITHDRAW_SAVING_ASSET')}
        prefix={asset}
        max={savingBalanceDetails.currentBalance}
        placeholder="0.00"
      />
      <Button
        type="submit"
        className="form-action"
        disabled={!form.isValid}
        style={{ width: '100px' }}
      >
        {t('WITHDRAW')}
      </Button>
    </form>
  );
}

export default WithdrawForm;
