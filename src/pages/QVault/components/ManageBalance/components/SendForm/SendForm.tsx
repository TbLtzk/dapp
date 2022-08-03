import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'ui/Icon';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { SendButton } from './styles';

import { setSendCall } from 'store/q-vault/action-creators';
import { qVaultMinimumTimeLock, userBalance } from 'store/q-vault/selectors';

import formTypes from 'constants/form-types';
import { subtractAmount } from 'func/balance';
import { address, amount, required } from 'func/validators';

function SendForm () {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userQVaultBalance = useSelector(userBalance);
  const qVaultLockedAmount = useSelector(qVaultMinimumTimeLock);

  const maxAmount = subtractAmount(userQVaultBalance, qVaultLockedAmount);

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
    <form noValidate onSubmit={form.submit}>
      <h3 style={{ margin: '8px 0 8px' }}>{t('SEND_TO_FOREIGN_QVAULT_ACCOUNT')}</h3>

      <div className="card__send-form">
        <Input
          {...form.fields.address}
          label={t('ADDRESS')}
          prefix={<Icon name="wallet" />}
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

        <SendButton
          type="submit"
          disabled={!form.isValid}
        >
          {t('SEND')}
        </SendButton>
      </div>
    </form>
  );
}

export default SendForm;
