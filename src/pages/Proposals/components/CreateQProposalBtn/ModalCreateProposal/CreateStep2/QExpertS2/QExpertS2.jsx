import React, { Fragment, useCallback, useState } from 'react'

import { useSelector } from 'react-redux'
import { formObject } from 'store/voting/proposals/selectors'
import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup'
import InputGroup from 'components/Custom/ModalActions/InputGroup'
import CurrentParameterValue from 'components/Custom/ModalActions/CurrentParameterValue'

import { addNewExpert, removeExpert, parameterVote } from './constants'
import { CONTRACT_TYPES } from 'constants/contracts'
import FormSelect from 'components/Base/Form/FormSelect'
import FormInput from 'components/Base/Form/FormInput'
import { fillArray, parameterKeyValidation, validatePattern } from 'func/useful'

function QExpertS2 ({ activeTab, register, errors, watch }) {
  const formData = useSelector(formObject)
  const [typePanel, setTypePanel] = useState(formData['type-proposal'] || null)
  const [params, setParams] = useState(formData['parameter-type']?.length || 1)

  function handleParams (value) {
    switch (value) {
      case -1: {
        setParams(params - 1)
        break
      }
      default: {
        if (params < 100) {
          setParams(params + 1)
        }
      }
    }
  }

  function changePanel (event) {
    setTypePanel(event.target.value)
  }

  const switchContentOnTypeProposal = useCallback(() => {
    switch (formData?.first) {
      case CONTRACT_TYPES.addNewExpert:
        return (
                    <>
                        <h2>{addNewExpert.subtitle}</h2>
                        <h2>{addNewExpert.radioDescr}</h2>
                        <RadioBtnGroup
                            formData={formData}
                            values={addNewExpert.radioBtn}
                            register={register}
                            errors={errors}
                            name={addNewExpert.radioBtnName}
                            handleChange={changePanel}
                        />
                        <h4>{addNewExpert.subtitleInputUp}</h4>
                        <InputGroup
                            inputArr={addNewExpert.inputUp}
                            inputsObj={addNewExpert.inputUpObj}
                            register={register}
                            errors={errors}
                        />
                        <h4>{addNewExpert.subtitleInputDown}</h4>
                        <InputGroup
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
                            values={removeExpert.radioBtn}
                            register={register}
                            errors={errors}
                            name={removeExpert.radioBtnName}
                            handleChange={changePanel}
                        />
                        <h4>{removeExpert.subtitleInputUp}</h4>
                        <InputGroup
                            inputArr={removeExpert.inputUp}
                            inputsObj={removeExpert.inputUpObj}
                            register={register}
                            errors={errors}
                        />
                        <h4>{removeExpert.subtitleInputDown}</h4>
                        <InputGroup
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
                            values={parameterVote.radioBtn}
                            register={register}
                            errors={errors}
                            name={parameterVote.radioBtnName}
                            handleChange={changePanel}
                        />
                        <h2>{parameterVote.subtitleInputUp}</h2>
                        {fillArray(params).map((_, index) => (
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
                                        ref={register({ required: 'Choose one option!' })}
                                        optionValues={parameterVote.radioBtnDown}
                                    />
                                    <FormInput
                                        name={`${parameterVote.parameterKey}[${index}]`}
                                        type="string"
                                        palette="dark"
                                        placeholder={parameterVote.labelsArr}
                                        ref={register({
                                          required: 'Field is required!',
                                          validate: (key) => parameterKeyValidation(key)
                                        })}
                                        valid={errors[parameterVote.parameterKey]?.[index]?.message}
                                    />
                                </div>
                                <FormInput
                                    name={`${parameterVote.parameterValue}[${index}]`}
                                    type="string"
                                    palette="dark"
                                    placeholder={parameterVote.inputUpSecond}
                                    ref={register({
                                      required: 'Field is required!',
                                      validate: (value) =>
                                        validatePattern(value, watch(`${parameterVote.parameterType}[${index}]`))
                                    })}
                                    valid={errors[parameterVote.parameterValue]?.[index]?.message}
                                />

                                <CurrentParameterValue
                                    typeContract={typePanel}
                                    parameterType={watch(`${parameterVote.parameterType}[${index}]`)}
                                    parameterKey={watch(`${parameterVote.parameterKey}[${index}]`)}
                                />
                            </Fragment>
                        ))}
                        <div className="modal__text-wrp">
                            <div className="modal__text-btn" onClick={() => handleParams(1)}>
                                Add Parameter
                            </div>
                            {params > 1
                              ? (
                                <div className="modal__text-btn" onClick={() => handleParams(-1)}>
                                    Remove Parameter
                                </div>
                                )
                              : null}
                        </div>
                        <h4>{parameterVote.subtitleInputDown}</h4>
                        <InputGroup
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
