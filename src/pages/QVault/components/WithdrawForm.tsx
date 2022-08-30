import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setWithdrawCall } from 'store/q-vault/action-creators';
import { qVaultMinimumTimeLock, userBalance } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types';
import { formatAsset, toBigNumber } from 'utils/numbers';
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
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const address = useSelector(userAddressMetamask);
  const userQVaultBalance = useSelector(userBalance);
  const qVaultLockedAmount = useSelector(qVaultMinimumTimeLock);
  const maxAmount = toBigNumber(userQVaultBalance).minus(qVaultLockedAmount).toString();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(maxAmount)] },
    onSubmit: (form) => {
      dispatch(setWithdrawCall(address, form.amount, t('WITHDRAW_FROM_Q_VAULT_SUCCESS')));
    }
  });

  useMetamaskReset(formTypes.qVaultWithdraw, form.reset);

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
