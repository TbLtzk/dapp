import React, { useEffect, useState } from 'react';
import Button from 'components/Base/Buttons/Button';
import CustomBlock from 'components/Base/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';
import Handler from './handler';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { useForm } from 'react-hook-form';
import { errorHandler, fN } from 'func/useful';
import { fromSolDateFormattingT1 } from 'func/date';
import { useAlert } from 'react-alert';
import { AccountStatusForm, AccountStatusInfo } from './styles';
import {
  getAccTotalStake,
  getDelegatedStake,
  getOwnStake,
  getTotalStake
} from 'store/actions/action-creaters/validators';

export default function AccountStatus() {
  const {
    register: reg,
    handleSubmit: submit,
    errors
  } = useForm();
  const dispatch = useDispatch();

  const [validatorExist, setValidatorExist] = useState(false);
  const [accountableTotalStake, setAccountableTotalStake] = useState(0);
  const [validatorsList, setValidatorsList] = useState([]);
  const [validatorRank, setValidatorRank] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [annToWithdraw, setAnnToWithdraw] = useState(0);
  const [annToWithdrawEndTime, setAnnToWithdrawEndTime] = useState(0);

  const address = useSelector(userAddressMetamask);
  const handler = new Handler(address, useDispatch(), useAlert());
  const timeLockedAmount = 10

  useEffect(() => {
    dispatch(getTotalStake(address));
    dispatch(getOwnStake(address));
    dispatch(getDelegatedStake(address));
    dispatch(getAccTotalStake(address));
  }, [accountableTotalStake, accountBalance, annToWithdraw, annToWithdrawEndTime]);

  useEffect(() => {
    handler.setValidatorExist(setValidatorExist);
    handler.setAccountableTotalStake(setAccountableTotalStake);
    handler.setValidatorsList(setValidatorsList);
    handler.setAccountBalance(setAccountBalance);
    handler.setAnnToWithdrawData(setAnnToWithdraw, setAnnToWithdrawEndTime);
  }, []);

  useEffect(() => {
    if (Array.isArray(validatorsList) && validatorsList.length > 0) {
      validatorsList.forEach((el, key) => {
        if (address === el.validator) {
          setValidatorRank(key + 1);
        }
      });
    }
  }, [validatorsList]);

  const stakeToRanking = (formData) => {
    handler.stakeToRanking(formData.amount, setValidatorExist, setAccountableTotalStake, setValidatorsList,
      setAccountBalance);
  };

  const announce = (formData) => {
    handler.announce(formData.amount, setAccountableTotalStake, setAnnToWithdraw, setAnnToWithdrawEndTime);
  };

  const withdrawFromRanking = (formData) => {
    handler.withdrawFromRanking(formData.amount, setValidatorExist, setAccountableTotalStake, setValidatorsList,
      setAccountBalance, setAnnToWithdraw, setAnnToWithdrawEndTime);
  };

  const confirmValidation = () => {
    handler.confirmValidation();
  };

  const renderValidatorRanking = () => {
    if (validatorExist) {
      return (
        <>
          <div>
            <h5>Status</h5>
            <p>Active Validator</p>
          </div>
          <div>
            <h5>Current Rank</h5>
            <p>{validatorRank}#</p>
          </div>
        </>
      );
    }
    return (
      <div>
        <h5>Status</h5>
        <p>Not a Validator</p>
      </div>
    );
  };

  const renderConfValBtn = () => {
    if (accountableTotalStake > 0) {
      return (
        <div className="card__actions">
          <Button
            type="default"
            title="Join Validator Ranking"
            handleButton={() => confirmValidation()}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <CustomBlock>
      <h1>Manage balance</h1>
      <AccountStatusInfo>
        {renderValidatorRanking()}
        <div>
          <h5>Stake in Validator Ranking</h5>
          <p>{fN(accountableTotalStake)} Q</p>
        </div>
        {timeLockedAmount > 0 ?
          <div>
            <h5>Time locked amount</h5>
            <p>{timeLockedAmount} Q </p>
          </div> : null}
        <div>
          <h3>Announced for withdrawal</h3>
          <p>{fN(annToWithdraw)} Q</p>
        </div>
        <div>
          <h3>After</h3>
          <p>{annToWithdrawEndTime === 0 ? '-' : fromSolDateFormattingT1(annToWithdrawEndTime)}</p>
        </div>
        <div>
          <h3>Personal balance</h3>
          <p>{fN(accountBalance)} Q</p>
        </div>
      </AccountStatusInfo>
      <h4>Amount</h4>
      <AccountStatusForm>
        <div className={'account-status__form-input'}>
          <FormInput
            name="amount"
            type="number"
            lbl="Q"
            placeholder="0.00"
            ref={reg({
              required: 'Field is required!',
              min: 0
            })}
            valid={errorHandler(errors, 'amount')}
          />
        </div>
        <div className="account-status__form-actions">
          <Button
            type="default"
            title="Stake to Ranking"
            handleButton={submit(stakeToRanking)}
          />
          <Button
            type="default"
            title="Announce Withdrawal"
            handleButton={submit(announce)}
          />
          <Button
            type="default"
            title="Withdraw from Ranking"
            handleButton={submit(withdrawFromRanking)}
          />
        </div>
      </AccountStatusForm>
      {renderConfValBtn()}
    </CustomBlock>
  );
}
