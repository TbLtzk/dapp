import React, { useCallback } from 'react'

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

function ModalBid ({ modalShow, onHide, activeTab, inf }) {
  const { register, errors, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const formData = useSelector(formObject)
  const stepCounter = useSelector(stepCounterModal)
  const stepLimit = useSelector(createdStepsLimit)
  const approveBtn = useSelector(approveModalBtn)
  const userAddress = useSelector(userAddressMetamask)

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
            ...formData,
            ...data,
            ...inf
          })
        )
        onHide()
      }
    }
  }

  return (
        <ModalWindow
            show={modalShow}
            onHide={onHide}
            backBtnTitle={stepCounter !== 1 ? 'Back' : null}
            backBtnHandler={() => {
              dispatch(setStepCounter(stepCounter - 1))
              dispatch(setDisabledCreatedObjBtn(false))
            }}
            continueBtnTitle={stepLimit !== stepCounter ? (approveBtn ? 'Approve' : 'Next') : 'Confirm'}
            continueBtnHandler={handleSubmit(onNext)}
            modalTitle={`Bid for ${activeTab?.replace(/-/g, ' ')} auction`}
            content={
                <>
                    <ProgressBar now={((stepCounter / stepLimit) * 100).toFixed(3)} />
                    <div className="modal__steps">
                        Step {stepCounter} of {stepLimit}
                    </div>
                    <form>{switchProposalContentDependsOnType()}</form>
                </>
            }
        />
  )
}

export default ModalBid
