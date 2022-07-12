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
      dispatch(setSendCall(form.address, form.amount));
    },
  });

  useMetamaskReset(formTypes.qVaultSend, form.reset);

  return (
    <form noValidate onSubmit={form.submit}>
      <h3 style={{ margin: '8px 0 8px' }}>Send to foreign QVault account</h3>

      <div className="card__send-form">
        <Input
          {...form.fields.address}
          label="Address"
          prefix={<Icon name="wallet" />}
          placeholder="0x..."
        />

        <Input
          {...form.fields.amount}
          type="number"
          label="Amount"
          prefix="Q"
          max={maxAmount}
          placeholder="0.0"
        />

        <SendButton
          type="submit"
          disabled={!form.isValid}
        >
          Send
        </SendButton>
      </div>
    </form>
  );
}

export default SendForm;
