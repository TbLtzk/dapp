import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';

import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setSendCall } from 'store/q-vault/action-creators';
import { qVaultMinimumTimeLock, userBalance } from 'store/q-vault/selectors';

import formTypes from 'constants/form-types';
import { toBigNumber } from 'utils/numbers';
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
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userQVaultBalance = useSelector(userBalance);
  const qVaultLockedAmount = useSelector(qVaultMinimumTimeLock);
  const maxAmount = toBigNumber(userQVaultBalance).minus(qVaultLockedAmount).toString();

  const form = useForm({
    initialValues: { address: '', amount: '' },
    validators: {
      address: [required, address],
      amount: [required, amount(maxAmount)],
    },
    onSubmit: (form) => {
      dispatch(setSendCall(form.address, form.amount, t('SEND_TO_FOREIGN_QVAULT_ACCOUNT_SUCCESS')));
    },
  });

  useMetamaskReset(formTypes.qVaultSend, form.reset);

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
            max={String(maxAmount)}
            placeholder="0.0"
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
