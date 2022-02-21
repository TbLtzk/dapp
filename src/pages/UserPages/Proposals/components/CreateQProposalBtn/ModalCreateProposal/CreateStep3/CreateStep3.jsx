import React, { useCallback, useState, Fragment } from 'react'

import { useSelector } from 'react-redux'
import { PROPOSALS_TYPES } from 'constants/statuses'
import { formObject, newParameterSelector } from 'store/voting/proposals/selectors'
import CurrentParameterValue from 'components/Custom/ModalActions/CurrentParameterValue'

import { constUpdate, warning } from './constants'
import FormSelect from 'components/Base/Form/FormSelect'
import FormInput from 'components/Base/Form/FormInput'
import { getTypeName } from 'func/contractHelpers'

import { CONTRACT_TYPES } from 'constants/contracts'
import { fillArray, validatePattern } from 'func/useful'
import { transformToParams } from 'contracts/helpers/parameters-helper'

function CreateStep3 ({ activeTab, register, errors, watch }) {
  const formData = useSelector(formObject)
  const newParameter = useSelector(newParameterSelector)

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

  function showCommonData (children) {
    return (
            <div>
                <h2>Chosen data:</h2>
                <h5>Type</h5>
                <p> {formData?.first?.replace(/-/g, ' ')}</p>
                {children}
            </div>
    )
  }

  const contentSwitcher = useCallback(() => {
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        if (
          formData?.first === CONTRACT_TYPES.emergencyUpdate ||
                    formData?.first === CONTRACT_TYPES.generalQUpdate
        ) {
          return showCommonData(
                        <>
                            <h5>External link</h5>
                            <p>{formData['external-link']}</p>
                        </>
          )
        } else if (formData?.first === CONTRACT_TYPES.constitutionUpdate) {
          if (formData['change-constitution-parameter'] === 'no') {
            return showCommonData(
                            <>
                                <h5>Classification</h5>
                                <p>{formData?.classification?.replace(/-/g, ' ')}</p>
                                <h5>External Link</h5>
                                <p>{formData['external-link']}</p>
                                <h5>Hash</h5>
                                <p>{formData.hash}</p>
                                <h5>Change Constitution Parameter</h5>
                                <p>{formData['change-constitution-parameter']}</p>
                            </>
            )
          } else {
            return (
                            <div>
                                <h2>{constUpdate.inputTitle}</h2>
                                {fillArray(params).map((_, index) => (
                                    <Fragment key={index}>
                                        <h2>
                                            {constUpdate.radioBtnTitle} #{index + 1}
                                        </h2>
                                        <div className="modal__one-line-form" style={{ marginBottom: 0 }}>
                                            <FormSelect
                                                width="40%"
                                                palette="dark"
                                                name={`${constUpdate.radioBtnName}[${index}]`}
                                                register={register}
                                                ref={register({ required: 'Choose one option!' })}
                                                optionValues={constUpdate.radioBtn}
                                            />
                                            <FormInput
                                                type="string"
                                                palette="dark"
                                                name={`${constUpdate.inputsObjFirst}[${index}]`}
                                                placeholder={constUpdate.inputsFirst}
                                                ref={register({ required: 'Field is required!' })}
                                                valid={errors[constUpdate.inputsObjFirst]?.[index]?.message}
                                            />
                                        </div>
                                        <FormInput
                                            type="string"
                                            palette="dark"
                                            name={`${constUpdate.inputsObjSecond}[${index}]`}
                                            placeholder={constUpdate.inputsSecond}
                                            ref={register({
                                              required: 'Field is required!',
                                              validate: (value) =>
                                                validatePattern(
                                                  value,
                                                  watch(`${constUpdate.radioBtnName}[${index}]`)
                                                )
                                            })}
                                            valid={errors[constUpdate.inputsObjSecond]?.[index]?.message}
                                        />
                                        <CurrentParameterValue
                                            typeContract={CONTRACT_TYPES.constitution}
                                            parameterType={watch(`${constUpdate.radioBtnName}[${index}]`)}
                                            parameterKey={watch(`${constUpdate.inputsObjFirst}[${index}]`)}
                                        />
                                    </Fragment>
                                ))}
                                <div className="modal__text-wrp">
                                    <div className="modal__text-btn" onClick={() => handleParams(1)}>
                                        Add parameter
                                    </div>
                                    {params > 1
                                      ? (
                                        <div className="modal__text-btn" onClick={() => handleParams(-1)}>
                                            Remove parameter
                                        </div>
                                        )
                                      : null}
                                </div>
                            </div>
            )
          }
        }
        break
      case PROPOSALS_TYPES.rootNodePanel:
        return showCommonData(
                    <>
                        <h5>External Link</h5>
                        <p>{formData['external-link']}</p>
                        {formData.first === CONTRACT_TYPES.addAnewRootNode
                          ? (
                            <>
                                <h5>Hash</h5>
                                <p>{formData.hash}</p>
                                <h5>Remove a Current Root Node</h5>
                                <p>{formData['remove-current']}</p>
                                {formData['remove-current'] === 'no'
                                  ? null
                                  : (
                                    <>
                                        <h5>Root Node to Remove</h5>
                                        <p>{formData.address}</p>
                                    </>
                                    )}
                            </>
                            )
                          : (
                            <>
                                <h5>Root Node to Remove</h5>
                                <p>{formData.address}</p>
                                <h5>External Link</h5>
                                <p>{formData['external-link']}</p>
                            </>
                            )}
                    </>
        )
      case PROPOSALS_TYPES.slashingProposals:
        return showCommonData(
                    <>
                        <h5>Candidate to Slash</h5>
                        <p>{formData.address}</p>
                        <h5>Stake Amount to Slash</h5>
                        <p>{formData['%-value']} %</p>
                        <h5>External Link</h5>
                        <p>{formData['external-link']}</p>
                    </>
        )
      case PROPOSALS_TYPES.expertProposals:
        return showCommonData(
                    <>
                        {formData.first === 'parameter-vote'
                          ? (
                            <p style={{ color: '#FF8550' }}>{newParameter ? warning : null}</p>
                            )
                          : null}
                        <h5>{formData.first === 'parameter-vote' ? 'Add Parameter' : 'Panel to Add an Expert'}</h5>
                        <p>{formData['type-proposal']?.replace(/-/g, ' ')}</p>
                        <h5>External link</h5>
                        <p>{formData['external-link']}</p>
                        {formData?.first !== CONTRACT_TYPES.parameterVote
                          ? (
                            <>
                                <h5>Candidate Q Address</h5>
                                <p>{formData.address}</p>
                            </>
                            )
                          : (
                            <>
                                {transformToParams(formData).map((item, index) => (
                                    <Fragment key={index + 'param'}>
                                        <h4>Parameter #{index + 1}</h4>
                                        <div className="modal__column-1-2-2">
                                            <div>
                                                <h5>Type</h5>
                                                <p title={getTypeName(item.type)}>{getTypeName(item.type)}</p>
                                            </div>
                                            <div>
                                                <h5>Key</h5>
                                                <p title={item.key}>{item.key}</p>
                                            </div>
                                            <div>
                                                <h5>Value</h5>
                                                <p title={item.value}>{item.value}</p>
                                            </div>
                                        </div>
                                    </Fragment>
                                ))}
                            </>
                            )}
                    </>
        )
      default:
        return null
    }
  }, [activeTab, register, errors, params, watch])

  return <>{contentSwitcher()}</>
}

export default CreateStep3
