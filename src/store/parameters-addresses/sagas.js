import { put, takeEvery } from 'redux-saga/effects'
import {
  getContractRegistryKVSuccess,
  getContractRegistryKVError,
  getConstitutionParametersKVSuccess,
  getConstitutionParametersKVError,
  getFeesIncentivesExpertPanelParametersKVSuccess,
  getFeesIncentivesExpertPanelParametersKVError,
  getEPDRParametersKVSuccess,
  getEPDRParametersKVError
} from './action-creators'
import * as actionTypes from './action-types'
import { loadKVParameters } from 'func/contractHelpers'
import ErrorHandler from 'func/ErrorHandler'
import { contractRegistryInstance, getConstitutionInstance, getEpdrParametersInstance, getEpqfiParametersInstance } from 'contracts/contract-instance'

function * getContractRegistryKV () {
  try {
    const contract = contractRegistryInstance
    const data = yield contract.instance.methods.getContracts().call()
    yield put(getContractRegistryKVSuccess(
      data.map(i => {
        return {
          key: i.key,
          value: i.addr
        }
      })))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getContractRegistryKVError('There was an error while loading Contract Registry data'))
  }
}

function * getConstitutionParametersKV () {
  try {
    const contract = yield getConstitutionInstance()
    const data = yield loadKVParameters(contract)
    yield put(getConstitutionParametersKVSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getConstitutionParametersKVError('There was an error while loading Constitution Parameters data'))
  }
}

function * getFeesIncentivesExpertPanelParametersKV () {
  try {
    const contract = yield getEpqfiParametersInstance()
    const data = yield loadKVParameters(contract)
    yield put(getFeesIncentivesExpertPanelParametersKVSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getFeesIncentivesExpertPanelParametersKVError(
      'There was an error while loading EPQFI Parameters data'
    ))
  }
}

function * getEPDRParametersKV () {
  try {
    const contract = yield getEpdrParametersInstance()
    const data = yield loadKVParameters(contract)
    yield put(getEPDRParametersKVSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getEPDRParametersKVError('There was an error while loading EPDR Parameters data'))
  }
}

export default [
  takeEvery(actionTypes.GET_CONTRACT_REGISTRY_KV, getContractRegistryKV),
  takeEvery(actionTypes.GET_CONSTITUTION_PARAMETERS_KV, getConstitutionParametersKV),
  takeEvery(actionTypes.GET_FEES_INCENTIVES_EXPERT_PANEL_PARAMETERS_KV, getFeesIncentivesExpertPanelParametersKV),
  takeEvery(actionTypes.GET_FEES_INCENTIVES_EXPERT_PANEL_PARAMETERS_KV, getEPDRParametersKV)
]
