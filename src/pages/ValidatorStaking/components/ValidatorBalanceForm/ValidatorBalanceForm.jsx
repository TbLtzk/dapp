import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { FormWrapper } from './styles';

import { userAddressMetamask } from 'store/user-inf/selectors';
import {
  setValidatorsAnnounceWithdrawal,
  setValidatorsCommitStake,
  setValidatorsEnterShortList,
  setValidatorsWithdraw,
} from 'store/validators/action-creators';
import { isUserValidator } from 'store/validators/selectors';

import formTypes from 'constants/form-types';
import { required } from 'func/validators';

function ValidatorBalanceForm () {
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);
  const isValidator = useSelector(isUserValidator);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required] },
  });
  useMetamaskReset(formTypes.validatorsStaking, form.reset);

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
            Stake to Ranking
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
            Withdraw from Ranking
          </Button>
        </div>
      </FormWrapper>

      {!isValidator && (
        <div className="card__actions">
          <Button
            style={{ marginTop: '10px' }}
            onClick={() => dispatch(setValidatorsEnterShortList(address))}
          >
            Join Validator Ranking
          </Button>
        </div>
      )}
    </form>
  );
}

export default ValidatorBalanceForm;
