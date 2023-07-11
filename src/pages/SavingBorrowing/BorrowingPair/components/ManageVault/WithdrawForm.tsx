import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { formatNumber } from '@q-dev/utils';
import styled from 'styled-components';
import { Asset, StablecoinAsset, VaultWithId } from 'typings/defi';

import Button from 'components/Button';
import Input from 'components/Input';

import { useManageVaultContext } from './ManageVaultContext';

import { useBorrowing, useBorrowingVaults } from 'store/borrowing/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { amount, required } from 'utils/validators';

interface Props {
  vault: VaultWithId;
  stablecoin: StablecoinAsset;
}

const StyledForm = styled.form`
  display: grid;
  gap: 24px;

  .withdraw-btn {
    width: 100%;
  }
`;

function WithdrawForm ({ vault, stablecoin }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { loadCollateralBalance } = useBorrowing();
  const { loadBorrowingVaults } = useBorrowingVaults(stablecoin);

  const { borrowVault, withdrawCollateral } = useManageVaultContext();
  const { collateralDetails } = borrowVault;

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(collateralDetails.availableWithdraw)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('WITHDRAW_COLLATERAL_TX'),
        submitFn: () => withdrawCollateral({
          amount,
          vaultId: vault.id,
          decimals: collateralDetails.decimals,
        }),
        onSuccess: () => {
          form.reset();
          loadCollateralBalance(vault.colKey as Asset);
          loadBorrowingVaults();
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
