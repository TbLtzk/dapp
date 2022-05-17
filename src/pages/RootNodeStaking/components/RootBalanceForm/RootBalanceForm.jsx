import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { FormWrapper } from './styles';

import {
  setRootAnnounceWithdrawal,
  setRootStakeToPanel,
  setRootWithdraw,
} from 'store/root-node/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types.js';
import { toWei } from 'func/balance';
import { required } from 'func/validators';

function RootBalanceForm () {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required] },
  });
  useMetamaskReset(formTypes.rootNodeStaking, form.reset);

  const handleStake = () => {
    if (!form.validate()) return;

    dispatch(setRootStakeToPanel({
      from: userAddress,
      value: toWei(form.values.amount)
    }));
  };

  const handleWithdraw = () => {
    if (!form.validate()) return;

    dispatch(setRootWithdraw(
      toWei(form.values.amount),
      userAddress,
      { from: userAddress }
    ));
  };

  const handleAnnounce = () => {
    if (!form.validate()) return;

    dispatch(setRootAnnounceWithdrawal(
      toWei(form.values.amount),
      { from: userAddress }
    ));
  };

  return (
    <form noValidate onSubmit={form.submit}>
      <h4>Amount</h4>
      <FormWrapper>
        <div className="account-status__form-input">
          <Input
            {...form.fields.amount}
            type="number"
            prefix="Q"
            placeholder="0.00"
          />
        </div>

        <div className="account-status__form-actions">
          <Button
            disabled={!form.isValid}
            onClick={handleStake}
          >
            Stake to Panel
          </Button>
          <Button
            disabled={!form.isValid}
            onClick={handleAnnounce}
          >
            Announce Withdrawal
          </Button>
          <Button
            disabled={!form.isValid}
            onClick={handleWithdraw}
          >
            Withdraw from Panel
          </Button>
        </div>
      </FormWrapper>
    </form>
  );
}

export default RootBalanceForm;
