import React from 'react'

import { useSelector } from 'react-redux'
import { formObject } from 'store/modal-handler/selectors'

import InputGroup from 'components/Custom/ModalActions/InputGroup'
import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup'

import { castObjection, proposeDecision, proposerRemark } from './constants'

function CreateStep1 ({ activeTab, register, errors, setValue }) {
  const formData = useSelector(formObject)

  switch (activeTab) {
    case 'cast-objection':
      return (
                <div>
                    <h2>{castObjection.subtitleOne}</h2>
                    <p>{castObjection.subtitleTwo}</p>
                    <InputGroup
                        inputArr={castObjection.inputPlaceholderUp}
                        inputsObj={castObjection.inputUpObj}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                </div>
      )
    case 'proposer-remark':
      return (
                <div>
                    <h2>{proposerRemark.subtitleOne}</h2>
                    <p>{proposerRemark.subtitleTwo}</p>
                    <InputGroup
                        inputArr={proposerRemark.inputPlaceholderUp}
                        inputsObj={proposerRemark.inputUpObj}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                </div>
      )
    case 'propose-decision':
      return (
                <div>
                    <h2>{proposeDecision.subtitleOne}</h2>
                    <h4>{proposeDecision.subtitleTwo}</h4>
                    <InputGroup
                        inputArr={proposeDecision.inputPlaceholder}
                        inputsObj={proposeDecision.inputObj}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                    <h4>{proposeDecision.inputLabelTwo}</h4>
                    <InputGroup
                        inputArr={proposeDecision.inputPlaceholderTwo}
                        inputsObj={proposeDecision.inputObjTwo}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                    <h2>{proposeDecision.radioLabel}</h2>
                    <RadioBtnGroup
                        formData={formData}
                        radioArr={proposeDecision.radioBtn}
                        register={register}
                        errors={errors}
                        nameArr={proposeDecision.radioName}
                        handleChange={() => {}}
                    />
                </div>
      )
    default:
      return null
  }
}

export default CreateStep1
