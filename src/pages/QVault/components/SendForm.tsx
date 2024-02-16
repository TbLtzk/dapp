import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { Icon, media } from '@q-dev/q-ui-kit';
import { formatAsset } from '@q-dev/utils';
import styled from 'styled-components';

import Button from 'components/Button';
import Input from 'components/Input';

import useNetworkConfig from 'hooks/useNetworkConfig';

import useQVaultLimits from '../hooks/useQVaultLimits';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';

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
  const { qTicker } = useNetworkConfig();

  const form = useForm({
    initialValues: { address: '', amount: '' },
    validators: {
      address: [required, address],
      amount: [required, amount(maxWithdrawAmount)],
    },
    onSubmit: (values) => {
      submitTransaction({
        successMessage: t('SEND_TO_FOREIGN_QVAULT_ACCOUNT_TX'),
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
            labelTip={t('AVAILABLE_WITH_AMOUNT', { amount: formatAsset(maxWithdrawAmount, qTicker) })}
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
