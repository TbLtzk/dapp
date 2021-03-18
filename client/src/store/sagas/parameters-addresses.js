import { put, takeEvery } from 'redux-saga/effects';
import ConstitutionParameters from 'contracts/src/parameters/ConstitutionParameters';
import EPQFI_Parameters from 'contracts/src/parameters/EPQFI_Parameters';
import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters';
import { ContractRegistry } from 'contracts/src/ContractRegistry';
import {
  getContractRegistryKVSuccess,
  getContractRegistryKVError,
  getConstitutionParametersKVSuccess,
  getConstitutionParametersKVError,
  getFeesIncentivesExpertPanelParametersKVSuccess,
  getFeesIncentivesExpertPanelParametersKVError,
  getEPDRParametersKVSuccess,
  getEPDRParametersKVError
} from '../actions/action-creaters/parameters-addresses';
import * as actionTypes from '../actions/action-types/parameters-addresses';
import { loadKVParameters } from 'func/contractHelpers';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';

function* getContractRegistryKV() {
  try {
    const contract = new ContractRegistry();
    const data = yield contract.getContracts();
    yield put(getContractRegistryKVSuccess(
      data.map(i => {
        return {
          key: i.key,
          value: i.addr
        };
      })));
  } catch (err) {
    console.error(err);
    yield put(getContractRegistryKVError('There was an error while loading Contract Registry data'));
  }
}

function* getConstitutionParametersKV() {
  try {
    const contract = new ConstitutionParameters();
    const data = yield loadKVParameters(contract);
    yield put(getConstitutionParametersKVSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(getConstitutionParametersKVError('There was an error while loading Constitution Parameters data'));
  }
}

function* getFeesIncentivesExpertPanelParametersKV() {
  try {
    const contract = new EPQFI_Parameters();
    const data = yield loadKVParameters(contract);
    yield put(getFeesIncentivesExpertPanelParametersKVSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(getFeesIncentivesExpertPanelParametersKVError(
      'There was an error while loading EPQFI Parameters data'
    ));
  }
}

function* getEPDRParametersKV() {
  try {
    const contract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    const data = yield loadKVParameters(contract);
    yield put(getEPDRParametersKVSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(getEPDRParametersKVError('There was an error while loading EPDR Parameters data'));
  }
}

export default [
  takeEvery(actionTypes.GET_CONTRACT_REGISTRY_KV, getContractRegistryKV),
  takeEvery(actionTypes.GET_CONSTITUTION_PARAMETERS_KV, getConstitutionParametersKV),
  takeEvery(actionTypes.GET_FEES_INCENTIVES_EXPERT_PANEL_PARAMETERS_KV, getFeesIncentivesExpertPanelParametersKV),
  takeEvery(actionTypes.GET_FEES_INCENTIVES_EXPERT_PANEL_PARAMETERS_KV, getEPDRParametersKV),
];
