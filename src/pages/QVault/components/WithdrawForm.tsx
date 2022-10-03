import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { formatAsset, toBigNumber } from '@q-dev/utils';
import styled from 'styled-components';
import { media } from 'styles/media';

import Button from 'ui/Button';
import Input from 'ui/Input';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import { amount, required } from 'utils/validators';

const StyledForm = styled.form`
  .withdraw-form-main {
    margin-top: 16px;
    display: grid;
    gap: 16px;
  }

  .withdraw-form-action {
    margin-top: 8px;

    ${media.lessThan('medium')} {
      width: 100%;
    }
  }
`;

function WithdrawForm () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { vaultBalance, qVaultMinimumTimeLock, withdrawFromVault } = useQVault();
  const user = useUser();
  const maxAmount = toBigNumber(vaultBalance).minus(qVaultMinimumTimeLock).toString();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(maxAmount)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('WITHDRAW_FROM_Q_VAULT_SUCCESS'),
        submitFn: async () => withdrawFromVault({ amount, address: user.address }),
        onSuccess: () => form.reset(),
      });
    }
  });

  return (
    <StyledForm
      noValidate
      className="block"
      onSubmit={form.submit}
    >
      <h2 className="text-h2">{t('WITHDRAW')}</h2>
      <p className="text-md color-secondary">{t('FROM_Q_VAULT_TO_Q_WALLET')}</p>

      <div className="withdraw-form-main">
        <Input
          {...form.fields.amount}
          type="number"
          label={t('AMOUNT')}
          prefix="Q"
          max={String(maxAmount)}
          placeholder="0.0"
          hint={t('AVAILABLE_TO_WITHDRAW', { amount: formatAsset(maxAmount, 'Q') })}
        />

        <Button
          type="submit"
          className="withdraw-form-action"
          disabled={!form.isValid}
        >
          {t('WITHDRAW')}
        </Button>
      </div>
    </StyledForm>
  );
}

export default WithdrawForm;
