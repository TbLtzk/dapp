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

const DEPOSIT_BTN_TEXT = {
  deposit: 'Deposit',
  approve: 'Approve'
}

const BTN_LENGTH = '100px'

function SaveManageAsset (props) {
  const {
    depositAsset,
    interestAsset,
    rate
  } = props

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    errors: errors1
  } = useForm()

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2
  } = useForm()

  const [depositBtnTitle, setDepositBtnTitle] = useState(DEPOSIT_BTN_TEXT.deposit)

  const [isModalShown, setIsModalShown] = useState(false)
  const [avToDeposit, setAvToDeposit] = useState(0)
  const [savingBalance, setSavingBalance] = useState(0)
  const [interestRate, setInterestRate] = useState('-')
  const [estInterest, setEstInterest] = useState(0)
  const [loadingInf, setLoadingInf] = useState(true)
  const [allowance, setAllowance] = useState(0)

  const address = useSelector(userAddressMetamask)
  const handler = new Handler(address, useDispatch())

  async function deposit (formData) {
    if (depositBtnTitle === DEPOSIT_BTN_TEXT.approve) {
      await handler.approve()
      handler.allowance(setAllowance)
      setDepositBtnTitle(DEPOSIT_BTN_TEXT.deposit)
    } else {
      await handler.deposit(formData.amount, setSavingBalance, setAvToDeposit, setInterestRate, setEstInterest, setLoadingInf)
    }
  }

  async function withdraw (formData) {
    await handler.withdraw(formData.amount, setSavingBalance, setAvToDeposit, setInterestRate, setEstInterest, setLoadingInf)
  }

  const updateAllData = async () => {
    handler.setAvailableToDeposit(setAvToDeposit)
    handler.setSavingBalanceIntRateEstInterest(setSavingBalance, setInterestRate, setEstInterest, setLoadingInf)
    handler.allowance(setAllowance)
  }

  useEffect(async () => {
    await updateAllData()
  }, [depositAsset, interestAsset, rate])

  return (
    <>
      <Button
        isIconPositionRight
        icon="arrow-top-right"
        title={'Manage'}
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
        modalTitle={'Saving ' + depositAsset}
        content={
          loadingInf
            ? <LoadingSpinner/>
            : <>
              <div className="modal__line"/>
              <h3>Deposit</h3>
              <div className="modal__three-colm">
                <div>
                  <h5>Asset</h5>
                  <p>{depositAsset}</p>
                </div>
                <div>
                  <h5>Saving Balance</h5>
                  <p>{fN(savingBalance)}</p>
                </div>
                <div>
                  <h5>Available to Deposit</h5>
                  <p>{fN(avToDeposit)}</p>
                </div>
              </div>
              <div className="modal__line"/>
              <h3>Interest</h3>
              <div className="modal__three-colm">
                <div>
                  <h5>Receive Asset</h5>
                  <p>{interestAsset}</p>
                </div>
                <div>
                  <h5>Yearly Expected Reward</h5>
                  <p>{fN(estInterest)}</p>
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
                  placeholder="0.00"
                  ref={register1({ required: true })}
                  valid={errorHandler(errors1, 'field')}
                  onChange={(value) => {
                    if (Number(allowance) < Number(value.target.value)) {
                      setDepositBtnTitle(DEPOSIT_BTN_TEXT.approve)
                    } else {
                      setDepositBtnTitle(DEPOSIT_BTN_TEXT.deposit)
                    }
                  }}
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
                  palette="dark"
                  lbl={interestAsset}
                  min={0}
                  name="amount"
                  type="number"
                  placeholder="0.00"
                  ref={register2({ required: true })}
                  valid={errorHandler(errors2, 'field')}
                />
                <Button
                  type="outline"
                  title="Withdraw"
                  width={BTN_LENGTH}
                  handleButton={handleSubmit2(withdraw)}
                />
              </div>
            </>
        }
      />
    </>
  )
}

export default SaveManageAsset
