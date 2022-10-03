import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { toBigNumber } from '@q-dev/utils';
import styled from 'styled-components';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Button from 'ui/Button';
import Input from 'ui/Input';

import { useTimeLocksAddress } from '../TimeLocks';

import { useTransaction } from 'store/transaction/hooks';
import { useVesting } from 'store/vesting/hooks';

import { amount, required } from 'utils/validators';

const StyledForm = styled.form`
  display: grid;
  gap: 16px;

  .withdraw-form-btn {
    margin-top: 8px;
    width: 100%;
  }
`;

function WithdrawForm ({ onSubmit }: { onSubmit: () => void }) {
  const { t } = useTranslation();
  const { address } = useTimeLocksAddress();

  const { submitTransaction } = useTransaction();
  const { vestingBalance, vestingMinimumTimeLock, withdrawVesting } = useVesting();

  const maxAmont = toBigNumber(vestingBalance)
    .minus(vestingMinimumTimeLock)
    .toString();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(maxAmont)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('WITHDRAW_FROM_VESTING_SUCCESS'),
        submitFn: () => withdrawVesting(amount),
        onSuccess: () => onSubmit()
      });
    }
  });

  return (
    <StyledForm noValidate onSubmit={form.submit}>
      <div>
        <p className="text-md color-secondary">{t('RECIPIENT_ADDRESS')}</p>
        <ExplorerAddress
          semibold
          iconed
          short
          address={address}
          className="text-xl"
        />
      </div>

      <Input
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT')}
        prefix="Q"
        placeholder="0.0"
        max={maxAmont}
      />

      <Button
        type="submit"
        className="withdraw-form-btn"
        disabled={!form.isValid}
      >
        {t('WITHDRAW')}
      </Button>
    </StyledForm>
  );
}

export default WithdrawForm;
