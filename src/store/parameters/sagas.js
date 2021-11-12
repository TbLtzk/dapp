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

import EPQFIParameters from 'contracts/src/parameters/EPQFI_Parameters'
import EPDRParameters from 'contracts/src/parameters/EPDR_Parameters'
import ConstitutionParameters from 'contracts/src/parameters/ConstitutionParameters'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import { CONTRACT_TYPES } from 'constants/contracts'
import { getContractTypeKey } from 'func/contractHelpers'
import ErrorHandler from 'func/ErrorHandler'

function * getAddressParameter ({ value, typeContract }) {
  try {
    let contract = null
    if (typeContract === 'EPQFI') {
      contract = new EPQFIParameters('EPQFIParameters')
    } else if (typeContract === 'EPDR') {
      contract = new EPDRParameters(contractsToAddresses.EPDRParameters)
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
      contract = new EPQFIParameters('EPQFIParameters')
    } else if (typeContract === 'EPDR') {
      contract = new EPDRParameters(contractsToAddresses.EPDRParameters)
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
      contract = new EPQFIParameters('EPQFIParameters')
    } else if (typeContract === 'EPDR') {
      contract = new EPDRParameters(contractsToAddresses.EPDRParameters)
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
      contract = new EPQFIParameters('EPQFIParameters')
    } else if (typeContract === 'EPDR') {
      contract = new EPDRParameters(contractsToAddresses.EPDRParameters)
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
      contract = new EPQFIParameters('EPQFIParameters')
    } else if (typeContract === 'EPDR') {
      contract = new EPDRParameters(contractsToAddresses.EPDRParameters)
    }
    const data = yield contract.getBool(value)
    yield put(getBoolParameterSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function getContract (typeContract) {
  if (typeContract === CONTRACT_TYPES.qFee) {
    return new EPQFIParameters('EPQFIParameters')
  } else if (typeContract === CONTRACT_TYPES.qDefi) {
    return new EPDRParameters(contractsToAddresses.EPDRParameters)
  } else if (typeContract === CONTRACT_TYPES.constitution) {
    return new ConstitutionParameters('ConstitutionParameters')
  } else {
    return null
  }
}

function * getParameterValueByKey ({ typeContract, typeParameter, parameterKey }) {
  try {
    if (typeContract && typeParameter && parameterKey) {
      const contract = getContract(typeContract)
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
      const contract = getContract(typeContract)
      let data = null
      switch (typeParameter) {
        case ParameterType.ADDRESS:
          data = yield contract.getAddrKeys()
          break
        case ParameterType.BOOL:
          data = yield contract.getBoolKeys()
          break
        case ParameterType.STRING:
          data = yield contract.getStringKeys()
          break
        case ParameterType.BYTE:
          data = yield contract.getBytesKeys()
          break
        case ParameterType.UINT:
          data = yield contract.getUintKeys()
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
