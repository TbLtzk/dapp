import React, { useCallback, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { approveModalBtn } from 'store/auctions/selectors'
import { bidForAuction, setApproveModalBtn } from 'store/auctions/action-creators'
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
import { setTransactionCounter } from 'store/transaction-handler/action-creators'
import { fields } from 'constants/fieldsNaming'

function ModalBid ({ modalShow, onHide, activeTab, inf }) {
  const dispatch = useDispatch()

  const formData = useSelector(formObject)
  const stepCounter = useSelector(stepCounterModal)
  const stepLimit = useSelector(createdStepsLimit)
  const approveBtn = useSelector(approveModalBtn)
  const userAddress = useSelector(userAddressMetamask)

  const { register, errors, handleSubmit, setValue } = useForm()

  const switchProposalContentDependsOnType = useCallback(() => {
    switch (stepCounter) {
      case 1:
        return (
                    <CreateStep1
                        activeTab={activeTab}
                        raisingBid={inf.raisingBid}
                        contract={inf?.contract}
                        register={register}
                        errors={errors}
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
  }, [activeTab, stepCounter, register, errors, stepLimit, dispatch, inf])

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

  async function onNext (data) {
    const stableCoin = await getStableCoinInstance()
    const { address } = await switchContract(inf.contract)
    dispatch(setCreateObj({ ...formData, ...data }))
    if (approveBtn) {
      dispatch(setTransactionCounter(1))
      await stableCoin.approve(address, MAX_APPROVE_AMOUNT, { from: userAddress })
      dispatch(setTransactionCounter(-1))
      dispatch(setApproveModalBtn(false))
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

  const continueBtnTitle = stepLimit !== stepCounter ? (approveBtn ? 'Approve' : 'Next') : 'Confirm'
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
