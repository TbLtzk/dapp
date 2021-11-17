import * as actionTypes from './action-types'
import { getTypeKey, getContractTypeKey } from 'func/contractHelpers'

const initialState = {
  addressParameter: null,
  booleanParameter: null,
  stringParameter: null,
  bytesParameter: null,
  uintParameter: null,

  parameterValueByKey: [],
  parameterValueByKeyError: '',
  arrayParameterKeysByType: '{"constitution":[],"qDefi":[],"qFee":[]}'
}

export default function parameters (state = initialState, action) {
  let contractKey = ''
  let typeKey = ''
  const result = action.result
  switch (action.type) {
    case actionTypes.GET_ADDRESS_PARAMETER_SUCCESS:
      return {
        ...state,
        addressParameter: result
      }
    case actionTypes.GET_BOOLEAN_PARAMETER_SUCCESS:
      return {
        ...state,
        booleanParameter: result
      }
    case actionTypes.GET_STRING_PARAMETER_SUCCESS:
      return {
        ...state,
        stringParameter: result
      }
    case actionTypes.GET_BYTES_PARAMETER_SUCCESS:
      return {
        ...state,
        bytesParameter: result
      }
    case actionTypes.GET_UINT_PARAMETER_SUCCESS:
      return {
        ...state,
        uintParameter: result
      }
    case actionTypes.GET_PARAMETER_VALUE_BY_KEY_SUCCESS:
      let newParameterValueByKey = []
      typeKey = getTypeKey(result.typeParameter)
      const value = state.parameterValueByKey.find(i => {
        return i.typeContract === result.typeContract && i.parameterKey === result.parameterKey && i.typeParameter === result.typeParameter
      })
      if (value) {
        value.data = result.data
        newParameterValueByKey = [...state.parameterValueByKey]
      } else {
        newParameterValueByKey = [...state.parameterValueByKey, result]
      }
      return {
        ...state,
        parameterValueByKey: newParameterValueByKey
      }
    case actionTypes.GET_PARAMETER_VALUE_BY_KEY_ERROR:
      return {
        ...state,
        parameterValueByKeyError: result
      }
    case actionTypes.GET_PARAMETER_KEYS_BY_TYPE_SUCCESS:
      contractKey = getContractTypeKey(result.typeContract)
      typeKey = getTypeKey(result.typeParameter)
      const arrayParameterKeysByType = JSON.parse(state.arrayParameterKeysByType)
      if (contractKey && typeKey) {
        const newArrayParameterKeysByType = [...arrayParameterKeysByType[contractKey], ...result.data]
        arrayParameterKeysByType[contractKey] = Array.from(new Set(newArrayParameterKeysByType))
      }
      return {
        ...state,
        arrayParameterKeysByType: JSON.stringify(arrayParameterKeysByType)
      }
    default:
      return state
  }
}
