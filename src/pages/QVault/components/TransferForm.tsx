import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { media } from '@q-dev/q-ui-kit';
import { formatAsset } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';
import styled from 'styled-components';

import Button from 'components/Button';
import Input from 'components/Input';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { getQVaultDepositAmount } from 'contracts/helpers/q-vault-helper';

import { amount, required } from 'utils/validators';

const StyledForm = styled.form`
  .transfer-form-main {
    margin-top: 16px;
    display: grid;
    gap: 16px;
  }

  .transfer-form-action {
    margin-top: 8px;

    ${media.lessThan('medium')} {
      width: 100%;
    }
  }
`;

function TransferForm () {
  const { t } = useTranslation();
  const { walletBalance, depositToVault } = useQVault();
  const { submitTransaction } = useTransaction();
  const { address } = useWeb3Context();
  const { qTicker } = useNetworkConfig();

  const [maxAmount, setMaxAmount] = useState('0');

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(maxAmount)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('TRANSFER_INTO_Q_VAULT_TX'),
        submitFn: () => depositToVault({ address, amount }),
        onSuccess: () => form.reset(),
      });
    }
  });

  const updateMaxAmount = async () => {
    const depositAmount = await getQVaultDepositAmount(address);
    setMaxAmount(Number(depositAmount) < 0 ? '0' : String(depositAmount));
  };

  useEffect(() => {
    updateMaxAmount();
  }, [walletBalance]);

  return (
    <StyledForm
      noValidate
      className="block"
      onSubmit={form.submit}
    >
      <h2 className="text-h2">{t('TRANSFER')}</h2>
      <p className="text-md color-secondary">{t('FROM_Q_WALLET_TO_Q_VAULT')}</p>

      <div className="transfer-form-main">
        <Input
          {...form.fields.amount}
          type="number"
          label={t('AMOUNT')}
          prefix={qTicker}
          hint={Number(maxAmount) > 0 && form.values.amount === maxAmount
            ? t('WARNING_NO_Q_LEFT', { asset: qTicker })
            : t('AVAILABLE_TO_TRANSFER', { amount: formatAsset(maxAmount, qTicker) })
          }
          max={maxAmount}
          placeholder="0.0"
        />

        <Button
          type="submit"
          className="transfer-form-action"
          disabled={!form.isValid}
        >
          {t('TRANSFER')}
        </Button>
      </div>
    </StyledForm>
  );
}

export default TransferForm;
