import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Asset, VaultWithFee } from 'typings/defi';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useBorrowAssets } from 'store/borrow-assets/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { amount, required } from 'utils/validators';

function DepositForm ({ vault }: {vault: VaultWithFee}) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const {
    allowanceDeposit,
    borrowVault,
    approveBorrowing,
    depositCollateral
  } = useBorrowAssets();
  const { collateralDetails } = borrowVault;

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(collateralDetails?.availableDeposit)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('DEPOSIT_COLLATERAL_SUCCESS'),
        onSuccess: () => form.reset(),
        submitFn: () => depositCollateral({
          amount,
          vaultId: vault.vaultNum,
          decimals: collateralDetails.decimals,
        })
      });
    }
  });

  const isApproveMode = useMemo(() => {
    return Number(allowanceDeposit) < Number(form.values.amount);
  }, [allowanceDeposit, form.values.amount]);

  return (
    <form
      noValidate
      className="borrow-manage-form"
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        type="number"
        label={t('DEPOSIT_COLLATERAL')}
        prefix={collateralDetails.collateralAsset}
        max={collateralDetails.availableDeposit}
        placeholder="0.00"
      />
      {isApproveMode
        ? (
          <Button
            style={{ width: '100px' }}
            className="form-action"
            onClick={() => submitTransaction({
              successMessage: t('APPROVE'),
              submitFn: async () => approveBorrowing({
                borrowType: 'deposit',
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
            style={{ width: '100px' }}
            disabled={!form.isValid}
          >
            {t('DEPOSIT')}
          </Button>
        )}
    </form>
  );
}

export default DepositForm;
