import React, { useCallback, useState, Fragment, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { PROPOSALS_TYPES } from 'constants/statuses'
import { formObject } from 'store/voting/proposals/selectors'
import { getParameterKeysByType } from 'store/parameters/action-creators'
import CurrentParameterValue from 'components/Custom/ModalActions/CurrentParameterValue'

import { constUpdate } from './constants'
import FormSelect from 'components/Base/Form/FormSelect'
import FormInput from 'components/Base/Form/FormInput'
import { ParameterType } from '@q-dev/q-js-sdk'
import { getTypeName } from 'func/contractHelpers'
import { parameterVote } from '../CreateStep2/QExpertS2/constants'

import { CONTRACT_TYPES } from 'constants/contracts'

function CreateStep3 (props) {
  const {
    activeTab,
    register,
    errors
  } = props
  const dispatch = useDispatch()
  const formData = useSelector(formObject)

  const [params, setParams] = useState([{
    type: ParameterType.ADDRESS,
    key: '',
    value: ''
  }])

  const showCommonData = (children) => {
    return (
      <div>
        <h2>Chosen data:</h2>
        <h5>Type</h5>
        <p> {formData?.first?.replace(/-/g, ' ')}</p>
        {children}
      </div>
    )
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
        setParams([
          ...params,
          {
            type: ParameterType.ADDRESS,
            key: '',
            value: ''
          }
        ])
        break
    }
  }

  function setNewValue (index, key, newType) {
    const newParams = [...params]
    newParams[index][key] = newType
    setParams(newParams)
  }

  useEffect(() => {
    if (activeTab === PROPOSALS_TYPES.proposals) {
      dispatch(getParameterKeysByType(CONTRACT_TYPES.constitution, ParameterType.ADDRESS))
    }
  }, [])

  useEffect(() => {
    if (activeTab === PROPOSALS_TYPES.proposals || activeTab === PROPOSALS_TYPES.expertProposals) {
      let key = ''
      if (activeTab === PROPOSALS_TYPES.proposals) key = constUpdate.radioBtnName
      if (activeTab === PROPOSALS_TYPES.expertProposals) key = parameterVote.parameterType
      if (formData[key]) {
        setParams(
          formData[key].reduce((types, item, index) => {
            types.push({
              type: item,
              key: formData[constUpdate.inputsObjFirst][index],
              value: formData[constUpdate.inputsObjSecond][index]
            })
            return types
          }, [])
        )
      }
    }
  }, [])

  const contentSwitcher = useCallback(() => {
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        if (formData?.first === CONTRACT_TYPES.emergencyUpdate || formData?.first === CONTRACT_TYPES.generalQUpdate) {
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
                {params.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <h2>{constUpdate.radioBtnTitle} #{index + 1}</h2>
                      <div className="modal__one-line-form" style={{ marginBottom: 0 }}>
                        <FormSelect
                          width="40%"
                          name={`${constUpdate.radioBtnName}[${index}]`}
                          register={register}
                          palette={'dark'}
                          value={params[index].type}
                          onChange={(value) => {
                            setNewValue(index, 'type', value.target.value)
                            dispatch(getParameterKeysByType(CONTRACT_TYPES.constitution, value.target.value))
                          }}
                          ref={register({ required: 'Choose one option!' })}
                          optionValues={constUpdate.radioBtn}
                        />
                        <FormInput
                          name={`${constUpdate.inputsObjFirst}[${index}]`}
                          type="string"
                          palette={'dark'}
                          value={params[index].key}
                          placeholder={constUpdate.inputsFirst}
                          ref={register({ required: 'Field is required!' })}
                          valid={errors[constUpdate.inputsObjFirst]?.[index]?.message}
                          onChange={(value) => {
                            setNewValue(index, 'key', value.target.value)
                          }}
                        />
                      </div>
                      <FormInput
                        name={`${constUpdate.inputsObjSecond}[${index}]`}
                        type="string"
                        palette={'dark'}
                        value={params[index].value}
                        placeholder={constUpdate.inputsSecond}
                        ref={register({ required: 'Field is required!' })}
                        valid={errors[constUpdate.inputsObjSecond]?.[index]?.message}
                        onChange={(value) => {
                          setNewValue(index, 'value', value.target.value)
                        }}
                      />
                      <CurrentParameterValue
                        key={'current-parameter-value' + index}
                        typePanel={CONTRACT_TYPES.constitution}
                        typeParameter={params[index].type}
                        parameterKey={params[index].key}
                      />
                    </Fragment>
                  )
                })}
                <div className="modal__text-wrp">
                  <div className="modal__text-btn"
                       onClick={() => {
                         changeTypesCapacity(1)
                       }}
                  >Add parameter
                  </div>
                  {
                    params.length > 1
                      ? (<div className="modal__text-btn"
                              onClick={() => {
                                changeTypesCapacity(-1)
                              }}
                      >Remove parameter
                      </div>)
                      : null
                  }
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
              ? <>
                <h5>Hash</h5>
                <p>{formData.hash}</p>
                <h5>Remove a Current Root Node</h5>
                <p>{formData['remove-current']}</p>
                {formData['remove-current'] === 'no'
                  ? null
                  : <>
                    <h5>Root Node to Remove</h5>
                    <p>{formData.address}</p>
                  </>
                }
              </>
              : <>
                <h5>Root Node to Remove</h5>
                <p>{formData.address}</p>
                <h5>External Link</h5>
                <p>{formData['external-link']}</p>
              </>
            }
          </>
        )
      case PROPOSALS_TYPES.slashingProposals :
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
            <h5>Panel to Add an Expert</h5>
            <p>{formData['type-proposal']?.replace(/-/g, ' ')}</p>
            <h5>External link</h5>
            <p>{formData['external-link']}</p>
            {formData?.first !== CONTRACT_TYPES.parameterVote
              ? <><h5>Candidate Q Address</h5><p>{formData.address}</p></>
              : <>
                {params.map((item, index) => {
                  return <Fragment key={index + 'param'}>
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
                })}
              </>
            }
          </>
        )
      default:
        return null
    }
  }, [activeTab, register, errors, params])

  return (
    <>
      {contentSwitcher()}
    </>
  )
}

export default CreateStep3
