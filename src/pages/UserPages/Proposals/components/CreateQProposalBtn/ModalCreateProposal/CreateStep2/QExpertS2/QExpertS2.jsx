import React, { Fragment, useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { formObject } from 'store/voting/proposals/selectors'
import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup'
import InputGroup from 'components/Custom/ModalActions/InputGroup'
import CurrentParameterValue from 'components/Custom/ModalActions/CurrentParameterValue'

import { addNewExpert, removeExpert, parameterVote } from './constants'
import { CONTRACT_TYPES } from 'constants/contracts'
import FormSelect from 'components/Base/Form/FormSelect'
import FormInput from 'components/Base/Form/FormInput'
import { transformToParams } from 'contracts/helpers/parameters-helper'

const DEFAULT_PARAMS = {
  type: '1',
  key: '',
  value: '',
  currentValue: ''
}

function QExpertS2 ({ activeTab, register, errors }) {
  const formData = useSelector(formObject)
  const [typePanel, setTypePanel] = useState(null)

  const [params, setParams] = useState([{ ...DEFAULT_PARAMS }])

  useEffect(() => {
    if (formData['parameter-type']?.length) {
      setParams(transformToParams(formData))
      setTypePanel(formData['type-proposal'])
    }
  }, [])

  function setNewValue (index, key, newType) {
    const newParams = [...params]
    newParams[index][key] = newType
    setParams(newParams)
  }

  function changeTypesCapacity (action) {
    const newCapacity = 0
    switch (action) {
      case -1:
        if (params.length - 1 < 1) return
        const newParams = [...params]
        newParams.pop()
        setParams(newParams)
        break
      case 1:
        if (newCapacity > 100) return
        setParams([...params, { ...DEFAULT_PARAMS }])
        break
    }
  }

  function changePanel (event) {
    const { value } = event.target
    setTypePanel(value)
  }
  console.log(typePanel)
  const switchContentOnTypeProposal = useCallback(() => {
    switch (formData?.first) {
      case CONTRACT_TYPES.addNewExpert:
        return (
                    <>
                        <h2>{addNewExpert.subtitle}</h2>
                        <h2>{addNewExpert.radioDescr}</h2>
                        <RadioBtnGroup
                            formData={formData}
                            radioArr={addNewExpert.radioBtn}
                            register={register}
                            errors={errors}
                            nameArr={addNewExpert.radioBtnName}
                            handleChange={changePanel}
                        />
                        <h4>{addNewExpert.subtitleInputUp}</h4>
                        <InputGroup
                            formData={formData}
                            inputArr={addNewExpert.inputUp}
                            inputsObj={addNewExpert.inputUpObj}
                            register={register}
                            errors={errors}
                        />
                        <h4>{addNewExpert.subtitleInputDown}</h4>
                        <InputGroup
                            formData={formData}
                            inputArr={addNewExpert.inputDown}
                            inputsObj={addNewExpert.inputDownObj}
                            register={register}
                            errors={errors}
                        />
                    </>
        )
      case CONTRACT_TYPES.removeCurrentExpert:
        return (
                    <>
                        <h2>{removeExpert.subtitle}</h2>
                        <h2>{removeExpert.radioDescr}</h2>
                        <RadioBtnGroup
                            formData={formData}
                            radioArr={removeExpert.radioBtn}
                            register={register}
                            errors={errors}
                            nameArr={removeExpert.radioBtnName}
                            handleChange={changePanel}
                        />
                        <h4>{removeExpert.subtitleInputUp}</h4>
                        <InputGroup
                            formData={formData}
                            inputArr={removeExpert.inputUp}
                            inputsObj={removeExpert.inputUpObj}
                            register={register}
                            errors={errors}
                        />
                        <h4>{removeExpert.subtitleInputDown}</h4>
                        <InputGroup
                            formData={formData}
                            inputArr={removeExpert.inputDown}
                            inputsObj={removeExpert.inputDownObj}
                            register={register}
                            errors={errors}
                        />
                    </>
        )
      case CONTRACT_TYPES.parameterVote:
        return (
                    <>
                        <h2>{parameterVote.subtitle}</h2>
                        <h2>{parameterVote.radioDescr}</h2>
                        <RadioBtnGroup
                            formData={formData}
                            radioArr={parameterVote.radioBtn}
                            register={register}
                            errors={errors}
                            nameArr={parameterVote.radioBtnName}
                            handleChange={changePanel}
                        />
                        <h2>{parameterVote.subtitleInputUp}</h2>
                        {params.map((_, index) => (
                            <Fragment key={index}>
                                <h2>
                                    {parameterVote.radioBtnTitleDown} #{index + 1}
                                </h2>
                                <div className="modal__one-line-form" style={{ marginBottom: 0 }}>
                                    <FormSelect
                                        width="40%"
                                        name={`${parameterVote.parameterType}[${index}]`}
                                        register={register}
                                        palette="dark"
                                        value={params[index].type}
                                        onChange={(value) => setNewValue(index, 'type', value.target.value)}
                                        ref={register({ required: 'Choose one option!' })}
                                        optionValues={parameterVote.radioBtnDown}
                                    />
                                    <FormInput
                                        name={`${parameterVote.parameterKey}[${index}]`}
                                        type="string"
                                        palette="dark"
                                        value={params[index].key}
                                        placeholder={parameterVote.labelsArr}
                                        ref={register({ required: 'Field is required!' })}
                                        valid={errors[parameterVote.parameterKey]?.[index]?.message}
                                        onChange={(value) => setNewValue(index, 'key', value.target.value)}
                                    />
                                </div>
                                <FormInput
                                    name={`${parameterVote.parameterValue}[${index}]`}
                                    type="string"
                                    palette="dark"
                                    value={params[index].value}
                                    placeholder={parameterVote.inputUpSecond}
                                    ref={register({ required: 'Field is required!' })}
                                    valid={errors[parameterVote.parameterValue]?.[index]?.message}
                                    onChange={(value) => setNewValue(index, 'value', value.target.value)}
                                />

                                <CurrentParameterValue
                                    setCurrentValue={(value) => setNewValue(index, 'currentValue', value)}
                                    typeContract={typePanel}
                                    params={params[index]}
                                />
                            </Fragment>
                        ))}
                        <div className="modal__text-wrp">
                            <div className="modal__text-btn" onClick={() => changeTypesCapacity(1)}>
                                Add Parameter
                            </div>
                            {params.length > 1
                              ? (
                                <div className="modal__text-btn" onClick={() => changeTypesCapacity(-1)}>
                                    Remove Parameter
                                </div>
                                )
                              : null}
                        </div>
                        <h4>{parameterVote.subtitleInputDown}</h4>
                        <InputGroup
                            formData={formData}
                            inputArr={parameterVote.inputDown}
                            inputsObj={parameterVote.inputDownObj}
                            register={register}
                            errors={errors}
                        />
                    </>
        )
      default:
        return null
    }
  }, [activeTab, register, errors, typePanel, params])

  return <div>{switchContentOnTypeProposal()}</div>
}

export default QExpertS2
