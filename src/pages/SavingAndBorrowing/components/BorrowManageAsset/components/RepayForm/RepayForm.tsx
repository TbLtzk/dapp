import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Asset, VaultWithFee } from 'typings/defi';

import Button from 'components/Button';
import Input from 'components/Input';

import useForm from 'hooks/useForm';

import { useBorrowAssets } from 'store/borrow-assets/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { amount, required } from 'utils/validators';

function RepayForm ({ vault }: {vault: VaultWithFee}) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { borrowVault, allowanceRepay, repayBorrowing, approveBorrowing } = useBorrowAssets();
  const { borrowingDetails } = borrowVault;

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(borrowingDetails?.availableRepay)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('REPAY_BORROWED_ASSET_SUCCESS'),
        submitFn: () => repayBorrowing({ amount, vaultId: vault.vaultNum }),
        onSuccess: () => form.reset(),
      });
    }
  });

  const isApproveMode = useMemo(() => {
    return Number(allowanceRepay) < Number(form.values.amount);
  }, [allowanceRepay, form.values.amount]);

  return (
    <form
      noValidate
      className="borrow-manage-form"
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        type="number"
        label={t('REPAY_BORROWED_ASSET')}
        prefix={borrowingDetails.borrowingAsset}
        max={borrowingDetails?.availableRepay}
        placeholder="0.00"
      />
      {isApproveMode
        ? (
          <Button
            style={{ width: '100px' }}
            className="form-action"
            onClick={() => submitTransaction({
              successMessage: t('APPROVE'),
              submitFn: () => approveBorrowing({
                borrowType: 'repay',
                asset: vault.colKey as Asset,
              })
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
            {t('REPAY')}
          </Button>
        )}
    </form>
  );
}

export default RepayForm;
