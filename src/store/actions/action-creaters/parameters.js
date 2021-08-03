import * as actionTypes from '../action-types/parameters'

export const getAddressParameter = (value, typeContract) => ({
  type: actionTypes.GET_ADDRESS_PARAMETER,
  value,
  typeContract
})
export const getAddressParameterSuccess = (result) => ({
  type: actionTypes.GET_ADDRESS_PARAMETER_SUCCESS,
  result
})

export const getBoolParameter = (value, typeContract) => ({
  type: actionTypes.GET_BOOLEAN_PARAMETER,
  value,
  typeContract
})
export const getBoolParameterSuccess = (result) => ({
  type: actionTypes.GET_BOOLEAN_PARAMETER_SUCCESS,
  result
})

export const getStringParameter = (value, typeContract) => ({
  type: actionTypes.GET_STRING_PARAMETER,
  value,
  typeContract
})
export const getStringParameterSuccess = (result) => ({
  type: actionTypes.GET_STRING_PARAMETER_SUCCESS,
  result
})

export const getBytesParameter = (value, typeContract) => ({
  type: actionTypes.GET_BYTES_PARAMETER,
  value,
  typeContract
})
export const getBytesParameterSuccess = (result) => ({
  type: actionTypes.GET_BYTES_PARAMETER_SUCCESS,
  result
})

export const getUintParameter = (value, typeContract) => ({
  type: actionTypes.GET_UINT_PARAMETER,
  value,
  typeContract
})
export const getUintParameterSuccess = (result) => ({
  type: actionTypes.GET_UINT_PARAMETER_SUCCESS,
  result
})

export const getParameterValueByKey = (typeContract, typeParameter, parameterKey) => ({
  type: actionTypes.GET_PARAMETER_VALUE_BY_KEY,
  typeContract,
  typeParameter,
  parameterKey
})
export const getParameterValueByKeySuccess = (result) => ({
  type: actionTypes.GET_PARAMETER_VALUE_BY_KEY_SUCCESS,
  result
})

export const getParameterValueByKeyError = (result) => ({
  type: actionTypes.GET_PARAMETER_VALUE_BY_KEY_ERROR,
  result
})

export const getParameterKeysByType = (typeContract, typeParameter) => ({
  type: actionTypes.GET_PARAMETER_KEYS_BY_TYPE,
  typeContract,
  typeParameter
})

export const getParameterKeysByTypeSuccess = (result) => ({
  type: actionTypes.GET_PARAMETER_KEYS_BY_TYPE_SUCCESS,
  result
})
