import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';
import Range from 'ui/Range';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setLockAmount, setUnlockAmount } from 'store/q-vault/action-creators';
import { userBalance, votingWeight } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types';
import { formatNumber } from 'func/formatters';
import { BN } from 'func/useful';
import { max, required } from 'func/validators';

function LockForm () {
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);
  const userVotingWeight = useSelector(votingWeight);
  const userQVaultBalance = useSelector(userBalance);

  const form = useForm({
    initialValues: { amount: userVotingWeight },
    validators: { amount: [required, max(userQVaultBalance)] },
    onSubmit: (form) => {
      const delta = BN(form.amount).minus(BN(userVotingWeight));
      dispatch(
        delta.gt(0)
          ? setLockAmount(userAddress, delta.toString())
          : setUnlockAmount(userAddress, delta.abs().toString())
      );
    }
  });

  useMetamaskReset(formTypes.qVaultLock, form.reset);
  useEffect(() => {
    form.fields.amount.onChange(String(userVotingWeight));
  }, [userVotingWeight]);

  const handleRangeChange = (_: string, val: string) => {
    const weightToSet = BN(val).decimalPlaces(0).gte(BN(userQVaultBalance).decimalPlaces(0))
      ? String(userQVaultBalance)
      : BN(val).decimalPlaces(0).toString();

    if (form.values.amount === weightToSet) return;
    form.fields.amount.onChange(weightToSet);
  };

  const percentValue = BN(form.values.amount || 0)
    .dividedBy(userQVaultBalance)
    .multipliedBy(100)
    .toString();

  return (
    <form
      noValidate
      style={{ display: 'grid', gap: '16px' }}
      onSubmit={form.submit}
    >
      <Range
        hideInput
        value={userQVaultBalance ? percentValue : '0'}
        label="Locked amount"
        max={String(userQVaultBalance)}
        formatter={(value) => `${formatNumber(value, 4)} Q`}
        onChange={handleRangeChange}
      />

      <Input
        {...form.fields.amount}
        type="number"
        prefix="Q"
        placeholder="0.0"
        max={String(userQVaultBalance)}
        hint={`Current locked amount: ${formatNumber(userVotingWeight, 4)} Q`}
      />

      <Button
        type="submit"
        className="form-action"
        disabled={!form.isValid || form.values.amount === String(userVotingWeight)}
        style={{ width: '200px', marginTop: '8px' }}
      >
        Update lock amount
      </Button>
    </form>
  );
}

export default LockForm;
