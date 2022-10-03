import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { formatNumber } from '@q-dev/utils';
import styled from 'styled-components';
import { Asset, VaultWithId } from 'typings/defi';

import Button from 'ui/Button';
import Input from 'ui/Input';

import { useBorrowAssets } from 'store/borrow-assets/hooks';
import { useBorrowing, useBorrowingVaults } from 'store/borrowing/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { amount, required } from 'utils/validators';

const StyledForm = styled.form`
  display: grid;
  gap: 24px;

  .withdraw-btn {
    width: 100%;
  }
`;

function WithdrawForm ({ vault }: { vault: VaultWithId }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { getCollateralBalance } = useBorrowing();
  const { getBorrowingVaults } = useBorrowingVaults();

  const { borrowVault, withdrawCollateral } = useBorrowAssets();
  const { collateralDetails } = borrowVault;

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(collateralDetails.availableWithdraw)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('WITHDRAW_COLLATERAL_SUCCESS'),
        submitFn: () => withdrawCollateral({
          amount,
          vaultId: vault.id,
          decimals: collateralDetails.decimals,
        }),
        onSuccess: () => {
          form.reset();
          getCollateralBalance(vault.colKey as Asset);
          getBorrowingVaults();
        },
      });
    }
  });

  return (
    <StyledForm noValidate onSubmit={form.submit}>
      <Input
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT_TO_WITHDRAW')}
        prefix={collateralDetails.collateralAsset}
        max={collateralDetails.availableWithdraw}
        decimals={Number(collateralDetails.decimals)}
        placeholder="0.00"
        labelTip={t('AVAILABLE_WITH_AMOUNT', { amount: formatNumber(collateralDetails.availableWithdraw) })}
      />

      <Button
        type="submit"
        className="withdraw-btn"
        disabled={!form.isValid}
      >
        {t('WITHDRAW')}
      </Button>
    </StyledForm>
  );
}

export default WithdrawForm;
