import { all, put, takeEvery } from 'redux-saga/effects';

import {
  getConstitutionParametersKVError,
  getConstitutionParametersKVSuccess,
  getContractRegistryKVError,
  getContractRegistryKVSuccess,
  getEPDRParametersKVError,
  getEPDRParametersKVSuccess,
  getEPRSParametersKVError,
  getEPRSParametersKVSuccess,
  getFeesIncentivesExpertPanelParametersKVError,
  getFeesIncentivesExpertPanelParametersKVSuccess
} from './action-creators';
import * as actionTypes from './action-types';

import {
  contractRegistryInstance,
  getConstitutionInstance,
  getEpdrParametersInstance,
  getEpqfiParametersInstance,
  getEprsParametersInstance
} from 'contracts/contract-instance';
import { getContractOwner } from 'contracts/helpers/parameters-helper';

import ErrorHandler from 'func/ErrorHandler';

const TYPES = ['Uint', 'String', 'Bool', 'Addr', 'Bytes32'];

async function getParameters (type, contract) {
  const parameters = await contract.getParameters(type);
  type = type.toUpperCase();
  return parameters.map((data) => ({ type, ...data }));
}

async function getGnosisSafesMap () {
  const [upgradeSafe, tokenBridgeSafe] = await Promise.all([
    getContractOwner('upgradeVoting'),
    getContractOwner('tokenBridgeAdminProxy')
  ]);

  return {
    'governance.upgrade.contractRegistryVoting': upgradeSafe,
    'defi.tokenBridgeAdminProxy': tokenBridgeSafe
  };
}

function* getContractRegistryKV () {
  try {
    const contract = contractRegistryInstance;
    const data = yield contract.instance.methods.getContracts().call();
    const safesMap = yield getGnosisSafesMap();
    yield put(
      getContractRegistryKVSuccess(
        data.map((i) => ({
          key: i.key,
          value: i.addr,
          gnosisSafeAddress: safesMap[i.key] || '',
          type: 'ADDR'
        }))
      )
    );
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    yield put(getContractRegistryKVError('There was an error while loading Contract Registry data'));
  }
}

function* getConstitutionParametersKV () {
  try {
    const contract = yield getConstitutionInstance();
    const data = yield all(TYPES.map((type) => getParameters(type, contract)));
    yield put(getConstitutionParametersKVSuccess(data.flat()));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    yield put(getConstitutionParametersKVError('There was an error while loading Constitution Parameters data'));
  }
}

function* getFeesIncentivesExpertPanelParametersKV () {
  try {
    const contract = yield getEpqfiParametersInstance();
    const data = yield all(TYPES.map((type) => getParameters(type, contract)));
    yield put(getFeesIncentivesExpertPanelParametersKVSuccess(data.flat()));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    yield put(getFeesIncentivesExpertPanelParametersKVError('There was an error while loading EPQFI Parameters data'));
  }
}

function* getEPDRParametersKV () {
  try {
    const contract = yield getEpdrParametersInstance();
    const data = yield all(TYPES.map((type) => getParameters(type, contract)));
    yield put(getEPDRParametersKVSuccess(data.flat()));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    yield put(getEPDRParametersKVError('There was an error while loading EPDR Parameters data'));
  }
}

function* getEPRSParametersKV () {
  try {
    const contract = yield getEprsParametersInstance();
    const data = yield all(TYPES.map((type) => getParameters(type, contract)));
    yield put(getEPRSParametersKVSuccess(data.flat()));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    yield put(getEPRSParametersKVError('There was an error while loading EPRS Parameters data'));
  }
}

export default [
  takeEvery(actionTypes.GET_CONTRACT_REGISTRY_KV, getContractRegistryKV),
  takeEvery(actionTypes.GET_CONSTITUTION_PARAMETERS_KV, getConstitutionParametersKV),
  takeEvery(actionTypes.GET_FEES_INCENTIVES_EXPERT_PANEL_PARAMETERS_KV, getFeesIncentivesExpertPanelParametersKV),
  takeEvery(actionTypes.GET_EPDR_PARAMETERS_KV, getEPDRParametersKV),
  takeEvery(actionTypes.GET_EPRS_PARAMETERS_KV, getEPRSParametersKV)
];
