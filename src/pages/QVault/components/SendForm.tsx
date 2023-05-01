import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { media } from 'styles/media';

import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import useQVaultLimits from '../hooks/useQVaultLimits';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { formatAsset } from 'utils/numbers';
import { address, amount, required } from 'utils/validators';

const StyledForm = styled.form`
  .send-form-main {
    margin-top: 16px;
    display: grid;
    gap: 24px;
  }

  .send-form-fields {
    display: grid;
    gap: 16px;
  }

  .send-form-action {
    min-width: 90px;
    margin-top: 8px;

    ${media.lessThan('medium')} {
      width: 100%;
    }
  }
`;

function SendForm () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { sendToVault } = useQVault();
  const { maxWithdrawAmount } = useQVaultLimits();

  const form = useForm({
    initialValues: { address: '', amount: '' },
    validators: {
      address: [required, address],
      amount: [required, amount(maxWithdrawAmount)],
    },
    onSubmit: (values) => {
      submitTransaction({
        successMessage: t('SEND_TO_FOREIGN_QVAULT_ACCOUNT_SUCCESS'),
        submitFn: () => sendToVault(values),
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
      <h2 className="text-h2">{t('SEND')}</h2>
      <p className="text-md color-secondary">{t('FROM_YOUR_Q_VAULT_TO_OTHER_Q_VAULT')}</p>

      <div className="send-form-main">
        <div className="send-form-fields">
          <Input
            {...form.fields.address}
            label={t('RECIPIENT_ADDRESS')}
            prefix={<Icon name="wallet" className="text-lg" />}
            placeholder="0x..."
          />

          <Input
            {...form.fields.amount}
            type="number"
            label={t('AMOUNT')}
            prefix="Q"
            max={maxWithdrawAmount}
            placeholder="0.0"
            labelTip={t('AVAILABLE_WITH_AMOUNT', { amount: formatAsset(maxWithdrawAmount, 'Q') })}
          />
        </div>

        <Button
          type="submit"
          className="send-form-action"
          disabled={!form.isValid}
        >
          {t('SEND')}
        </Button>
      </div>
    </StyledForm>
  );
}

export default SendForm;
