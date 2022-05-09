import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import FormInput from 'components/Base/Form/FormInput';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import ModalWindow from 'components/Base/ModalWindow';
import { WrapSpinner } from 'pages/styles';

import {
  getSavingAllowance,
  getSavingAviableToDeposit,
  getSavingBalanceDetails,
  setSavingAprove,
  setSavingDeposit,
  setSavingWithdraw
} from 'store/saving-assets/action-creators';
import {
  savingAllowanceSelector,
  savingAviableToDepositSelector,
  savingBalanceDetailsSelector
} from 'store/saving-assets/selectors';

import { errorHandler, fN } from 'func/useful';

const DEPOSIT_BTN_TEXT = {
  deposit: 'Deposit',
  approve: 'Approve'
};

const BTN_LENGTH = '100px';

function SaveManageAsset (props) {
  const { depositAsset, interestAsset, rate } = props;

  const dispatch = useDispatch();

  const { register: register1, handleSubmit: handleSubmit1, errors: errors1, setValue: setDepositMax } = useForm();
  const { register: register2, handleSubmit: handleSubmit2, errors: errors2, setValue: setWithdrawMax } = useForm();

  const [depositBtnTitle, setDepositBtnTitle] = useState(DEPOSIT_BTN_TEXT.deposit);

  const [isModalShown, setIsModalShown] = useState(false);

  const savingBalanceDetails = useSelector(savingBalanceDetailsSelector);
  const savingAviableToDeposit = useSelector(savingAviableToDepositSelector);
  const savingAllowance = useSelector(savingAllowanceSelector);

  const { interestRate, currentBalance, estimatedInterest } = savingBalanceDetails;

  useEffect(() => {
    if (isModalShown) {
      dispatch(getSavingAllowance());
      dispatch(getSavingBalanceDetails());
      dispatch(getSavingAviableToDeposit());
    }
  }, [depositAsset, interestAsset, rate, dispatch, isModalShown]);

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

  function deposit (formData) {
    if (depositBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      dispatch(setSavingAprove());
      dispatch(getSavingAllowance());
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.deposit);
    } else {
      dispatch(setSavingDeposit(formData.amount));
      setDepositMax('amount', null);
    }
  }

  function withdraw (formData) {
    dispatch(setSavingWithdraw(formData.amount));
    setWithdrawMax('amount', null);
  }

  function handleDepositAllow (value) {
    if (Number(savingAllowance) < Number(value.target.value)) {
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.approve);
    } else {
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.deposit);
    }
  }

  return (
    <>
      <Button
        isIconPositionRight
        icon="arrow-top-right"
        title="Manage"
        type="transparent"
        handleButton={() => {
          setIsModalShown(true);
        }}
      />
      <ModalWindow
        show={isModalShown}
        modalTitle={'Saving ' + depositAsset}
        content={
          !savingAviableToDeposit && !savingAllowance
            ? (
              <WrapSpinner>
                <LoadingSpinner />
              </WrapSpinner>
            )
            : (
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
                    ref={register1({ required: true })}
                    palette="dark"
                    prefix={depositAsset}
                    min={0}
                    name="amount"
                    type="number"
                    modal={true}
                    placeholder="0.00"
                    valid={errorHandler(errors1, 'field')}
                    onMaxClick={handleMaxDeposit}
                    onChange={handleDepositAllow}
                  />
                  <Button
                    type="outline"
                    title={depositBtnTitle}
                    width={BTN_LENGTH}
                    handleButton={handleSubmit1(deposit)}
                  />
                </div>
                <h4>Withdraw Saving Asset</h4>
                <div className="modal__one-line-form">
                  <FormInput
                    ref={register2({ required: true })}
                    palette="dark"
                    prefix={interestAsset}
                    min={0}
                    name="amount"
                    type="number"
                    modal={true}
                    placeholder="0.00"
                    valid={errorHandler(errors2, 'field')}
                    onMaxClick={handleMaxWithdraw}
                  />
                  <Button
                    type="outline"
                    title="Withdraw"
                    width={BTN_LENGTH}
                    handleButton={handleSubmit2(withdraw)}
                  />
                </div>
              </>
            )
        }
        onHide={() => {
          setIsModalShown(false);
        }}
      />
    </>
  );
}

export default SaveManageAsset;
