import Button from 'components/Base/Buttons/Button'
import FormInput from 'components/Base/Form/FormInput'
import { errorHandler } from 'func/useful'
import useInputForm from 'hooks/useInputForm'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBorrowAprove, setBorrowAsBorrow, setBorrowDeposit, setBorrowRepay, setBorrowWithdraw } from 'store/borrow-assets/action-creators'
import { allowanceDepositSelector, allowanceRepaySelector } from 'store/borrow-assets/selectors'
import { TYPE } from '../../BorrowManageAsset'

const DEPOSIT_BTN_TEXT = {
  approve: 'Approve',
  repay: 'Repay',
  add: 'Add'
}

function BorrowAsset ({ collateralDetails, borrowingDetails, vaultData }) {
  const dispatch = useDispatch()

  const allowanceDeposit = useSelector(allowanceDepositSelector)
  const allowanceRepay = useSelector(allowanceRepaySelector)

  const {
    register: registerBorrow,
    handleSubmit: borrowSubmit,
    errors: errorsBorrow,
    setValue: setBorrowMax,
    setCurrentType: setBorrowType
  } = useInputForm('borrow-type')

  const {
    register: registerRepay,
    handleSubmit: repaySubmit,
    errors: errorsRepay,
    setValue: setRepayMax,
    setCurrentType: setRepayType
  } = useInputForm('repay-type')

  const {
    register: registerDeposit,
    handleSubmit: depositSubmit,
    errors: errorsDeposit,
    setValue: setDepositMax,
    setCurrentType: setDepositType
  } = useInputForm('deposit-type')

  const {
    register: registerWithdraw,
    handleSubmit: withdrawSubmit,
    errors: errorsWithdraw,
    setValue: setWithdrawMax,
    setCurrentType: setWithdrawType
  } = useInputForm('withdraw-type')

  const [repayBtnTitle, setRepayBtnTitle] = useState(DEPOSIT_BTN_TEXT.repay)
  const [depositBtnTitle, setDepositBtnTitle] = useState(DEPOSIT_BTN_TEXT.add)

  function onChangeValueBtnSlide (type, value) {
    const inputValue = value.target.value
    if (type === TYPE.deposit) {
      if (Number(allowanceDeposit) < Number(inputValue)) {
        setDepositBtnTitle(DEPOSIT_BTN_TEXT.approve)
      } else {
        setDepositBtnTitle(DEPOSIT_BTN_TEXT.add)
      }
    } else if (type === TYPE.repay) {
      if (Number(allowanceRepay) < Number(inputValue)) {
        setRepayBtnTitle(DEPOSIT_BTN_TEXT.approve)
      } else {
        setRepayBtnTitle(DEPOSIT_BTN_TEXT.repay)
      }
    }
  }

  useEffect(() => {
    if (depositBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.add)
    }
    if (repayBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      setRepayBtnTitle(DEPOSIT_BTN_TEXT.repay)
    }
  }, [allowanceRepay, allowanceDeposit])

  function handleMaxRepay () {
    if (Number(borrowingDetails?.availableRepay) > 0) {
      if (Number(allowanceRepay) < Number(borrowingDetails?.availableRepay)) {
        setRepayBtnTitle(DEPOSIT_BTN_TEXT.approve)
      }
      setRepayMax('field', borrowingDetails?.availableRepay)
    }
  }

  function handleMaxDeposit () {
    if (Number(collateralDetails?.availableDeposit) > 0) {
      if (Number(allowanceDeposit) < Number(collateralDetails?.availableDeposit)) {
        setDepositBtnTitle(DEPOSIT_BTN_TEXT.approve)
      }
      setDepositMax('field', collateralDetails?.availableDeposit)
    }
  }

  function handleMaxBorrow () {
    if (Number(borrowingDetails?.availableBorrow) > 0) {
      setBorrowMax('field', borrowingDetails?.availableBorrow)
    }
  }

  function handleMaxWithdraw () {
    if (Number(collateralDetails?.availableWithdraw) > 0) {
      setWithdrawMax('field', collateralDetails?.availableWithdraw)
    }
  }

  function handleRepay (formData) {
    if (repayBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      dispatch(setBorrowAprove(TYPE.repay))
    } else {
      setRepayType('repay-type')
      dispatch(setBorrowRepay(formData.field, vaultData.vault.vaultNum))
    }
  }

  function handleDeposit (formData) {
    if (depositBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      dispatch(setBorrowAprove(TYPE.deposit))
    } else {
      setDepositType('deposit-type')
      dispatch(setBorrowDeposit(formData.field, vaultData.vault.vaultNum))
    }
  }

  function handleBorrow (formData) {
    setBorrowType('borrow-type')
    dispatch(setBorrowAsBorrow(formData.field, vaultData.vault.vaultNum))
  }

  function handleWithdraw (formData) {
    setWithdrawType('withdraw-type')
    dispatch(setBorrowWithdraw(formData.field, vaultData.vault.vaultNum))
  }

  return (
        <>
            <h4>Borrow Asset</h4>
            <div className="modal__one-line-form">
                <FormInput
                    palette="dark"
                    lbl={borrowingDetails?.assets}
                    min={0}
                    name="field"
                    modal={true}
                    type="number"
                    placeholder="0.00"
                    onMaxClick={handleMaxBorrow}
                    ref={registerBorrow({ required: true })}
                    valid={errorHandler(errorsBorrow, 'field')}
                />
                <Button type="outline" title="Borrow" width="100px" handleButton={borrowSubmit(handleBorrow)} />
            </div>
            <h4>Repay Borrowed Asset</h4>
            <div className="modal__one-line-form">
                <FormInput
                    palette="dark"
                    lbl={borrowingDetails?.assets}
                    min={0}
                    name="field"
                    type="number"
                    modal={true}
                    placeholder="0.00"
                    onMaxClick={handleMaxRepay}
                    ref={registerRepay({ required: true })}
                    valid={errorHandler(errorsRepay, 'field')}
                    onChange={(value) => {
                      onChangeValueBtnSlide(TYPE.repay, value)
                    }}
                />
                <Button type="outline" title={repayBtnTitle} width="100px" handleButton={repaySubmit(handleRepay)} />
            </div>

            <h4>Deposit Collateral</h4>
            <div className="modal__one-line-form">
                <FormInput
                    palette="dark"
                    lbl={collateralDetails?.assets}
                    min={0}
                    name="field"
                    type="number"
                    modal={true}
                    placeholder="0.00"
                    onMaxClick={handleMaxDeposit}
                    ref={registerDeposit({ required: true })}
                    valid={errorHandler(errorsDeposit, 'field')}
                    onChange={(value) => {
                      onChangeValueBtnSlide(TYPE.deposit, value)
                    }}
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
                    palette="dark"
                    lbl={collateralDetails?.assets}
                    min={0}
                    name="field"
                    type="number"
                    modal={true}
                    placeholder="0.00"
                    onMaxClick={handleMaxWithdraw}
                    ref={registerWithdraw({ required: true })}
                    valid={errorHandler(errorsWithdraw, 'field')}
                />
                <Button type="outline" title="Withdraw" width="100px" handleButton={withdrawSubmit(handleWithdraw)} />
            </div>
        </>
  )
}

export default BorrowAsset
