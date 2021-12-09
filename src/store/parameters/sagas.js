import { put, takeEvery } from 'redux-saga/effects'
import * as actionTypes from './action-types'
import {
  getAddressParameterSuccess,
  getBoolParameterSuccess,
  getStringParameterSuccess,
  getUintParameterSuccess,
  getBytesParameterSuccess,
  getParameterValueByKeySuccess,
  getParameterKeysByTypeSuccess
} from './action-creators'
import { ParameterType } from '@q-dev/q-js-sdk'
import { CONTRACT_TYPES } from 'constants/contracts'
import { getContractTypeKey } from 'func/contractHelpers'
import ErrorHandler from 'func/ErrorHandler'
import {
  getConstitutionInstance,
  getEpdrParametersInstance,
  getEpqfiParametersInstance
} from 'contracts/contract-instance'

function * getAddressParameter ({ value, typeContract }) {
  try {
    let contract = null
    if (typeContract === 'EPQFI') {
      contract = yield getEpqfiParametersInstance()
    } else if (typeContract === 'EPDR') {
      contract = yield getEpdrParametersInstance()
    }
    const data = yield contract.getAddr(value)
    yield put(getAddressParameterSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getStringParameter ({ value, typeContract }) {
  try {
    let contract = null
    if (typeContract === 'EPQFI') {
      contract = yield getEpqfiParametersInstance()
    } else if (typeContract === 'EPDR') {
      contract = yield getEpdrParametersInstance()
    }
    const data = yield contract.getString(value)
    yield put(getStringParameterSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getBytesParameter ({ value, typeContract }) {
  try {
    let contract = null
    if (typeContract === 'EPQFI') {
      contract = yield getEpqfiParametersInstance()
    } else if (typeContract === 'EPDR') {
      contract = yield getEpdrParametersInstance()
    }
    const data = yield contract.getBytes(value)
    yield put(getBytesParameterSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getUintParameter ({ value, typeContract }) {
  try {
    let contract = null
    if (typeContract === 'EPQFI') {
      contract = yield getEpqfiParametersInstance()
    } else if (typeContract === 'EPDR') {
      contract = yield getEpdrParametersInstance()
    }
    const data = yield contract.getUint(value)
    yield put(getUintParameterSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getBooleanParameter ({ value, typeContract }) {
  try {
    let contract = null
    if (typeContract === 'EPQFI') {
      contract = yield getEpqfiParametersInstance()
    } else if (typeContract === 'EPDR') {
      contract = yield getEpdrParametersInstance()
    }
    const data = yield contract.getBool(value)
    yield put(getBoolParameterSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

async function getContract (typeContract) {
  if (typeContract === CONTRACT_TYPES.qFee) {
    return await getEpqfiParametersInstance()
  } else if (typeContract === CONTRACT_TYPES.qDefi) {
    return await getEpdrParametersInstance()
  } else if (typeContract === CONTRACT_TYPES.constitution) {
    return await getConstitutionInstance()
  } else {
    return null
  }
}

function * getParameterValueByKey ({ typeContract, typeParameter, parameterKey }) {
  try {
    if (typeContract && typeParameter && parameterKey) {
      const contract = yield getContract(typeContract)
      let data = null
      switch (typeParameter) {
        case ParameterType.ADDRESS:
          data = yield contract.getAddr(parameterKey)
          break
        case ParameterType.BOOL:
          data = yield contract.getBool(parameterKey)
          break
        case ParameterType.STRING:
          data = yield contract.getString(parameterKey)
          break
        case ParameterType.BYTE:
          data = yield contract.getBytes(parameterKey)
          break
        case ParameterType.UINT:
          data = yield contract.getUint(parameterKey)
          break
      }
      if (data) {
        yield put(
          getParameterValueByKeySuccess({
            typeContract: getContractTypeKey(typeContract),
            typeParameter,
            parameterKey,
            data
          })
        )
      }
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getParameterKeysByType ({ typeContract, typeParameter }) {
  try {
    if (typeContract && typeParameter) {
      const contract = yield getContract(typeContract)
      let data = null
      switch (typeParameter) {
        case ParameterType.ADDRESS:
          data = yield contract.instance.methods.getAddrKeys().call()
          break
        case ParameterType.BOOL:
          data = yield contract.instance.methods.getBoolKeys().call()
          break
        case ParameterType.STRING:
          data = yield contract.instance.methods.getStringKeys().call()
          break
        case ParameterType.BYTE:
          data = yield contract.instance.methods.getBytesKeys().call()
          break
        case ParameterType.UINT:
          data = yield contract.instance.methods.getUintKeys().call()
          break
      }
      if (data) {
        yield put(
          getParameterKeysByTypeSuccess({
            typeContract,
            typeParameter,
            data
          })
        )
      } else {
        yield put(
          getParameterKeysByTypeSuccess({
            typeContract,
            typeParameter,
            data: {}
          })
        )
      }
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(
      getParameterKeysByTypeSuccess({
        typeContract,
        typeParameter,
        data: {}
      })
    )
  }
}

export default [
  takeEvery(actionTypes.GET_ADDRESS_PARAMETER, getAddressParameter),
  takeEvery(actionTypes.GET_STRING_PARAMETER, getStringParameter),
  takeEvery(actionTypes.GET_BYTES_PARAMETER, getBytesParameter),
  takeEvery(actionTypes.GET_UINT_PARAMETER, getUintParameter),
  takeEvery(actionTypes.GET_BOOLEAN_PARAMETER, getBooleanParameter),
  takeEvery(actionTypes.GET_PARAMETER_VALUE_BY_KEY, getParameterValueByKey),
  takeEvery(actionTypes.GET_PARAMETER_KEYS_BY_TYPE, getParameterKeysByType)
]
