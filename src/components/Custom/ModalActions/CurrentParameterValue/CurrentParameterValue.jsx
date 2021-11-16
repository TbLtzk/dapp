import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getParameterValueByKey } from 'store/parameters/action-creators'
import { arrayParameterKeysByType, parameterValueByKey } from 'store/parameters/selectors'
import { getContractTypeKey } from 'func/contractHelpers'

const keyNotFound = 'Value not found. Key does not exist yet?'

function CurrentParameterValue (props) {
  const {
    typePanel,
    typeParameter,
    parameterKey
  } = props
  const dispatch = useDispatch()

  const [currentParameterValue, setCurrentParameterValue] = useState('')

  const parameterByKeyValue = useSelector(parameterValueByKey)
  const parameterKeysByType = useSelector(arrayParameterKeysByType)
  useEffect(() => {
    if (typePanel && typeParameter && parameterKey) {
      const contractTypeKey = getContractTypeKey(typePanel)
      if (parameterKeysByType[contractTypeKey].length !== 0) {
        const foundValue = parameterKeysByType[contractTypeKey].find((value, item) => {
          return parameterKey === value
        })
        if (foundValue) {
          setCurrentParameterValue('')
          dispatch(getParameterValueByKey(typePanel, typeParameter, parameterKey))
        } else {
          setCurrentParameterValue(keyNotFound)
        }
      } else {
        setCurrentParameterValue(keyNotFound)
      }
    }
  }, [JSON.stringify(parameterKeysByType), typePanel, typeParameter, parameterKey])

  useEffect(() => {
    const contractTypeKey = getContractTypeKey(typePanel)
    const value = parameterByKeyValue.find(i => {
      return i.typeContract === contractTypeKey && i.parameterKey === parameterKey && i.typeParameter === typeParameter
    })
    if (value) setCurrentParameterValue(value.data)
  }, [parameterByKeyValue, typePanel, typeParameter, parameterKey])

  return (
    <h4 style={{ marginBottom: '20px' }}>{`Current value ${currentParameterValue}`} </h4>
  )
}

export default CurrentParameterValue
