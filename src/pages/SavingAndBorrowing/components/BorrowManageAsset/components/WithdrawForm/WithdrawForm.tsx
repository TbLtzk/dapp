import { useTranslation } from 'react-i18next';

import { VaultWithFee } from 'typings/defi';

import Button from 'components/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useBorrowAssets } from 'store/borrow-assets/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { amount, required } from 'utils/validators';

function WithdrawForm ({ vault }: { vault: VaultWithFee }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { borrowVault, withdrawCollateral } = useBorrowAssets();
  const { collateralDetails } = borrowVault;

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(collateralDetails.availableWithdraw)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('WITHDRAW_COLLATERAL_SUCCESS'),
        onSuccess: () => form.reset(),
        submitFn: () => withdrawCollateral({
          amount,
          vaultId: vault.vaultNum,
          decimals: collateralDetails.decimals,
        })
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
        label={t('WITHDRAW_COLLATERAL')}
        prefix={collateralDetails?.collateralAsset}
        max={collateralDetails?.availableWithdraw}
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
