import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  setVoteProposalObj,
  setDisabledCreatedProposalBtn,
  setStepVoteCounter,
  voteForProposal
} from 'store/actions/action-creaters/voting/proposals'
import {
  stepVoteCounterModal,
  formVoteObject
} from 'store/selectors/voting/proposals'

import { useForm } from 'react-hook-form'

import ModalWindow from 'components/Base/ModalWindow'
import CreateStep1 from './CreateStep1'
import CreateStep2 from './CreateStep2'
import CreateStep3 from './CreateStep3'

import { ProgressBar } from 'react-bootstrap'

function ModalVote (props) {
  const {
    modalShow,
    onHide,
    activeTab,
    proposalId,
    proposalContract,
    vetoEndTime
  } = props
  const {
    register,
    errors,
    handleSubmit
  } = useForm()
  const dispatch = useDispatch()

  const formData = useSelector(formVoteObject)
  const stepCounter = useSelector(stepVoteCounterModal)
  const stepLimit = 3

  const switchProposalContentDependsOnType = useCallback(() => {
    switch (stepCounter) {
      case 1:
        return (
          <CreateStep1
            formData={formData}
            activeTab={activeTab}
            register={register}
            errors={errors}
            proposalContract={proposalContract}
          />
        )
      case 2:
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
      case 3:
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

  const onNext = (data) => {
    dispatch(setVoteProposalObj({ ...formData, ...data }))
    if (stepCounter < stepLimit) {
      dispatch(setStepVoteCounter(stepCounter + 1))
    } else {
      if (formData['constitution-check'] !== 'no') {
        dispatch(voteForProposal({
          ...formData,
          ...data,
          idProposal: proposalId,
          contract: proposalContract
        }))
      }
      onHide()
    }
  }

  return (
    <ModalWindow
      show={modalShow}
      onHide={onHide}
      backBtnTitle={
        stepCounter !== 1 ? 'Back' : null
      }
      backBtnHandler={() => {
        dispatch(setStepVoteCounter(stepCounter - 1))
        dispatch(setDisabledCreatedProposalBtn(false))
      }}
      continueBtnTitle={
        stepLimit !== stepCounter ? 'Next' : 'Confirm'
      }
      modalTitle={'Vote for Proposal'}
      continueBtnHandler={handleSubmit(onNext)}
      content={
        <>
          <ProgressBar now={((stepCounter / stepLimit) * 100).toFixed(3)}/>
          <div className="modal__steps">Step {stepCounter} of {stepLimit}</div>
          <form>
            {switchProposalContentDependsOnType()}
          </form>
        </>
      }
    />
  )
}

export default ModalVote
