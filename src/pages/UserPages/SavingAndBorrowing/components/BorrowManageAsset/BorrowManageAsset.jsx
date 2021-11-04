import React, { useEffect, useState } from 'react'
import Button from 'components/Base/Buttons/Button'
import ModalWindow from 'components/Base/ModalWindow'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import FormInput from 'components/Base/Form/FormInput'

import Handler from './handler'

import { fN, errorHandler } from 'func/useful'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { userAddressMetamask } from 'store/selectors/user-inf'

const BTN_LENGTH = '100px'

const DEPOSIT_BTN_TEXT = {
  approve: 'Approve',
  repay: 'Repay',
  add: 'Add'
}

function BorrowManageAsset (props) {
  const { borrowingAsset, vault } = props

  const { register: register1, handleSubmit: handleSubmit1, errors: errors1, setValue: setBorrowMax } = useForm()
  const { register: register2, handleSubmit: handleSubmit2, errors: errors2, setValue: setRepayMax } = useForm()
  const { register: register3, handleSubmit: handleSubmit3, errors: errors3, setValue: setDepositMax } = useForm()
  const { register: register4, handleSubmit: handleSubmit4, errors: errors4, setValue: setWithdrawMax } = useForm()

  const address = useSelector(userAddressMetamask)

  const [isModalShown, setIsModalShown] = useState(false)
  const [loadingInf, setLoadingInf] = useState(false)
  const [actCardDataInf] = useState({
    type: 'borrow',
    collateral: vault.colKey,
    borrow: borrowingAsset,
    vault
  })

  const handler = new Handler(address, actCardDataInf?.vault?.colKey, useDispatch(), actCardDataInf?.vault?.vaultNum)

  const [collateralInf, setCollateralInf] = useState({})
  const [borrowingInf, setBorrowingInf] = useState({})
  const [allowanceDeposit, setAllowanceDeposit] = useState(0)
  const [allowanceRepay, setAllowanceRepay] = useState(0)

  const [repayBtnTitle, setRepayBtnTitle] = useState(DEPOSIT_BTN_TEXT.repay)
  const [depositBtnTitle, setDepositBtnTitle] = useState(DEPOSIT_BTN_TEXT.add)

  useEffect(async () => {
    if (actCardDataInf?.collateral === 'QBTC') {
      await handler.setVaultStats(setCollateralInf, setBorrowingInf, setLoadingInf)
      handler.allowanceSwitcher(setAllowanceDeposit, 'deposit')
      handler.allowanceSwitcher(setAllowanceRepay, 'repay')
    }
  }, [])

  function onChangeValueBtnSlide (type, value) {
    const inputValue = value.target.value

    if (type === 'deposit') {
      if (Number(allowanceDeposit) < Number(inputValue)) {
        setDepositBtnTitle(DEPOSIT_BTN_TEXT.approve)
      } else {
        setDepositBtnTitle(DEPOSIT_BTN_TEXT.add)
      }
    } else if (type === 'repay') {
      if (Number(allowanceRepay) < Number(inputValue)) {
        setRepayBtnTitle(DEPOSIT_BTN_TEXT.approve)
      } else {
        setRepayBtnTitle(DEPOSIT_BTN_TEXT.repay)
      }
    }
  }

  async function repay (formData) {
    if (repayBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      await handler.approveSwitcher('repay')
      handler.allowanceSwitcher(setAllowanceRepay, 'repay')
      setRepayBtnTitle(DEPOSIT_BTN_TEXT.repay)
    } else {
      await handler.repay(
        formData.field,
        actCardDataInf.vault.vaultNum,
        setCollateralInf,
        setBorrowingInf,
        setLoadingInf
      )
    }
  }

  async function borrow (formData) {
    await handler.borrow(
      formData.field,
      actCardDataInf.vault.vaultNum,
      setCollateralInf,
      setBorrowingInf,
      setLoadingInf
    )
  }

  async function addDeposit (formData) {
    if (depositBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      await handler.approveSwitcher('deposit')
      handler.allowanceSwitcher(setAllowanceDeposit, 'deposit')
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.add)
    } else {
      await handler.addDeposit(
        formData.field,
        actCardDataInf.vault.vaultNum,
        setCollateralInf,
        setBorrowingInf,
        setLoadingInf
      )
    }
  }

  async function withdraw (formData) {
    await handler.withdraw(
      formData.field,
      actCardDataInf.vault.vaultNum,
      setCollateralInf,
      setBorrowingInf,
      setLoadingInf
    )
  }

  function handleMaxRepay () {
    if (Number(borrowingInf?.availableRepay) > 0) {
      setRepayMax('field', borrowingInf?.availableRepay)
    }
  }

  function handleMaxDeposit () {
    if (Number(collateralInf?.availableDeposit) > 0) {
      setDepositMax('field', collateralInf?.availableDeposit)
    }
  }

  function handleMaxBorrow () {
    if (Number(fN(borrowingInf?.availableBorrow)) > 0) {
      setBorrowMax('field', Number(borrowingInf?.availableBorrow).toFixed(6))
    }
  }

  function handleMaxWithdraw () {
    if (Number(collateralInf?.availableWithdraw) > 0) {
      setWithdrawMax('field', collateralInf?.availableWithdraw)
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
                    loadingInf
                      ? (
                        <LoadingSpinner />
                        )
                      : (
                        <>
                            <div className="modal__line" />
                            <h3>Collateral</h3>
                            <div className="modal__three-colm">
                                <div>
                                    <h5>Asset</h5>
                                    <p>{collateralInf?.assets || '-'}</p>
                                    <h5>Locked Collateral</h5>
                                    <p>{fN(collateralInf?.lockedCol) || 0}</p>
                                </div>
                                <div>
                                    <h5>Asset Price</h5>
                                    <p>{fN(collateralInf?.assetPrice) || 0}</p>
                                    <h5>Available to Deposit</h5>
                                    <p>{fN(collateralInf?.availableDeposit) || 0}</p>
                                </div>
                                <div>
                                    <h5>Available to Withdraw</h5>
                                    <p>{fN(collateralInf?.availableWithdraw) || 0}</p>
                                    <h5>Liquidation Price</h5>
                                    <p>{fN(collateralInf?.liquidationPrice) || 0}</p>
                                </div>
                            </div>
                            <div className="modal__line" />
                            <h3>Borrowing</h3>
                            <div className="modal__three-colm">
                                <div>
                                    <h5>Asset</h5>
                                    <p>{borrowingInf?.assets || '-'}</p>
                                    <h5>Collateral Value</h5>
                                    <p>{fN(borrowingInf?.collateralValue) || 0}</p>
                                    <h5>Liquidation Limit</h5>
                                    <p>{fN(borrowingInf?.liquidationLimit) || 0}</p>
                                </div>
                                <div>
                                    <h5>Borrowing Limit</h5>
                                    <p>{fN(borrowingInf?.borrowingLimit) || 0}</p>
                                    <h5>Available to Borrow</h5>
                                    <p>{fN(borrowingInf?.availableBorrow) || 0}</p>
                                    <h5>Borrowing Fee (p.a.)</h5>
                                    <p>{(fN(borrowingInf?.borrowingFee) || 0) + ' %'}</p>
                                </div>
                                <div>
                                    <h5>Available to Repay</h5>
                                    <p>{fN(borrowingInf?.availableRepay) || 0}</p>
                                    <h5>Outstanding Debt</h5>
                                    <p>{fN(borrowingInf?.outstandingDebt) || 0}</p>
                                </div>
                            </div>

                            <h4>Borrow Asset</h4>
                            <div className="modal__one-line-form">
                                <FormInput
                                    palette="dark"
                                    lbl={borrowingInf?.assets}
                                    min={0}
                                    modal
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
                                    lbl={borrowingInf?.assets}
                                    min={0}
                                    modal
                                    name="field"
                                    type="number"
                                    placeholder="0.00"
                                    onMaxClick={handleMaxRepay}
                                    ref={register2({ required: true })}
                                    valid={errorHandler(errors2, 'field')}
                                    onChange={(value) => {
                                      onChangeValueBtnSlide('repay', value)
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
                                    lbl={collateralInf?.assets}
                                    min={0}
                                    modal
                                    name="field"
                                    type="number"
                                    placeholder="0.00"
                                    onMaxClick={handleMaxDeposit}
                                    ref={register3({ required: true })}
                                    valid={errorHandler(errors3, 'field')}
                                    onChange={(value) => {
                                      onChangeValueBtnSlide('deposit', value)
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
                                    lbl={collateralInf?.assets}
                                    min={0}
                                    modal
                                    name="field"
                                    type="number"
                                    onMaxClick={handleMaxWithdraw}
                                    placeholder="0.00"
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
