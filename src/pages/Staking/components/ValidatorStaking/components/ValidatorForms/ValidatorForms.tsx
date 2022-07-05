import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { FORM_TYPES } from '../ValidatorMenu/ValidatorMenu';

import { userAddressMetamask } from 'store/user-inf/selectors';
import {
  setValidatorsAnnounceWithdrawal,
  setValidatorsCommitStake,
  setValidatorsWithdraw,
} from 'store/validators/action-creators';

import { required } from 'func/validators';

interface Props {
  formType: string | null;
}

function ValidatorForms ({ formType }: Props) {
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required] },
  });

  const handleStake = () => {
    if (!form.validate()) return;
    dispatch(setValidatorsCommitStake(address, form.values.amount));
  };

  const handleAnnounce = () => {
    if (!form.validate()) return;
    dispatch(setValidatorsAnnounceWithdrawal(address, form.values.amount));
  };

  const handleWithdraw = () => {
    if (!form.validate()) return;
    dispatch(setValidatorsWithdraw(address, form.values.amount));
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

export default ValidatorForms;
