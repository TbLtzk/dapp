import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { formatAsset, formatNumber } from '@q-dev/utils';
import styled from 'styled-components';
import { Asset, VaultWithId } from 'typings/defi';

import Button from 'components/Button';
import Input from 'components/Input';

import { useBorrowAssets } from 'store/borrow-assets/hooks';
import { useBorrowing, useBorrowingVaults } from 'store/borrowing/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { amount, required } from 'utils/validators';

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

function DepositForm ({ vault }: { vault: VaultWithId }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { getCollateralBalance } = useBorrowing();
  const { getBorrowingVaults } = useBorrowingVaults();

  const {
    allowanceDeposit,
    borrowVault,
    approveBorrowing,
    depositCollateral
  } = useBorrowAssets();
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
          getCollateralBalance(vault.colKey as Asset);
          getBorrowingVaults();
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

      <div className="deposit-balances">
        <p className="deposit-balance text-sm">
          <span className="font-light">{t('LIQUIDATION_PRICE')}</span>
          <span>
            1 {collateralDetails.collateralAsset} ≈{' '}
            {formatAsset(collateralDetails.liquidationPrice, borrowingDetails.borrowingAsset)}
          </span>
        </p>

        <p className="deposit-balance text-sm">
          <span className="font-light">{t('LIQUIDATION_LIMIT')}</span>
          <span>{formatAsset(borrowingDetails.liquidationLimit, borrowingDetails.borrowingAsset)}</span>
        </p>
      </div>

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
