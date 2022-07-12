import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setLockAmount } from 'store/q-vault/action-creators';
import { userBalance, votingWeight } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types';
import { subtractAmount } from 'func/balance';
import { amount, required } from 'func/validators';

function LockForm () {
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);
  const userVotingWeight = useSelector(votingWeight);
  const userQVaultBalance = useSelector(userBalance);

  const maxAmount = subtractAmount(userQVaultBalance, userVotingWeight);
  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(maxAmount)] },
    onSubmit: (form) => {
      dispatch(setLockAmount(userAddress, form.amount));
    }
  });
  useMetamaskReset(formTypes.qVaultLock, form.reset);

  return (
    <form noValidate onSubmit={form.submit}>
      <div className="card__one-line-simple-form">
        <Input
          {...form.fields.amount}
          type="number"
          label="Increase Voting Weight by"
          prefix="Q"
          placeholder="0.0"
          max={maxAmount}
        />
        <Button
          type="submit"
          className="form-action"
          disabled={!form.isValid}
          style={{ width: '90px' }}
        >
          Increase
        </Button>
      </div>
    </form>
  );
}

export default LockForm;
