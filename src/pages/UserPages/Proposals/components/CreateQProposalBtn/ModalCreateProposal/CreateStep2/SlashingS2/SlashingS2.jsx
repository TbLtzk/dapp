import React from 'react'

import { useSelector } from 'react-redux'
import { formObject } from 'store/voting/proposals/selectors'

import InputGroup from 'components/Custom/ModalActions/InputGroup'

import { rootSlashing, validatorSlashing } from './constants'
import { CONTRACT_TYPES } from 'constants/contracts'

function SlashingS2 ({ register, errors }) {
  const formData = useSelector(formObject)

  switch (formData?.first) {
    case CONTRACT_TYPES.rootNodeSlashing:
      return (
                <>
                    <h2>{rootSlashing.subtitle}</h2>
                    <InputGroup
                        formData={formData}
                        labelsArr={rootSlashing.inputTitleDescr}
                        inputArr={rootSlashing.inputs}
                        inputsObj={rootSlashing.inputsObj}
                        register={register}
                        errors={errors}
                    />
                    <h4>{rootSlashing.inputTitleDown}</h4>
                    <InputGroup
                        formData={formData}
                        inputArr={rootSlashing.inputDown}
                        inputsObj={rootSlashing.inputDownObj}
                        register={register}
                        errors={errors}
                    />
                </>
      )
    case CONTRACT_TYPES.validatorNodeSlashing:
      return (
                <>
                    <h2>{validatorSlashing.subtitle}</h2>
                    <InputGroup
                        formData={formData}
                        labelsArr={validatorSlashing.inputTitleDescr}
                        inputArr={validatorSlashing.inputs}
                        inputsObj={validatorSlashing.inputsObj}
                        register={register}
                        errors={errors}
                    />
                    <h4>{validatorSlashing.inputTitleDown}</h4>
                    <InputGroup
                        formData={formData}
                        inputArr={validatorSlashing.inputDown}
                        inputsObj={validatorSlashing.inputDownObj}
                        register={register}
                        errors={errors}
                    />
                </>
      )
    default:
      return null
  }
}

export default SlashingS2
