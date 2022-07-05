import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { FORM_TYPES } from '../RootNodeMenu/RootNodeMenu';

import { setRootAnnounceWithdrawal, setRootStakeToPanel, setRootWithdraw } from 'store/root-node/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types.js';
import { toWei } from 'func/balance';
import { required } from 'func/validators';

interface Props {
  formType: string | null;
}

function RootBalanceForm ({ formType }: Props) {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required] },
  });
  useMetamaskReset(formTypes.rootNodeStaking, form.reset);

  const handleStake = () => {
    if (!form.validate()) return;
    dispatch(
      setRootStakeToPanel({
        from: userAddress,
        value: toWei(form.values.amount),
      })
    );
  };

  const handleWithdraw = () => {
    if (!form.validate()) return;
    dispatch(setRootWithdraw(toWei(form.values.amount), userAddress, { from: userAddress }));
  };

  const handleAnnounce = () => {
    if (!form.validate()) return;
    dispatch(setRootAnnounceWithdrawal(toWei(form.values.amount), { from: userAddress }));
  };

  const formTypesHandle = {
    [FORM_TYPES.stakeToRanking]: handleStake,
    [FORM_TYPES.announceWithdrawal]: handleAnnounce,
    [FORM_TYPES.withdrawFromRanking]: handleWithdraw,
  };

  return (
    <form noValidate onSubmit={form.submit}>
      <Input
        label="Amount"
        {...form.fields.amount}
        type="number"
        placeholder="0.00"
      />

      <Button
        style={{ width: '100%', marginTop: '25px' }}
        disabled={!form.isValid}
        onClick={formTypesHandle[formType ?? FORM_TYPES.stakeToRanking]}
      >
        Confirm
      </Button>
    </form>
  );
}

export default RootBalanceForm;
