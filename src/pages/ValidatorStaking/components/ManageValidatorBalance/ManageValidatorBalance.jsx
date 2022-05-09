import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import CustomBlock from 'components/Base/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';

import { AccountStatusForm, AccountStatusInfo } from '../../../RootNodeStaking/styles';

import { getAccountBalance } from 'store/q-vault/action-creators';
import { accountBalance } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import {
  getAccountableTotalStake,
  getIsUserValidator,
  getMinimumValidatorsTimeLock,
  getValidatorWithdrawalInfo,
  setValidatorsAnnounceWithdrawal,
  setValidatorsCommitStake,
  setValidatorsEnterShortList,
  setValidatorsWithdraw
} from 'store/validators/action-creators';
import {
  accountableTotalStake,
  isUserValidator,
  validatorsMinimumTimeLock,
  validatorsWidenedSelector,
  validatorWithdrawalInfo
} from 'store/validators/selectors';

import { fromWei } from 'func/balance';
import { fromSolDateFormattingT1 } from 'func/date';
import { errorHandler, fN } from 'func/useful';

function ManageValidatorBalance () {
  const { register: reg, handleSubmit: submit, errors } = useForm();

  const dispatch = useDispatch();

  const address = useSelector(userAddressMetamask);

  const userAccountBalance = useSelector(accountBalance);
  const isThisUserValidator = useSelector(isUserValidator);

  const userAccountableTotalStake = useSelector(accountableTotalStake);
  const userValidatorWithdrawalInfo = useSelector(validatorWithdrawalInfo);
  const validatorLockedAmount = useSelector(validatorsMinimumTimeLock);
  const memberTable = useSelector(validatorsWidenedSelector);

  useEffect(() => {
    dispatch(getAccountBalance(address));
    dispatch(getIsUserValidator(address));
    dispatch(getMinimumValidatorsTimeLock(address));
    dispatch(getAccountableTotalStake(address));
    dispatch(getValidatorWithdrawalInfo(address));
  }, [dispatch]);

  const stakeToRanking = (formData) => {
    dispatch(setValidatorsCommitStake(address, formData.amount));
  };

  const announceWithdrawal = (formData) => {
    dispatch(setValidatorsAnnounceWithdrawal(address, formData.amount));
  };

  const withdrawFromRanking = (formData) => {
    dispatch(setValidatorsWithdraw(address, formData.amount));
  };

  const confirmValidation = () => {
    dispatch(setValidatorsEnterShortList(address));
  };

  const confirmValidatorButton = !isThisUserValidator
    ? (
      <div className="card__actions">
        <Button
          type="default"
          title="Join Validator Ranking"
          handleButton={confirmValidation}
        />
      </div>
    )
    : null;

  const userRank = memberTable.find((member) => member.address === address)?.rank;

  const checkIsUserValidator = (
    <>
      <div>
        <h5>Status</h5>
        {isThisUserValidator ? <p>Active validator</p> : <p>Not a validator</p>}
      </div>

      <div>
        <h5>Current Rank</h5>
        <p>{!userRank ? '-' : userRank + ' #'}</p>
      </div>
    </>
  );

  return (
    <CustomBlock>
      <h1>Manage Balance</h1>
      <AccountStatusInfo>
        {checkIsUserValidator}
        <div>
          <h5>Stake in Validator Ranking</h5>
          <p>{fN(userAccountableTotalStake)} Q</p>
        </div>
        <div>
          <h5>Q Balance</h5>
          <p>{fN(userAccountBalance)} Q</p>
        </div>
        {Number(validatorLockedAmount) > 0
          ? (
            <div>
              <h5>Time Locked Amount</h5>
              <p>{fN(validatorLockedAmount)} Q </p>
            </div>
          )
          : null}
        <div>
          <h5>Announced for Withdrawal</h5>
          <p>{fromWei(userValidatorWithdrawalInfo.amount)} Q</p>
        </div>
        <div>
          <h5>Announcement Status</h5>
          <p>{!Number(userValidatorWithdrawalInfo?.amount) ? '-' : 'Pending'}</p>
        </div>
        <div>
          <h5>Announcement End</h5>
          {!Number(userValidatorWithdrawalInfo?.amount)
            ? (
              <p>-</p>
            )
            : (
              <p>
                {userValidatorWithdrawalInfo
                  ? fromSolDateFormattingT1(userValidatorWithdrawalInfo.endTime)
                  : '-'}
              </p>
            )}
        </div>
      </AccountStatusInfo>
      <h4>Amount</h4>
      <AccountStatusForm>
        <div className="account-status__form-input">
          <FormInput
            ref={reg({
              required: 'Please, fill the field',
              min: 0
            })}
            color={true}
            name="amount"
            type="number"
            prefix="Q"
            placeholder="0.00"
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
            handleButton={submit(announceWithdrawal)}
          />
          <Button
            type="default"
            title="Withdraw from Ranking"
            handleButton={submit(withdrawFromRanking)}
          />
        </div>
      </AccountStatusForm>
      {confirmValidatorButton}
    </CustomBlock>
  );
}

export default ManageValidatorBalance;
