import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { formObject } from 'store/voting/proposals/selectors'
import { setCreatedStepsLimit } from 'store/voting/proposals/action-creators'

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup'
import InputGroup from 'components/Custom/ModalActions/InputGroup'

import { constUpdate, generalUpdate, emergencyUpdate } from './constants'
import { CONTRACT_TYPES } from 'constants/contracts'

function QProposalS2 ({ register, errors }) {
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
                    <h2>{constUpdate.classificationTitle}</h2>
                    <RadioBtnGroup
                        formData={formData}
                        values={constUpdate.classificationValues}
                        labels={constUpdate.classificationLabels}
                        register={register}
                        errors={errors}
                        name="classification"
                        handleChange={() => {}}
                    />
                    <InputGroup
                        labelsArr={constUpdate.inputTitle}
                        inputArr={constUpdate.inputs}
                        inputsObj={constUpdate.inputsObj}
                        register={register}
                        errors={errors}
                    />
                    <h2>{constUpdate.radioBtnDownTitle}</h2>
                    <RadioBtnGroup
                        formData={formData}
                        values={constUpdate.radioBtnDown}
                        register={register}
                        errors={errors}
                        name={constUpdate.radioBtnDownName}
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
