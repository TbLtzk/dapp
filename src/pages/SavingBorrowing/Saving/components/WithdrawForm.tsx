import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { formatNumber } from '@q-dev/utils';
import styled from 'styled-components';
import { StablecoinAsset } from 'typings/defi';

import Button from 'components/Button';
import Input from 'components/Input';

import { useSaving } from 'store/saving/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { amount, required } from 'utils/validators';

const StyledForm = styled.form`
  display: grid;
  gap: 24px;

  .withdraw-btn {
    width: 100%;
  }
`;

function WithdrawForm ({ asset }: { asset: StablecoinAsset }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { savingBalanceDetails, withdrawSaving } = useSaving(asset);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(savingBalanceDetails.currentBalance)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('WITHDRAW_SAVING_ASSET_TX'),
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
