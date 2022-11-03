import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { Asset, VaultWithId } from 'typings/defi';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useBorrowAssets } from 'store/borrow-assets/hooks';
import { useBorrowingVaults } from 'store/borrowing/hooks';
import { useSaving } from 'store/saving/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { formatNumber } from 'utils/numbers';
import { amount, required } from 'utils/validators';

const StyledForm = styled.form`
  display: grid;
  gap: 16px;

  .repay-balance {
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.blockInside};
    padding: 12px 16px;
    border-radius: 8px;
  }

  .repay-btn {
    margin-top: 8px;
    width: 100%;
  }
`;

function RepayForm ({ vault }: {vault: VaultWithId}) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { getSavingAvailableToDeposit } = useSaving();
  const { getBorrowingVaults } = useBorrowingVaults();

  const { borrowVault, allowanceRepay, repayBorrowing, approveBorrowing } = useBorrowAssets();
  const { borrowingDetails } = borrowVault;

  const maxRepayAmount = BigNumber.min(
    borrowingDetails.availableRepay,
    borrowingDetails.outstandingDebt
  ).toString();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(maxRepayAmount)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('REPAY_BORROWED_ASSET_SUCCESS'),
        submitFn: () => repayBorrowing({ amount, vaultId: vault.id }),
        onSuccess: () => {
          form.reset();
          getSavingAvailableToDeposit();
          getBorrowingVaults();
        },
      });
    }
  });

  const isApproveMode = useMemo(() => {
    return Number(allowanceRepay) < Number(form.values.amount);
  }, [allowanceRepay, form.values.amount]);

  return (
    <StyledForm noValidate onSubmit={form.submit}>
      <Input
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT_TO_REPAY')}
        prefix={borrowingDetails.borrowingAsset}
        max={maxRepayAmount}
        labelTip={t('DEBT_AMOUNT', { amount: formatNumber(borrowingDetails.outstandingDebt) })}
        placeholder="0.00"
      />

      <p className="repay-balance text-sm">
        <span className="font-light">{t('ASSET_BALANCE', { asset: 'QUSD' })}</span>
        <span>{formatNumber(borrowingDetails.availableRepay)}</span>
      </p>

      {isApproveMode
        ? (
          <Button
            className="repay-btn"
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
            className="repay-btn"
            disabled={!form.isValid}
          >
            {t('REPAY')}
          </Button>
        )}
    </StyledForm>
  );
}

export default RepayForm;
