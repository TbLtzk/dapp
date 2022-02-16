import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  setVoteProposalObj,
  setDisabledCreatedProposalBtn,
  setStepVoteCounter,
  voteForProposal
} from 'store/voting/proposals/action-creators'
import { stepVoteCounterModal, formVoteObject } from 'store/voting/proposals/selectors'

import { useForm } from 'react-hook-form'

import ModalWindow from 'components/Base/ModalWindow'
import CreateStep2 from './CreateStep1'
import CreateStep3 from './CreateStep2'

import { ProgressBar } from 'react-bootstrap'

function ModalVote ({ modalShow, onHide, activeTab, proposalId, proposalContract, vetoEndTime, proposalStatus }) {
  const { register, errors, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const formData = useSelector(formVoteObject)
  const stepCounter = useSelector(stepVoteCounterModal)
  const stepLimit = 2
  const checkTitleName = proposalStatus === 'Pending' ? 'Vote' : 'Veto'

  const switchProposalContentDependsOnType = useCallback(() => {
    switch (stepCounter) {
      case 1:
        return (
                    <CreateStep2
                        proposalContract={proposalContract}
                        vetoEndTime={vetoEndTime}
                        formData={formData}
                        activeTab={activeTab}
                        register={register}
                        errors={errors}
                    />
        )
      case 2:
        return (
                    <CreateStep3
                        formData={formData}
                        activeTab={activeTab}
                        register={register}
                        errors={errors}
                        proposalContract={proposalContract}
                    />
        )
      default:
        return null
    }
  }, [activeTab, stepCounter, register, errors, stepLimit, dispatch])

  const backBtnHandler = () => {
    dispatch(setStepVoteCounter(stepCounter - 1))
    dispatch(setDisabledCreatedProposalBtn(false))
  }
  const onNext = (data) => {
    dispatch(setVoteProposalObj({ ...formData, ...data }))
    if (stepCounter < stepLimit) {
      dispatch(setStepVoteCounter(stepCounter + 1))
    } else {
      if (formData['constitution-check'] !== 'no') {
        dispatch(
          voteForProposal({
            ...formData,
            ...data,
            idProposal: proposalId,
            contract: proposalContract
          })
        )
      }
      onHide()
    }
  }

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
            backBtnTitle={stepCounter !== 1 ? 'Back' : null}
            backBtnHandler={backBtnHandler}
            continueBtnTitle={stepLimit !== stepCounter ? 'Next' : 'Confirm'}
            modalTitle={`${checkTitleName} for proposal`}
            continueBtnHandler={handleSubmit(onNext)}
            content={content}
        />
  )
}

export default ModalVote
