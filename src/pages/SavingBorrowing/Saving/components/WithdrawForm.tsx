import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useSaving } from 'store/saving/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { formatNumber } from 'utils/numbers';
import { amount, required } from 'utils/validators';

const StyledForm = styled.form`
  display: grid;
  gap: 24px;

  .withdraw-btn {
    width: 100%;
  }
`;

function WithdrawForm ({ asset }: { asset: string }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { savingBalanceDetails, withdrawSaving } = useSaving();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(savingBalanceDetails.currentBalance)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('WITHDRAW_SAVING_ASSET_SUCCESS'),
        submitFn: () => withdrawSaving(amount),
        onSuccess: () => form.reset(),
      });
    }
  });

  return (
    <StyledForm noValidate onSubmit={form.submit}>
      <Input
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT_TO_WITHDRAW')}
        prefix={asset}
        max={savingBalanceDetails.currentBalance}
        placeholder="0.00"
        labelTip={t('AVAILABLE_WITH_AMOUNT', {
          amount: formatNumber(savingBalanceDetails.currentBalance)
        })}
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
