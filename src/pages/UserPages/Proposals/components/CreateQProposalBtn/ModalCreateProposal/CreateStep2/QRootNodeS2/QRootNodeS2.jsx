import React, { useCallback, useState } from 'react'

import { useSelector } from 'react-redux'
import { formObject } from 'store/voting/proposals/selectors'

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup'
import InputGroup from 'components/Custom/ModalActions/InputGroup'

import { addRootNode, removeRootNode } from './constants'
import { CONTRACT_TYPES } from 'constants/contracts'

function QRootNodeS2 (props) {
  const { activeTab, register, errors } = props
  const formData = useSelector(formObject)

  const [showAddress, setShowAddress] =
    useState(formData['remove-current'] === 'yes')

  const switchContentOnTypeProposal = useCallback(() => {
    switch (formData?.first) {
      case CONTRACT_TYPES.addAnewRootNode:
        return (
          <>
            <h2>{addRootNode.subtitle}</h2>
            <InputGroup
              formData={formData}
              labelsArr={addRootNode.inputTitleDescr}
              inputArr={addRootNode.inputs}
              inputsObj={addRootNode.inputsObj}
              register={register}
              errors={errors}
            />
            <h2>{addRootNode.radioBtnTitle}</h2>
            <RadioBtnGroup
              formData={formData}
              radioArr={addRootNode.radioBtnDown}
              register={register}
              errors={errors}
              nameArr={addRootNode.radioBtnDownName}
              handleChange={(value) => {
                value.target.value === 'no'
                  ? setShowAddress(false)
                  : setShowAddress(true)
              }}
            />
            {!showAddress
              ? null
              : <>
                <h4>{addRootNode.inputTitleDown}</h4>
                <InputGroup
                  formData={formData}
                  inputArr={addRootNode.inputDown}
                  inputsObj={addRootNode.inputDownObj}
                  register={register}
                  errors={errors}
                />
              </>
            }
          </>
        )
      case CONTRACT_TYPES.removeACurrentRootNode:
        return (
          <>
            <h2>{removeRootNode.subtitle}</h2>
            <InputGroup
              formData={formData}
              labelsArr={removeRootNode.inputTitleDescr}
              inputArr={removeRootNode.inputs}
              inputsObj={removeRootNode.inputsObj}
              register={register}
              errors={errors}
            />
          </>
        )
      default:
        return null
    }
  }, [activeTab, register, errors, showAddress])

  return (
    <div>
      {switchContentOnTypeProposal()}
    </div>
  )
}

export default QRootNodeS2
