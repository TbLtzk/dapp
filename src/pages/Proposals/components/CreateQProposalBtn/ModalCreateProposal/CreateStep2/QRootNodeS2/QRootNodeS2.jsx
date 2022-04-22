import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { formObject } from 'store/voting/proposals/selectors'

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup'
import InputGroup from 'components/Custom/ModalActions/InputGroup'

import { addRootNode, removeRootNode } from './constants'
import { CONTRACT_TYPES } from 'constants/contracts'

function QRootNodeS2 ({ register, errors }) {
  const formData = useSelector(formObject)

  const [showAddress, setShowAddress] = useState(formData['remove-current'] === 'yes')

  function handleChange (event) {
    if (event.target.value === 'no') {
      setShowAddress(false)
    } else {
      setShowAddress(true)
    }
  }

  switch (formData?.first) {
    case CONTRACT_TYPES.addAnewRootNode:
      return (
                <>
                    <h2>{addRootNode.subtitle}</h2>
                    <InputGroup
                        labelsArr={addRootNode.inputTitleDescr}
                        inputArr={addRootNode.inputs}
                        inputsObj={addRootNode.inputsObj}
                        register={register}
                        errors={errors}
                    />
                    <h2>{addRootNode.radioBtnTitle}</h2>
                    <RadioBtnGroup
                        formData={formData}
                        values={addRootNode.radioBtnDown}
                        register={register}
                        errors={errors}
                        name={addRootNode.radioBtnDownName}
                        handleChange={handleChange}
                    />
                    {!showAddress
                      ? null
                      : (
                        <>
                            <h4>{addRootNode.inputTitleDown}</h4>
                            <InputGroup
                                inputArr={addRootNode.inputDown}
                                inputsObj={addRootNode.inputDownObj}
                                register={register}
                                errors={errors}
                            />
                        </>
                        )}
                </>
      )
    case CONTRACT_TYPES.removeACurrentRootNode:
      return (
                <>
                    <h2>{removeRootNode.subtitle}</h2>
                    <InputGroup
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
}

export default QRootNodeS2
