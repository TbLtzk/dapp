import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import { formatNumber, toBigNumber } from 'utils/numbers';
import { max, required } from 'utils/validators';

function LockForm () {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);
  const userVotingWeight = useSelector(votingWeight);
  const userQVaultBalance = useSelector(userBalance);

  const form = useForm({
    initialValues: { amount: userVotingWeight as string },
    validators: { amount: [required, max(userQVaultBalance)] },
    onSubmit: (form) => {
      const delta = toBigNumber(form.amount).minus(toBigNumber(userVotingWeight));
      dispatch(
        delta.gt(0)
          ? setLockAmount(userAddress, delta.toString(), t('UPDATE_LOCK_AMOUNT_SUCCESS'))
          : setUnlockAmount(userAddress, delta.abs().toString(), t('UPDATE_LOCK_AMOUNT_SUCCESS'))
      );
    },
  });

  useMetamaskReset(formTypes.qVaultLock, form.reset);
  useEffect(() => {
    form.fields.amount.onChange(String(userVotingWeight));
  }, [userVotingWeight]);

  const handleRangeChange = (_: string, val: string) => {
    const weightToSet = toBigNumber(val).decimalPlaces(0).gte(toBigNumber(userQVaultBalance).decimalPlaces(0))
      ? String(userQVaultBalance)
      : toBigNumber(val).decimalPlaces(0).toString();

    if (form.values.amount === weightToSet) return;
    form.fields.amount.onChange(weightToSet);
  };

  const percentValue = toBigNumber(form.values.amount || 0)
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
        label={t('LOCKED_AMOUNT')}
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
        hint={`${t('CURRENT_LOCKED_AMOUNT')} ${formatNumber(userVotingWeight, 4)} Q`}
      />

      <Button
        type="submit"
        className="form-action"
        disabled={!form.isValid || form.values.amount === String(userVotingWeight)}
        style={{ width: '200px', marginTop: '8px' }}
      >
        {t('UPDATE_LOCK_AMOUNT')}
      </Button>
    </form>
  );
}

export default LockForm;
