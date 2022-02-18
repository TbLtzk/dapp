import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { formObject } from 'store/voting/proposals/selectors'
import { setCreatedStepsLimit } from 'store/voting/proposals/action-creators'

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup'
import InputGroup from 'components/Custom/ModalActions/InputGroup'

import { constUpdate, generalUpdate, emergencyUpdate } from './constants'
import { CONTRACT_TYPES } from 'constants/contracts'

function QProposalS2 ({ register, errors, setValue }) {
  const formData = useSelector(formObject)
  const dispatch = useDispatch()

  function handleChange (event) {
    if (event.target.value === 'no') {
      dispatch(setCreatedStepsLimit(3))
    } else {
      dispatch(setCreatedStepsLimit(4))
    }
  }

  switch (formData?.first) {
    case CONTRACT_TYPES.constitutionUpdate:
      return (
                <div>
                    <h2>{constUpdate.subtitle}</h2>
                    <h2>{constUpdate.radioBtnUpTitle}</h2>
                    <RadioBtnGroup
                        formData={formData}
                        radioArr={constUpdate.radioBtnUp}
                        register={register}
                        errors={errors}
                        nameArr="classification"
                        handleChange={() => {}}
                    />
                    <InputGroup
                        labelsArr={constUpdate.inputTitle}
                        formData={formData}
                        inputArr={constUpdate.inputs}
                        inputsObj={constUpdate.inputsObj}
                        register={register}
                        errors={errors}
                    />
                    <h2>{constUpdate.radioBtnDownTitle}</h2>
                    <RadioBtnGroup
                        formData={formData}
                        radioArr={constUpdate.radioBtnDown}
                        register={register}
                        errors={errors}
                        nameArr={constUpdate.radioBtnDownName}
                        handleChange={handleChange}
                    />
                </div>
      )
    case CONTRACT_TYPES.generalQUpdate:
    case CONTRACT_TYPES.emergencyUpdate:
      return (
                <div>
                    <h2>
                        {formData.first === CONTRACT_TYPES.generalQUpdate
                          ? generalUpdate.subtitle
                          : emergencyUpdate.subtitle}
                    </h2>
                    <h4>{generalUpdate.inputTitleDescr}</h4>
                    <InputGroup
                        setValue={setValue}
                        formData={formData}
                        inputArr={generalUpdate.inputs}
                        inputsObj={generalUpdate.inputsObj}
                        register={register}
                        errors={errors}
                    />
                </div>
      )
    default:
      return null
  }
}

export default QProposalS2
