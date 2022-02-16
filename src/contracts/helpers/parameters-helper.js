import { ParameterType } from '@q-dev/q-js-sdk'
import {
  getEpqfiParametersInstance,
  getEpdrParametersInstance,
  getConstitutionInstance,
  getEprsParametersInstance
} from 'contracts/contract-instance'
import ErrorHandler from 'func/ErrorHandler'
import { CONTRACT_TYPES } from 'constants/contracts'

async function getContract (typeContract) {
  switch (typeContract) {
    case CONTRACT_TYPES.qFee:
      return await getEpqfiParametersInstance()
    case CONTRACT_TYPES.qDefi:
      return await getEpdrParametersInstance()
    case CONTRACT_TYPES.constitution:
      return await getConstitutionInstance()
    case CONTRACT_TYPES.qEprs:
      return await getEprsParametersInstance()
  }
}

export async function getParameterKeysByType (typeContract, typeParameter) {
  try {
    const contract = await getContract(typeContract)
    let data
    switch (typeParameter) {
      case ParameterType.ADDRESS:
        data = await contract.instance.methods.getAddrKeys().call()
        break
      case ParameterType.BOOL:
        data = await contract.instance.methods.getBoolKeys().call()
        break
      case ParameterType.STRING:
        data = await contract.instance.methods.getStringKeys().call()
        break
      case ParameterType.BYTE:
        data = await contract.instance.methods.getBytesKeys().call()
        break
      case ParameterType.UINT:
        data = await contract.instance.methods.getUintKeys().call()
        break
    }
    return data
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    return null
  }
}

export async function getParameterValueByKey (typeContract, typeParameter, parameterKey) {
  try {
    const contract = await getContract(typeContract)
    let data
    switch (typeParameter) {
      case ParameterType.ADDRESS:
        data = await contract.getAddr(parameterKey)
        break
      case ParameterType.BOOL:
        data = await contract.getBool(parameterKey)
        break
      case ParameterType.STRING:
        data = await contract.getString(parameterKey)
        break
      case ParameterType.BYTE:
        data = await contract.getBytes(parameterKey)
        break
      case ParameterType.UINT:
        data = await contract.getUint(parameterKey)
        break
    }
    return data
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    return null
  }
}

export const transformToParams = (formData) => {
  return formData['parameter-type'].reduce((types, item, idx) => {
    types.push({
      type: item,
      key: formData['parameter-key'][idx],
      value: formData['parameter-value'][idx]
    })
    return types
  }, [])
}
