import React, { useEffect, useState } from 'react'
import Button from 'components/Base/Buttons/Button'
import ModalWindow from 'components/Base/ModalWindow'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import FormInput from 'components/Base/Form/FormInput'

import { fN, errorHandler } from 'func/useful'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  allowanceDepositSelector,
  allowanceRepaySelector,
  borrowVaultInfoSelector
} from 'store/borrow-assets/selectors'
import {
  getBorrowAllowance,
  getBorrowVaultInfo,
  setBorrowAprove,
  setBorrowAsBorrow,
  setBorrowDeposit,
  setBorrowRepay,
  setBorrowVaultInfo,
  setBorrowWithdraw
} from 'store/borrow-assets/action-creators'
import { WrapSpinner } from 'pages/UserPages/styles'

const BTN_LENGTH = '100px'

const DEPOSIT_BTN_TEXT = {
  approve: 'Approve',
  repay: 'Repay',
  add: 'Add'
}

const TYPE = {
  deposit: 'deposit',
  repay: 'repay'
}

function BorrowManageAsset ({ borrowingAsset, vault }) {
  const { register: register1, handleSubmit: handleSubmit1, errors: errors1, setValue: setBorrowMax } = useForm()
  const { register: register2, handleSubmit: handleSubmit2, errors: errors2, setValue: setRepayMax } = useForm()
  const { register: register3, handleSubmit: handleSubmit3, errors: errors3, setValue: setDepositMax } = useForm()
  const { register: register4, handleSubmit: handleSubmit4, errors: errors4, setValue: setWithdrawMax } = useForm()

  const dispatch = useDispatch()

  const [isModalShown, setIsModalShown] = useState(false)

  const actCardDataInf = {
    type: 'borrow',
    collateral: vault.colKey,
    borrow: borrowingAsset,
    vault
  }

  const [repayBtnTitle, setRepayBtnTitle] = useState(DEPOSIT_BTN_TEXT.repay)
  const [depositBtnTitle, setDepositBtnTitle] = useState(DEPOSIT_BTN_TEXT.add)

  const allowanceDeposit = useSelector(allowanceDepositSelector)
  const allowanceRepay = useSelector(allowanceRepaySelector)
  const borrowVaultInfo = useSelector(borrowVaultInfoSelector)

  const { collateralDetails, borrowingDetails } = !borrowVaultInfo ? {} : borrowVaultInfo

  useEffect(() => {
    if (isModalShown) {
      dispatch(setBorrowVaultInfo(null))
      dispatch(getBorrowAllowance(TYPE.deposit))
      dispatch(getBorrowAllowance(TYPE.repay))
      dispatch(getBorrowVaultInfo(actCardDataInf?.vault?.vaultNum))
    }
  }, [isModalShown])

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

  function repay (formData) {
    if (repayBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      dispatch(setBorrowAprove(TYPE.repay))
    } else {
      dispatch(setBorrowRepay(formData.field, actCardDataInf.vault.vaultNum))
      setRepayMax('field', null)
    }
  }

  function addDeposit (formData) {
    if (depositBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      dispatch(setBorrowAprove(TYPE.deposit))
    } else {
      dispatch(setBorrowDeposit(formData.field, actCardDataInf.vault.vaultNum))
      setDepositMax('field', null)
    }
  }

  function borrow (formData) {
    dispatch(setBorrowAsBorrow(formData.field, actCardDataInf.vault.vaultNum))
    setBorrowMax('field', null)
  }

  function withdraw (formData) {
    dispatch(setBorrowWithdraw(formData.field, actCardDataInf.vault.vaultNum))
    setWithdrawMax('field', null)
  }

  return (
        <>
            <Button
                isIconPositionRight
                icon="arrow-top-right"
                title="Manage"
                type="transparent"
                handleButton={() => {
                  setIsModalShown(true)
                }}
            />

            <ModalWindow
                show={isModalShown}
                onHide={() => {
                  setIsModalShown(false)
                }}
                modalTitle={'Borrowing ' + borrowingAsset}
                content={
                    !borrowVaultInfo
                      ? (
                        <WrapSpinner>
                            <LoadingSpinner />
                        </WrapSpinner>
                        )
                      : (
                        <>
                            <div className="modal__line" />
                            <h3>Collateral</h3>
                            <div className="modal__three-colm">
                                <div>
                                    <h5>Asset</h5>
                                    <p>{collateralDetails?.assets || '-'}</p>
                                    <h5>Locked Collateral</h5>
                                    <p>{fN(collateralDetails?.lockedCol) || 0}</p>
                                </div>
                                <div>
                                    <h5>Asset Price</h5>
                                    <p>{fN(collateralDetails?.assetPrice) || 0}</p>
                                    <h5>Available to Deposit</h5>
                                    <p>{fN(collateralDetails?.availableDeposit) || 0}</p>
                                </div>
                                <div>
                                    <h5>Available to Withdraw</h5>
                                    <p>{fN(collateralDetails?.availableWithdraw) || 0}</p>
                                    <h5>Liquidation Price</h5>
                                    <p>{fN(collateralDetails?.liquidationPrice) || 0}</p>
                                </div>
                            </div>
                            <div className="modal__line" />
                            <h3>Borrowing</h3>
                            <div className="modal__three-colm">
                                <div>
                                    <h5>Asset</h5>
                                    <p>{borrowingDetails?.assets || '-'}</p>
                                    <h5>Collateral Value</h5>
                                    <p>{fN(borrowingDetails?.collateralValue) || 0}</p>
                                    <h5>Liquidation Limit</h5>
                                    <p>{fN(borrowingDetails?.liquidationLimit) || 0}</p>
                                </div>
                                <div>
                                    <h5>Borrowing Limit</h5>
                                    <p>{fN(borrowingDetails?.borrowingLimit) || 0}</p>
                                    <h5>Available to Borrow</h5>
                                    <p>{fN(borrowingDetails?.availableBorrow) || 0}</p>
                                    <h5>Borrowing Fee (p.a.)</h5>
                                    <p>{(fN(borrowingDetails?.borrowingFee) || 0) + ' %'}</p>
                                </div>
                                <div>
                                    <h5>Available to Repay</h5>
                                    <p>{fN(borrowingDetails?.availableRepay) || 0}</p>
                                    <h5>Outstanding Debt</h5>
                                    <p>{fN(borrowingDetails?.outstandingDebt) || 0}</p>
                                </div>
                            </div>

                            <h4>Borrow Asset</h4>
                            <div className="modal__one-line-form">
                                <FormInput
                                    palette="dark"
                                    lbl={borrowingDetails?.assets}
                                    min={0}
                                    name="field"
                                    type="number"
                                    placeholder="0.00"
                                    onMaxClick={handleMaxBorrow}
                                    ref={register1({ required: true })}
                                    valid={errorHandler(errors1, 'field')}
                                />
                                <Button
                                    type="outline"
                                    title="Borrow"
                                    width={BTN_LENGTH}
                                    handleButton={handleSubmit1(borrow)}
                                />
                            </div>
                            <h4>Repay Borrowed Asset</h4>
                            <div className="modal__one-line-form">
                                <FormInput
                                    palette="dark"
                                    lbl={borrowingDetails?.assets}
                                    min={0}
                                    name="field"
                                    type="number"
                                    placeholder="0.00"
                                    onMaxClick={handleMaxRepay}
                                    ref={register2({ required: true })}
                                    valid={errorHandler(errors2, 'field')}
                                    onChange={(value) => {
                                      onChangeValueBtnSlide(TYPE.repay, value)
                                    }}
                                />
                                <Button
                                    type="outline"
                                    title={repayBtnTitle}
                                    width={BTN_LENGTH}
                                    handleButton={handleSubmit2(repay)}
                                />
                            </div>
                            <h4>Deposit Collateral</h4>
                            <div className="modal__one-line-form">
                                <FormInput
                                    palette="dark"
                                    lbl={collateralDetails?.assets}
                                    min={0}
                                    name="field"
                                    type="number"
                                    placeholder="0.00"
                                    onMaxClick={handleMaxDeposit}
                                    ref={register3({ required: true })}
                                    valid={errorHandler(errors3, 'field')}
                                    onChange={(value) => {
                                      onChangeValueBtnSlide(TYPE.deposit, value)
                                    }}
                                />
                                <Button
                                    type="outline"
                                    title={depositBtnTitle}
                                    width={BTN_LENGTH}
                                    handleButton={handleSubmit3(addDeposit)}
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
                                    placeholder="0.00"
                                    onMaxClick={handleMaxWithdraw}
                                    ref={register4({ required: true })}
                                    valid={errorHandler(errors4, 'field')}
                                />
                                <Button
                                    type="outline"
                                    title="Withdraw"
                                    width={BTN_LENGTH}
                                    handleButton={handleSubmit4(withdraw)}
                                />
                            </div>
                        </>
                        )
                }
            />
        </>
  )
}

export default BorrowManageAsset
