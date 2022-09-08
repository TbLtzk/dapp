import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { media } from 'styles/media';

import Button from 'components/Button';
import Input from 'components/Input';

import useForm from 'hooks/useForm';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import { getQVaultDepositAmount } from 'contracts/helpers/q-vault-helper';

import { formatAsset } from 'utils/numbers';
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
  const user = useUser();

  const [maxAmount, setMaxAmount] = useState('0');

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(maxAmount)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('TRANSFER_INTO_Q_VAULT_SUCCESS'),
        submitFn: () => depositToVault({ address: user.address, amount }),
        onSuccess: () => form.reset(),
      });
    }
  });

  const updateMaxAmount = async () => {
    const depositAmount = await getQVaultDepositAmount(user.address);
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
          prefix="Q"
          hint={Number(maxAmount) > 0 && form.values.amount === maxAmount
            ? t('WARNING_NO_Q_LEFT')
            : t('AVAILABLE_TO_TRANSFER', { amount: formatAsset(maxAmount, 'Q') })
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
