import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Base/Button';
import FormInput from 'components/Base/Form/FormInput';

import useInputForm from 'hooks/useInputForm';

import { setSavingAprove, setSavingDeposit, setSavingWithdraw } from 'store/saving-assets/action-creators';

import formTypes from 'constants/form-types';
import { errorHandler, fN } from 'func/useful';

const DEPOSIT_BTN_TEXT = {
  deposit: 'Deposit',
  approve: 'Approve',
};

function SaveAsset ({
  depositAsset,
  interestAsset,
  savingBalanceDetails,
  savingAllowance,
  savingAviableToDeposit,
}) {
  const { interestRate, currentBalance, estimatedInterest } = savingBalanceDetails;

  const dispatch = useDispatch();

  const [depositBtnTitle, setDepositBtnTitle] = useState(DEPOSIT_BTN_TEXT.deposit);

  const {
    register: registerDeposit,
    handleSubmit: depositSubmit,
    errors: errorsDeposit,
    setValue: setDepositMax,
    watch: depositWatch
  } = useInputForm(formTypes.savingAssetDeposit);

  const {
    register: registerWithdraw,
    handleSubmit: withdrawSubmit,
    errors: errorsWidthdraw,
    setValue: setWithdrawMax,
  } = useInputForm(formTypes.savingAssetWithdraw);

  const depositAmount = depositWatch('amount');

  useEffect(() => {
    if (Number(savingAllowance) < Number(depositAmount)) {
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.approve);
    } else {
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.deposit);
    }
  }, [depositAmount, savingAllowance]);

  function handleMaxDeposit () {
    if (Number(savingAviableToDeposit) > 0) {
      if (Number(savingAllowance) < Number(savingAviableToDeposit)) {
        setDepositBtnTitle(DEPOSIT_BTN_TEXT.approve);
      }
      setDepositMax('amount', savingAviableToDeposit);
    }
  }

  function handleMaxWithdraw () {
    if (Number(currentBalance) > 0) {
      setWithdrawMax('amount', currentBalance);
    }
  }

  function handleDepositSubmit (formData) {
    if (depositBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      dispatch(setSavingAprove());
    } else {
      dispatch(setSavingDeposit(formData.amount));
    }
  }

  function handleWithdrawSubmit (formData) {
    dispatch(setSavingWithdraw(formData.amount));
  }

  return (
    <>
      <div className="modal__line" />
      <h3>Deposit</h3>
      <div className="modal__three-colm">
        <div>
          <h5>Asset</h5>
          <p>{depositAsset}</p>
        </div>
        <div>
          <h5>Saving Balance</h5>
          <p>{fN(currentBalance)}</p>
        </div>
        <div>
          <h5>Available to Deposit</h5>
          <p>{fN(savingAviableToDeposit)}</p>
        </div>
      </div>
      <div className="modal__line" />
      <h3>Interest</h3>
      <div className="modal__three-colm">
        <div>
          <h5>Receive Asset</h5>
          <p>{interestAsset}</p>
        </div>
        <div>
          <h5>Yearly Expected Reward</h5>
          <p>{fN(estimatedInterest)}</p>
        </div>
        <div>
          <h5>Saving Reward (p.a)</h5>
          <p>{fN(interestRate)} %</p>
        </div>
      </div>
      <h4>Deposit Saving Asset</h4>
      <div className="modal__one-line-form">
        <FormInput
          ref={registerDeposit({ required: true })}
          invertedColors
          prefix={depositAsset}
          min={0}
          name="amount"
          type="number"
          placeholder="0.00"
          error={errorHandler(errorsDeposit, 'field')}
          onMaxClick={handleMaxDeposit}
        />
        <Button
          style={{ width: '100px' }}
          onClick={depositSubmit(handleDepositSubmit)}
        >
          {depositBtnTitle}
        </Button>
      </div>
      <h4>Withdraw Saving Asset</h4>
      <div className="modal__one-line-form">
        <FormInput
          ref={registerWithdraw({ required: true })}
          invertedColors
          prefix={interestAsset}
          min={0}
          name="amount"
          type="number"
          placeholder="0.00"
          error={errorHandler(errorsWidthdraw, 'field')}
          onMaxClick={handleMaxWithdraw}
        />
        <Button
          style={{ width: '100px' }}
          onClick={withdrawSubmit(handleWithdrawSubmit)}
        >
          Withdraw
        </Button>
      </div>
    </>
  );
}

export default SaveAsset;
