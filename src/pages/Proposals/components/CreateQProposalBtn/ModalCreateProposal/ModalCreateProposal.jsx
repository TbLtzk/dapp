import React, { useEffect } from 'react'

import { ProgressBar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PROPOSALS_TYPES } from 'constants/statuses'
import {
  setCreateProposalObj,
  setStepCounter,
  setDisabledCreatedProposalBtn,
  createProposal
} from 'store/voting/proposals/action-creators'
import {
  formObject,
  createdStepsLimit,
  stepCounterModal,
  disabledContinueProposalBtn
} from 'store/voting/proposals/selectors'

import { useForm } from 'react-hook-form'

import ModalWindow from 'components/Base/ModalWindow'
import CreateStep1 from './CreateStep1'
import CreateStep2 from './CreateStep2'
import CreateStep3 from './CreateStep3'
import CreateStep4 from './CreateStep4'
import { parameterVote } from './CreateStep2/QExpertS2/constants'
import { arrExpert, arrQProposal, arrQProposalAdvanced, arrQRootNode, arrSlashing } from './constants'

import { mode } from 'store/dashboard-mode/selectors'
import { MODE } from 'components/Base/DashboardMode/DashboardMode'
import { fields } from 'constants/fieldsNaming'

function ModalCreateProposal ({ modalShow, onHide, activeTab, activeTabTitle }) {
  const dispatch = useDispatch()

  const formData = useSelector(formObject)
  const stepLimit = useSelector(createdStepsLimit)
  const stepCounter = useSelector(stepCounterModal)
  const disabledContinueBtn = useSelector(disabledContinueProposalBtn)
  const appMode = useSelector(mode)

  const { register, errors, handleSubmit, setValue, watch } = useForm({
    mode: 'onChange'
  })

  const radioArrFirstStepObject = {
    [PROPOSALS_TYPES.proposals]: appMode === MODE.advanced ? arrQProposalAdvanced : arrQProposal,
    [PROPOSALS_TYPES.rootNodePanel]: arrQRootNode,
    [PROPOSALS_TYPES.expertProposals]: arrExpert,
    [PROPOSALS_TYPES.slashingProposals]: arrSlashing
  }

  useEffect(() => {
    Object.values(fields).forEach((value) => {
      if (formData[value]) {
        setValue(value, formData[value])
      }
    })
    if (formData?.first === 'parameter-vote' || formData['change-constitution-parameter'] === 'yes') {
      const paramLength = formData[parameterVote.parameterType]?.length
      if (paramLength) {
        formData[parameterVote.parameterType].forEach((type, index) => {
          setValue(`${parameterVote.parameterKey}[${index}]`, formData[parameterVote.parameterKey][index])
          setValue(
                        `${parameterVote.parameterValue}[${index}]`,
                        formData[parameterVote.parameterValue][index]
          )
          setValue(`${parameterVote.parameterType}[${index}]`, type)
        })
      }
    }
  }, [stepCounter, formData])

  const radioArrFirstStep = radioArrFirstStepObject[activeTab]

  function backBtnHandler () {
    dispatch(setStepCounter(stepCounter - 1))
    dispatch(setDisabledCreatedProposalBtn(false))
  }

  function onNext (data) {
    dispatch(setCreateProposalObj({ ...formData, ...data }))
    if (stepCounter < stepLimit) {
      dispatch(setStepCounter(stepCounter + 1))
    } else {
      dispatch(createProposal({ ...formData, ...data }))
      onHide()
    }
  }

  const switchProposalContentDependsOnType = () => {
    switch (stepCounter) {
      case 1:
        return (
                    <CreateStep1
                        activeTab={activeTab}
                        activeTabTitle={activeTabTitle}
                        register={register}
                        errors={errors}
                        radioArr={radioArrFirstStep}
                    />
        )
      case 2:
        return (
                    <CreateStep2
                        watch={watch}
                        activeTab={activeTab}
                        activeTabTitle={activeTabTitle}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                    />
        )
      case 3:
        return (
                    <CreateStep3
                        watch={watch}
                        activeTab={activeTab}
                        activeTabTitle={activeTabTitle}
                        register={register}
                        errors={errors}
                    />
        )
      case 4:
        return <CreateStep4 />
      default:
        return null
    }
  }

  const backBtnTitle = stepCounter !== 1 ? 'Back' : null
  const continueBtnTitle = stepLimit !== stepCounter ? 'Next' : 'Confirm'
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
            modalTitle={activeTabTitle}
            backBtnTitle={backBtnTitle}
            backBtnHandler={backBtnHandler}
            content={content}
            continueBtnTitle={continueBtnTitle}
            disabled={disabledContinueBtn}
            continueBtnHandler={handleSubmit(onNext)}
        />
  )
}

export default ModalCreateProposal
