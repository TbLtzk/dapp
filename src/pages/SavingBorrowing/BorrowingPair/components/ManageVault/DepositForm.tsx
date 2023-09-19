import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { formatAsset, formatNumber } from '@q-dev/utils';
import styled from 'styled-components';
import { Asset, StablecoinAsset, VaultWithId } from 'typings/defi';

import Button from 'components/Button';
import Input from 'components/Input';

import LiquidationInfoBlock from './LiquidationInfoBlock';
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
  gap: 16px;

  .deposit-balances {
    display: grid;
    gap: 8px;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    padding: 12px 16px;
    border-radius: 8px;
  }

  .deposit-balance {
    display: flex;
    justify-content: space-between;
  }

  .deposit-btn {
    margin-top: 8px;
    width: 100%;
  }
`;

function DepositForm ({ vault, stablecoin }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { loadCollateralBalance } = useBorrowing();
  const { loadBorrowingVaults } = useBorrowingVaults(stablecoin);

  const {
    allowanceDeposit,
    borrowVault,
    approveBorrowing,
    depositCollateral,
    getBorrowingAllowance
  } = useManageVaultContext();
  const { collateralDetails, borrowingDetails } = borrowVault;

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(collateralDetails?.availableDeposit)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('DEPOSIT_COLLATERAL_TX'),
        submitFn: () => depositCollateral({
          amount,
          vaultId: vault.id,
          decimals: collateralDetails.decimals,
        }),
        onSuccess: () => {
          form.reset();
          getBorrowingAllowance({
            borrowType: 'deposit',
            asset: vault.colKey as Asset,
          });
          loadCollateralBalance(vault.colKey as Asset);
          loadBorrowingVaults();
        },
      });
    }
  });

  const isApproveMode = useMemo(() => {
    return Number(allowanceDeposit) < Number(form.values.amount);
  }, [allowanceDeposit, form.values.amount]);

  return (
    <StyledForm noValidate onSubmit={form.submit}>
      <Input
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT_TO_DEPOSIT')}
        prefix={collateralDetails.collateralAsset}
        max={collateralDetails.availableDeposit}
        decimals={Number(collateralDetails.decimals)}
        placeholder="0.00"
        labelTip={t('AVAILABLE_WITH_AMOUNT', { amount: formatNumber(collateralDetails.availableDeposit) })}
      />

      <div className="deposit-balances">
        <p className="deposit-balance text-sm">
          <span className="font-light">{t('COLLATERAL')}</span>
          <span>
            {formatAsset(collateralDetails.lockedCollateral, collateralDetails.collateralAsset)}
            {' '}≈{' '}
            {formatAsset(
              +collateralDetails.lockedCollateral * +collateralDetails.assetPrice,
              borrowingDetails.borrowingAsset
            )}
          </span>
        </p>

        <p className="deposit-balance text-sm">
          <span className="font-light">{t('PRICE')}</span>
          <span>
            1 {collateralDetails.collateralAsset} ≈{' '}
            {formatAsset(collateralDetails.assetPrice, borrowingDetails.borrowingAsset)}
          </span>
        </p>
      </div>

      <LiquidationInfoBlock />

      {isApproveMode
        ? (
          <Button
            className="deposit-btn"
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
            className="deposit-btn"
            disabled={!form.isValid}
          >
            {t('DEPOSIT')}
          </Button>
        )}
    </StyledForm>
  );
}

export default DepositForm;
