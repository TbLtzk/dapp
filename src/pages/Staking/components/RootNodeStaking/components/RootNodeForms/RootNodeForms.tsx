import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { FORM_TYPES } from '../RootNodeMenu/RootNodeMenu';

import { userBalance } from 'store/q-vault/selectors';
import { setRootAnnounceWithdrawal, setRootStakeToPanel, setRootWithdraw } from 'store/root-node/action-creators';
import { rootNodeStake, withdrawals } from 'store/root-node/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types.js';
import { fromWei, toWei } from 'func/balance';
import { BN } from 'func/useful';
import { max, required } from 'func/validators';

interface Props {
  formType: string | null;
  onReset: () => void;
}

function RootNodeForms ({ formType, onReset }: Props) {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);
  const amountNodeStake = useSelector(rootNodeStake);
  const withdrawalInfo = useSelector(withdrawals);
  const userQVBalance = useSelector(userBalance);

  const getMaxAmount = () => {
    const withdrawalAmount = fromWei(withdrawalInfo.amount);
    switch (formType) {
      case FORM_TYPES.stakeToRanking:
        return userQVBalance;
      case FORM_TYPES.announceWithdrawal:
        return BN(amountNodeStake).plus(BN(withdrawalAmount)).toString();
      case FORM_TYPES.withdrawFromRanking:
        return withdrawalAmount;
      default:
        return '0';
    }
  };

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, max(getMaxAmount())] },
    onSubmit: ({ amount }) => {
      switch (formType) {
        case FORM_TYPES.stakeToRanking:
          dispatch(setRootStakeToPanel({ from: userAddress, value: toWei(amount) }));
          break;
        case FORM_TYPES.announceWithdrawal:
          dispatch(setRootAnnounceWithdrawal(toWei(amount), { from: userAddress }));
          break;
        case FORM_TYPES.withdrawFromRanking:
          dispatch(setRootWithdraw(toWei(amount), userAddress, { from: userAddress }));
          break;
      }
    }
  });

  useMetamaskReset(formTypes.rootNodeStaking, onReset);

  return (
    <form noValidate onSubmit={form.submit}>
      <Input
        {...form.fields.amount}
        type="number"
        label="Amount"
        placeholder="0.00"
        max={getMaxAmount()}
      />

      <Button
        type="submit"
        style={{ width: '100%', marginTop: '24px' }}
        disabled={!form.isValid}
      >
        Confirm
      </Button>
    </form>
  );
}

export default RootNodeForms;
