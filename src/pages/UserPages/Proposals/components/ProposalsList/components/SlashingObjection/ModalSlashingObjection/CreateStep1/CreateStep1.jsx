import React, { useCallback } from 'react'

import { useSelector } from 'react-redux'
import { formObject } from 'store/selectors/auctions/modalHandler'

import InputGroup from 'components/Custom/ModalActions/InputGroup'
import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup'

import { castObjection, proposeDecision } from './constants'

function CreateStep1 (props) {
  const { activeTab, register, errors } = props

  const formData = useSelector(formObject)

  const switchContentOnTypeProposal = useCallback(() => {
    switch (activeTab) {
      case 'cast-objection':
        return (
          <>
            <h2>{castObjection.subtitleOne}</h2>
            <p>{castObjection.subtitleTwo}</p>
            <InputGroup
              formData={formData}
              inputArr={castObjection.inputPlaceholderUp}
              inputsObj={castObjection.inputUpObj}
              register={register}
              errors={errors}
            />
          </>
        )
      case 'propose-decision':
        return (
          <>
            <h2>{proposeDecision.subtitleOne}</h2>
            <h4>{proposeDecision.subtitleTwo}</h4>
            <InputGroup
              formData={formData}
              inputArr={proposeDecision.inputPlaceholder}
              inputsObj={proposeDecision.inputObj}
              register={register}
              errors={errors}
            />
            <h4>{proposeDecision.inputLabelTwo}</h4>
            <InputGroup
              min={0}
              max={101}
              formData={formData}
              inputArr={proposeDecision.inputPlaceholderTwo}
              inputsObj={proposeDecision.inputObjTwo}
              register={register}
              errors={errors}
              type={'number'}
            />
            <h2>{proposeDecision.radioLabel}</h2>
            <RadioBtnGroup
              formData={formData}
              radioArr={proposeDecision.radioBtn}
              register={register}
              errors={errors}
              nameArr={proposeDecision.radioName}
              handleChange={(value) => {
              }}
            />
          </>

        )
      default:
        return null
    }
  }, [activeTab, register, errors])

  return (
    <div>
      {switchContentOnTypeProposal()}
    </div>
  )
}

export default CreateStep1
