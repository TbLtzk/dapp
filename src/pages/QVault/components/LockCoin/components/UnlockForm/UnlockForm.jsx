import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setUnlockAmount } from 'store/q-vault/action-creators';
import { votingWeight } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function UnlockForm () {
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);
  const userVotingWeight = useSelector(votingWeight);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(userVotingWeight)] },
    onSubmit: (form) => {
      dispatch(setUnlockAmount(userAddress, form.amount));
    }
  });
  useMetamaskReset(formTypes.qVaultUnlock, form.reset);

  return (
    <form noValidate onSubmit={form.submit}>
      <div className="card__one-line-simple-form">
        <Input
          {...form.fields.amount}
          type="number"
          label="Reduce Voting Weight by"
          prefix="Q"
          placeholder="0.0"
          max={userVotingWeight}
        />
        <Button
          type="submit"
          className="form-action"
          disabled={!form.isValid}
          style={{ width: '90px' }}
        >
          Reduce
        </Button>
      </div>
    </form>
  );
}

export default UnlockForm;
