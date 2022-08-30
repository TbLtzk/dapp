import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setDepositCall } from 'store/q-vault/action-creators';
import { accountBalance } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getQVaultDepositAmount } from 'contracts/helpers/q-vault-helper';

import formTypes from 'constants/form-types';
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
  const dispatch = useDispatch();

  const address = useSelector(userAddressMetamask);
  const balance = useSelector(accountBalance);

  const [maxAmount, setMaxAmount] = useState('0');

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(maxAmount)] },
    onSubmit: (form) => {
      dispatch(setDepositCall(address, form.amount, t('TRANSFER_INTO_Q_VAULT_SUCCESS')));
    }
  });

  useMetamaskReset(formTypes.qVaultDeposit, form.reset);

  const updateMaxAmount = async () => {
    const depositAmount = await getQVaultDepositAmount(address);
    setMaxAmount(Number(depositAmount) < 0 ? '0' : String(depositAmount));
  };

  useEffect(() => {
    updateMaxAmount();
  }, [balance]);

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
