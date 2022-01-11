import { put, takeEvery, all } from 'redux-saga/effects'
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
import ErrorHandler from 'func/ErrorHandler'
import {
  contractRegistryInstance,
  getConstitutionInstance,
  getEpdrParametersInstance,
  getEpqfiParametersInstance
} from 'contracts/contract-instance'
import { loadAddrsKeys, loadBoolsKeys, loadBytes32sKeys, loadStringsKeys, loadUintsKeys } from 'func/contractHelpers'

const kVParametersArray = [loadUintsKeys, loadAddrsKeys, loadStringsKeys, loadBytes32sKeys, loadBoolsKeys]

function * getContractRegistryKV () {
  try {
    const contract = contractRegistryInstance
    const data = yield contract.instance.methods.getContracts().call()
    yield put(
      getContractRegistryKVSuccess(
        data.map((i) => ({
          key: i.key,
          value: i.addr
        }))
      )
    )
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getContractRegistryKVError('There was an error while loading Contract Registry data'))
  }
}

function * getConstitutionParametersKV () {
  try {
    const kVParametersArray = [loadUintsKeys, loadAddrsKeys, loadStringsKeys, loadBytes32sKeys, loadBoolsKeys]

    const contract = yield getConstitutionInstance()
    const data = yield all(kVParametersArray.map((fnc) => fnc(contract)))
    yield put(getConstitutionParametersKVSuccess(data.flat()))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getConstitutionParametersKVError('There was an error while loading Constitution Parameters data'))
  }
}

function * getFeesIncentivesExpertPanelParametersKV () {
  try {
    const contract = yield getEpqfiParametersInstance()
    const data = yield all(kVParametersArray.map((fnc) => fnc(contract)))
    yield put(getFeesIncentivesExpertPanelParametersKVSuccess(data.flat()))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getFeesIncentivesExpertPanelParametersKVError('There was an error while loading EPQFI Parameters data'))
  }
}

function * getEPDRParametersKV () {
  try {
    const contract = yield getEpdrParametersInstance()
    console.log(yield contract.getUint('governed.EPDR.debtAuctionP'))

    const data = yield all(kVParametersArray.map((fnc) => fnc(contract)))
    yield put(getEPDRParametersKVSuccess(data.flat()))
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
