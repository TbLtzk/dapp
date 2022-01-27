import React, { useEffect, useState } from 'react'
import { getParameterKeysByType, getParameterValueByKey } from 'contracts/helpers/parameters-helper'
import { useDispatch } from 'react-redux'
import { setNewParameter } from 'store/voting/proposals/action-creators'

const keyNotFound = 'No value found. Please check or proceed to create a new parameter.'

function CurrentParameterValue ({ typeContract, params, setCurrentValue }) {
  const dispatch = useDispatch()
  const { key, type, currentValue } = params
  const [keys, setKeys] = useState(null)

  useEffect(() => {
    if (typeContract && type) {
      getParameterKeysByType(typeContract, type).then((data) => setKeys(data))
    }
  }, [typeContract, type])

  useEffect(() => {
    if (keys) {
      if (typeContract && type && key) {
        if (keys.includes(key)) {
          getParameterValueByKey(typeContract, type, key).then((data) => setCurrentValue(data))
          dispatch(setNewParameter(false))
        } else {
          setCurrentValue(keyNotFound)
          dispatch(setNewParameter(true))
        }
      }
    } else {
      setCurrentValue('')
    }
  }, [key, keys])

  return <h4 style={{ marginBottom: '20px' }}>{`Current value: ${currentValue}`} </h4>
}

export default CurrentParameterValue
