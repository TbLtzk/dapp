import React, { useEffect, useState } from 'react'
import Button from 'components/Base/Buttons/Button'
import ModalWindow from 'components/Base/ModalWindow'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import FormInput from 'components/Base/Form/FormInput'

import { fN, errorHandler } from 'func/useful'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSavingAllowance,
  getSavingAviableToDeposit,
  getSavingBalanceDetails,
  setSavingAprove,
  setSavingDeposit,
  setSavingWithdraw
} from 'store/saving-assets/action-creators'
import {
  savingAllowanceSelector,
  savingAviableToDepositSelector,
  savingBalanceDetailsSelector
} from 'store/saving-assets/selectors'
import { WrapSpinner } from 'pages/styles'
import useInputForm from 'hooks/useInputForm'

const DEPOSIT_BTN_TEXT = {
  deposit: 'Deposit',
  approve: 'Approve'
}

const BTN_LENGTH = '100px'

function SaveManageAsset ({ depositAsset, interestAsset, rate }) {
  const dispatch = useDispatch()

  const savingBalanceDetails = useSelector(savingBalanceDetailsSelector)
  const savingAviableToDeposit = useSelector(savingAviableToDepositSelector)
  const savingAllowance = useSelector(savingAllowanceSelector)

  const {
    register: registerDeposit,
    handleSubmit: depositSubmit,
    errors: errorsDeposit,
    setValue: setDepositMax,
    setCurrentType: setDepositType
  } = useInputForm('deposit-asset')

  const {
    register: registerWithdraw,
    handleSubmit: withdrawSubmit,
    errors: errorsWidthdraw,
    setValue: setWithdrawMax,
    setCurrentType: setWithdrawType
  } = useInputForm('withdraw-asset')

  const [depositBtnTitle, setDepositBtnTitle] = useState(DEPOSIT_BTN_TEXT.deposit)
  const [isModalShown, setIsModalShown] = useState(false)

  const { interestRate, currentBalance, estimatedInterest } = savingBalanceDetails

  useEffect(() => {
    if (isModalShown) {
      dispatch(getSavingAllowance())
      dispatch(getSavingBalanceDetails())
      dispatch(getSavingAviableToDeposit())
    }
  }, [depositAsset, interestAsset, rate, dispatch, isModalShown])

  function handleMaxDeposit () {
    if (Number(savingAviableToDeposit) > 0) {
      if (Number(savingAllowance) < Number(savingAviableToDeposit)) {
        setDepositBtnTitle(DEPOSIT_BTN_TEXT.approve)
      }
      setDepositMax('amount', savingAviableToDeposit)
    }
  }

  function handleMaxWithdraw () {
    if (Number(currentBalance) > 0) {
      setWithdrawMax('amount', currentBalance)
    }
  }

  function handleDepositSubmit (formData) {
    if (depositBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      dispatch(setSavingAprove())
      dispatch(getSavingAllowance())
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.deposit)
    } else {
      setDepositType('deposit-asset')
      dispatch(setSavingDeposit(formData.amount))
    }
  }

  function handleWithdrawSubmit (formData) {
    setWithdrawType('withdraw-asset')
    dispatch(setSavingWithdraw(formData.amount))
  }

  function handleDepositAllow (value) {
    if (Number(savingAllowance) < Number(value.target.value)) {
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.approve)
    } else {
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.deposit)
    }
  }

  return (
        <>
            <Button
                isIconPositionRight
                icon="arrow-top-right"
                title="Manage"
                type="transparent"
                handleButton={() => setIsModalShown(true)}
            />
            <ModalWindow
                show={isModalShown}
                onHide={() => setIsModalShown(false)}
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
                                    palette="dark"
                                    lbl={depositAsset}
                                    min={0}
                                    name="amount"
                                    type="number"
                                    modal={true}
                                    placeholder="0.00"
                                    ref={registerDeposit({ required: true })}
                                    valid={errorHandler(errorsDeposit, 'field')}
                                    onMaxClick={handleMaxDeposit}
                                    onChange={handleDepositAllow}
                                />
                                <Button
                                    type="outline"
                                    title={depositBtnTitle}
                                    width={BTN_LENGTH}
                                    handleButton={depositSubmit(handleDepositSubmit)}
                                />
                            </div>
                            <h4>Withdraw Saving Asset</h4>
                            <div className="modal__one-line-form">
                                <FormInput
                                    palette="dark"
                                    lbl={interestAsset}
                                    min={0}
                                    name="amount"
                                    type="number"
                                    modal={true}
                                    onMaxClick={handleMaxWithdraw}
                                    placeholder="0.00"
                                    ref={registerWithdraw({ required: true })}
                                    valid={errorHandler(errorsWidthdraw, 'field')}
                                />
                                <Button
                                    type="outline"
                                    title="Withdraw"
                                    width={BTN_LENGTH}
                                    handleButton={withdrawSubmit(handleWithdrawSubmit)}
                                />
                            </div>
                        </>
                        )
                }
            />
        </>
  )
}

export default SaveManageAsset
