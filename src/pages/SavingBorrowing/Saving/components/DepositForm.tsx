import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import styled from 'styled-components';
import { SavingAsset } from 'typings/defi';

import Button from 'ui/Button';
import Input from 'ui/Input';

import { useSaving } from 'store/saving/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { formatAsset, formatNumber, formatPercent } from 'utils/numbers';
import { amount, required } from 'utils/validators';

const StyledForm = styled.form`
  display: grid;
  gap: 16px;

  .deposit-balances {
    display: grid;
    gap: 8px;
    background-color: ${({ theme }) => theme.colors.blockInside};
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

function DepositForm ({ asset }: { asset: SavingAsset }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const {
    savingAvailableToDeposit,
    savingBalanceDetails,
    savingAllowance,
    depositSaving,
    approveSaving
  } = useSaving();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(savingAvailableToDeposit)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('DEPOSIT_SAVING_ASSET_SUCCESS'),
        submitFn: () => depositSaving(amount),
        onSuccess: () => form.reset(),
      });
    }
  });

  const isApproveMode = useMemo(() => {
    return Number(savingAllowance) < Number(form.values.amount);
  }, [savingAllowance, form.values.amount]);

  return (
    <StyledForm noValidate onSubmit={form.submit}>
      <Input
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT_TO_DEPOSIT')}
        prefix={asset.depositAsset}
        max={savingAvailableToDeposit}
        labelTip={t('AVAILABLE_WITH_AMOUNT', { amount: formatNumber(savingAvailableToDeposit) })}
        placeholder="0.00"
      />

      <div className="deposit-balances">
        <p className="deposit-balance text-sm">
          <span className="font-light">{t('SAVING_BALANCE')}</span>
          <span>{formatAsset(savingBalanceDetails.currentBalance, asset.interestAsset)}</span>
        </p>

        <p className="deposit-balance text-sm">
          <span className="font-light">{t('APY')}</span>
          <span>{formatPercent(savingBalanceDetails.interestRate)}</span>
        </p>

        <p className="deposit-balance text-sm">
          <span className="font-light">{t('EXPECTED_YEARLY_EARNINGS')}</span>
          <span>{formatAsset(savingBalanceDetails.estimatedInterest, asset.interestAsset)}</span>
        </p>
      </div>

      {isApproveMode
        ? (
          <Button
            className="deposit-btn"
            onClick={() => submitTransaction({
              successMessage: t('APPROVE'),
              submitFn: approveSaving
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
