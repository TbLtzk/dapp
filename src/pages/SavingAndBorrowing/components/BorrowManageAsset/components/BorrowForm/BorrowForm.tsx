import { useTranslation } from 'react-i18next';

import { VaultWithFee } from 'typings/defi';

import Button from 'components/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useBorrowAssets } from 'store/borrow-assets/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { amount, required } from 'utils/validators';

function BorrowForm ({ vault }: { vault: VaultWithFee}) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { borrowVault, borrowAsset } = useBorrowAssets();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(borrowVault.borrowingDetails?.availableBorrow)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('BORROW_ASSET_SUCCESS'),
        submitFn: () => borrowAsset({ amount, vaultId: vault.vaultNum }),
        onSuccess: () => form.reset(),
      });
    }
  });

  return (
    <form
      noValidate
      className="borrow-manage-form"
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        type="number"
        label={t('BORROW_ASSET')}
        prefix={borrowVault.borrowingDetails?.borrowingAsset}
        max={borrowVault.borrowingDetails?.availableBorrow}
        placeholder="0.00"
      />
      <Button
        type="submit"
        className="form-action"
        disabled={!form.isValid}
        style={{ width: '100px' }}
      >
        {t('BORROW')}
      </Button>
    </form>
  );
}

export default BorrowForm;
