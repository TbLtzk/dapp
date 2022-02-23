import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { setCreateObj, setStepCounter } from 'store/modal-handler/action-creators'
import {
  onEscrowCastObjection,
  onEscrowProposeDecision,
  onEscrowProposerRemark
} from 'store/voting/slashing-proposals/action-creators'
import { createdStepsLimit, formObject, stepCounterModal } from 'store/modal-handler/selectors'

import ModalWindow from 'components/Base/ModalWindow'
import CreateStep1 from './CreateStep1'
import CreateStep2 from './CreateStep2'

import { ProgressBar } from 'react-bootstrap'
import { setVoteProposalObj } from 'store/voting/proposals/action-creators'
import { fields } from 'constants/fieldsNaming'

function ModalSlashingObjection ({ modalShow, onHide, activeTab, contract, proposalId }) {
  const dispatch = useDispatch()

  const formData = useSelector(formObject)
  const stepLimit = useSelector(createdStepsLimit)
  const stepCounter = useSelector(stepCounterModal)

  const { register, errors, handleSubmit, setValue, trigger } = useForm()

  useEffect(() => {
    Object.values(fields).forEach((value) => {
      if (formData[value]) {
        setValue(value, formData[value])
      }
    })
  }, [stepCounter])

  function onNext (data) {
    dispatch(setCreateObj({ ...formData, ...data }))
    if (stepCounter < stepLimit) {
      dispatch(setStepCounter(stepCounter + 1))
    } else {
      if (activeTab === 'cast-objection') {
        dispatch(onEscrowCastObjection({ ...formData, ...data }, contract, proposalId))
      } else if (activeTab === 'propose-decision') {
        dispatch(onEscrowProposeDecision({ ...formData, ...data }, contract, proposalId))
      } else if (activeTab === 'proposer-remark') {
        dispatch(onEscrowProposerRemark({ ...formData, ...data }, contract, proposalId))
      }
      dispatch(setVoteProposalObj({ contract, id: proposalId }))
      onHide()
    }
  }

  function backBtnHandler () {
    dispatch(setStepCounter(stepCounter - 1))
  }

  function switchContentDependsOnType () {
    switch (stepCounter) {
      case 1:
        return (
                    <CreateStep1
                        activeTab={activeTab}
                        register={register}
                        trigger={trigger}
                        errors={errors}
                        setValue={setValue}
                    />
        )
      case 2:
        return <CreateStep2 activeTab={activeTab} register={register} errors={errors} />

      default:
        return null
    }
  }

  const continueBtnTitle = stepLimit !== stepCounter ? 'Next' : 'Confirm'
  const modalTitle = activeTab?.replace(/-/g, ' ').charAt(0).toUpperCase() + activeTab?.replace(/-/g, ' ').slice(1)
  const backBtnTitle = stepCounter !== 1 ? 'Back' : null

  const content = (
        <>
            <ProgressBar now={((stepCounter / stepLimit) * 100).toFixed(3)} />
            <div className="modal__steps">
                Step {stepCounter} of {stepLimit}
            </div>
            <form>{switchContentDependsOnType()}</form>
        </>
  )

  return (
        <>
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
        </>
  )
}

export default ModalSlashingObjection
