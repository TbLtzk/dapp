import React, { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { approveModalBtn } from 'store/auctions/selectors'
import { bidForAuction } from 'store/auctions/action-creators'
import { setCreateObj, setDisabledCreatedObjBtn, setStepCounter } from 'store/modal-handler/action-creators'
import { stepCounterModal, formObject, createdStepsLimit } from 'store/modal-handler/selectors'
import { userAddressMetamask } from 'store/user-inf/selectors'

import { useForm } from 'react-hook-form'

import ModalWindow from 'components/Base/ModalWindow'
import CreateStep1 from './CreateStep1'
import CreateStep2 from './CreateStep2'

import { MAX_APPROVE_AMOUNT } from 'constants/numbers'
import { ProgressBar } from 'react-bootstrap'
import { getStableCoinInstance } from 'contracts/contract-instance'
import { switchContract } from 'contracts/helpers/auctions-helpers/auction-service-helper'
import { setTransactionLoading } from 'store/transaction-handler/action-creators'
import { fields } from 'constants/fieldsNaming'

function ModalBid ({ modalShow, onHide, activeTab, inf }) {
  const dispatch = useDispatch()

  const formData = useSelector(formObject)
  const stepCounter = useSelector(stepCounterModal)
  const stepLimit = useSelector(createdStepsLimit)
  const approveBtn = useSelector(approveModalBtn)
  const userAddress = useSelector(userAddressMetamask)
  const [allowance, setAllowance] = useState(0)
  const [approveButton, setApproveButton] = useState(false)

  const { register, errors, handleSubmit, setValue, watch } = useForm()

  useEffect(() => {
    async function getAllowanceValue () {
      const stableCoin = await getStableCoinInstance()
      const { address } = await switchContract(inf?.contract)
      const allowance = await stableCoin.allowance(userAddress, address)
      setAllowance(allowance)
    }

    getAllowanceValue()
  }, [approveButton])

  const switchProposalContentDependsOnType = useCallback(() => {
    switch (stepCounter) {
      case 1:
        return (
                    <CreateStep1
                        activeTab={activeTab}
                        raisingBid={inf.raisingBid}
                        contract={inf?.contract}
                        approveBtn={approveBtn}
                        watch={watch}
                        allowance={allowance}
                        register={register}
                        errors={errors}
                        setApproveButton={setApproveButton}
                    />
        )
      case 2:
        return (
                    <CreateStep2
                        formData={formData}
                        contract={inf?.contract}
                        activeTab={activeTab}
                        register={register}
                        errors={errors}
                    />
        )
      default:
        return null
    }
  }, [activeTab, stepCounter, register, errors, stepLimit, dispatch, inf, watch, allowance, setApproveButton])

  useEffect(() => {
    Object.values(fields).forEach((value) => {
      if (formData[value]) {
        setValue(value, formData[value])
      }
    })
  }, [stepCounter])

  function backBtnHandler () {
    dispatch(setStepCounter(stepCounter - 1))
    dispatch(setDisabledCreatedObjBtn(false))
  }

  async function confirmAllowance (contract, address) {
    try {
      dispatch(setTransactionLoading(1))
      await contract.approve(address, MAX_APPROVE_AMOUNT, { from: userAddress })
      setApproveButton(false)
    } catch {
      setApproveButton(true)
    } finally {
      dispatch(setTransactionLoading(-1))
    }
  }

  async function onNext (data) {
    const stableCoin = await getStableCoinInstance()
    const { address } = await switchContract(inf.contract)
    dispatch(setCreateObj({ ...formData, ...data }))
    if (approveButton) {
      await confirmAllowance(stableCoin, address)
    } else {
      if (stepCounter < stepLimit) {
        dispatch(setStepCounter(stepCounter + 1))
      } else {
        dispatch(
          bidForAuction({
            contract: inf.contract,
            user: inf.user,
            id: inf.id,
            ...formData,
            ...data
          })
        )
        onHide()
      }
    }
  }

  const continueBtnTitle = stepLimit !== stepCounter ? (approveButton ? 'Approve' : 'Next') : 'Confirm'
  const modalTitle = `Bid for ${activeTab?.replace(/-/g, ' ')} auction`
  const backBtnTitle = stepCounter !== 1 ? 'Back' : null
  const content = (
        <>
            <ProgressBar now={((stepCounter / stepLimit) * 100).toFixed(3)} />
            <div className="modal__steps">
                Step {stepCounter} of {stepLimit}
            </div>
            <form>{switchProposalContentDependsOnType()}</form>
        </>
  )

  return (
        <ModalWindow
            show={modalShow}
            onHide={onHide}
            backBtnTitle={backBtnTitle}
            backBtnHandler={backBtnHandler}
            continueBtnTitle={continueBtnTitle}
            continueBtnHandler={handleSubmit(onNext)}
            modalTitle={modalTitle}
            content={content}
        />
  )
}

export default ModalBid
