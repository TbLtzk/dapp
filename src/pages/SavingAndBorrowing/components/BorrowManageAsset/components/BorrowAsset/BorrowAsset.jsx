import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import FormInput from 'components/Base/Form/FormInput';

import useInputForm from 'hooks/useInputForm';

import { TYPE } from '../../BorrowManageAsset';

import {
  setBorrowAprove,
  setBorrowAsBorrow,
  setBorrowDeposit,
  setBorrowRepay,
  setBorrowWithdraw,
} from 'store/borrow-assets/action-creators';
import { allowanceDepositSelector, allowanceRepaySelector } from 'store/borrow-assets/selectors';

import formTypes from 'constants/form-types';
import { errorHandler } from 'func/useful';

const DEPOSIT_BTN_TEXT = {
  approve: 'Approve',
  repay: 'Repay',
  deposit: 'Deposit',
};

function BorrowAsset ({ collateralDetails, borrowingDetails, vaultData }) {
  const dispatch = useDispatch();

  const allowanceDeposit = useSelector(allowanceDepositSelector);
  const allowanceRepay = useSelector(allowanceRepaySelector);

  const {
    register: registerBorrow,
    handleSubmit: borrowSubmit,
    errors: errorsBorrow,
    setValue: setBorrowMax,
  } = useInputForm(formTypes.borrowAssetBorrow);

  const {
    register: registerWithdraw,
    handleSubmit: withdrawSubmit,
    errors: errorsWithdraw,
    setValue: setWithdrawMax,
  } = useInputForm(formTypes.borrowAssetWithdraw);

  const {
    register: registerRepay,
    handleSubmit: repaySubmit,
    errors: errorsRepay,
    setValue: setRepayMax,
    watch: watchRepay,
  } = useInputForm(formTypes.borrowAssetRepay);

  const {
    register: registerDeposit,
    handleSubmit: depositSubmit,
    errors: errorsDeposit,
    setValue: setDepositMax,
    watch: watchDeposit,
  } = useInputForm(formTypes.borrowAssetDeposit);

  const [repayBtnTitle, setRepayBtnTitle] = useState(DEPOSIT_BTN_TEXT.repay);
  const [depositBtnTitle, setDepositBtnTitle] = useState(DEPOSIT_BTN_TEXT.deposit);

  const repayInput = watchRepay('field');
  const depositInput = watchDeposit('field');

  useEffect(() => {
    if (Number(allowanceDeposit) < Number(depositInput)) {
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.approve);
    } else {
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.deposit);
    }
  }, [allowanceDeposit, depositInput]);

  useEffect(() => {
    if (Number(allowanceRepay) < Number(repayInput)) {
      setRepayBtnTitle(DEPOSIT_BTN_TEXT.approve);
    } else {
      setRepayBtnTitle(DEPOSIT_BTN_TEXT.repay);
    }
  }, [allowanceRepay, repayInput]);

  function handleMaxRepay () {
    if (Number(borrowingDetails?.availableRepay) > 0) {
      if (Number(allowanceRepay) < Number(borrowingDetails?.availableRepay)) {
        setRepayBtnTitle(DEPOSIT_BTN_TEXT.approve);
      }
      setRepayMax('field', borrowingDetails?.availableRepay);
    }
  }

  function handleMaxDeposit () {
    if (Number(collateralDetails?.availableDeposit) > 0) {
      if (Number(allowanceDeposit) < Number(collateralDetails?.availableDeposit)) {
        setDepositBtnTitle(DEPOSIT_BTN_TEXT.approve);
      }
      setDepositMax('field', collateralDetails?.availableDeposit);
    }
  }

  function handleMaxBorrow () {
    if (Number(borrowingDetails?.availableBorrow) > 0) {
      setBorrowMax('field', borrowingDetails?.availableBorrow);
    }
  }

  function handleMaxWithdraw () {
    if (Number(collateralDetails?.availableWithdraw) > 0) {
      setWithdrawMax('field', collateralDetails?.availableWithdraw);
    }
  }

  function handleRepay (formData) {
    if (repayBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      dispatch(setBorrowAprove(TYPE.repay));
    } else {
      dispatch(setBorrowRepay(formData.field, vaultData.vault.vaultNum));
    }
  }

  function handleDeposit (formData) {
    if (depositBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      dispatch(setBorrowAprove(TYPE.deposit));
    } else {
      dispatch(setBorrowDeposit(formData.field, vaultData.vault.vaultNum));
    }
  }

  function handleBorrow (formData) {
    dispatch(setBorrowAsBorrow(formData.field, vaultData.vault.vaultNum));
  }

  function handleWithdraw (formData) {
    dispatch(setBorrowWithdraw(formData.field, vaultData.vault.vaultNum));
  }

  return (
    <>
      <h4>Borrow Asset</h4>
      <div className="modal__one-line-form">
        <FormInput
          ref={registerBorrow({ required: true })}
          invertedColors
          prefix={borrowingDetails?.assets}
          min={0}
          name="field"
          type="number"
          placeholder="0.00"
          error={errorHandler(errorsBorrow, 'field')}
          onMaxClick={handleMaxBorrow}
        />
        <Button
          type="outline"
          title="Borrow"
          width="100px"
          handleButton={borrowSubmit(handleBorrow)}
        />
      </div>
      <h4>Repay Borrowed Asset</h4>
      <div className="modal__one-line-form">
        <FormInput
          ref={registerRepay({ required: true })}
          invertedColors
          prefix={borrowingDetails?.assets}
          min={0}
          name="field"
          type="number"
          placeholder="0.00"
          error={errorHandler(errorsRepay, 'field')}
          onMaxClick={handleMaxRepay}
        />
        <Button
          type="outline"
          title={repayBtnTitle}
          width="100px"
          handleButton={repaySubmit(handleRepay)}
        />
      </div>

      <h4>Deposit Collateral</h4>
      <div className="modal__one-line-form">
        <FormInput
          ref={registerDeposit({ required: true })}
          invertedColors
          prefix={collateralDetails?.assets}
          min={0}
          name="field"
          type="number"
          placeholder="0.00"
          error={errorHandler(errorsDeposit, 'field')}
          onMaxClick={handleMaxDeposit}
        />
        <Button
          type="outline"
          title={depositBtnTitle}
          width="100px"
          handleButton={depositSubmit(handleDeposit)}
        />
      </div>
      <h4>Withdraw Collateral</h4>
      <div className="modal__one-line-form">
        <FormInput
          ref={registerWithdraw({ required: true })}
          invertedColors
          prefix={collateralDetails?.assets}
          min={0}
          name="field"
          type="number"
          placeholder="0.00"
          error={errorHandler(errorsWithdraw, 'field')}
          onMaxClick={handleMaxWithdraw}
        />
        <Button
          type="outline"
          title="Withdraw"
          width="100px"
          handleButton={withdrawSubmit(handleWithdraw)}
        />
      </div>
    </>
  );
}

export default BorrowAsset;
