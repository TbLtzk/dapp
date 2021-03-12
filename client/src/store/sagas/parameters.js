import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from 'store/actions/action-types/parameters';
import {
  getAddressParameterSuccess, getBoolParameterSuccess,
  getStringParameterSuccess, getUintParameterSuccess, getBytesParameterSuccess,
  getParameterValueByKeyError, getParameterValueByKeySuccess,
  getParameterKeysByTypeSuccess
} from 'store/actions/action-creaters/parameters';
import EPQFI_Parameters from 'contracts/src/parameters/EPQFI_Parameters';
import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters';
import ConstitutionParameters from 'contracts/src/parameters/ConstitutionParameters';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';

function* getAddressParameter({ value, typeContract }) {
  try {
    let contract = null;
    if (typeContract === 'EPQFI') {
      contract = new EPQFI_Parameters('EPQFI_Parameters');
    } else if (typeContract === 'EPDR') {
      contract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    }
    const data = yield contract.getAddr(value);
    console.log('getAddressParameter', data);
    yield put(getAddressParameterSuccess(data));
  } catch (err) {
    console.error('getAddressParameter.Error', err);
  }
}

function* getStringParameter({ value, typeContract }) {
  try {
    let contract = null;
    if (typeContract === 'EPQFI') {
      contract = new EPQFI_Parameters('EPQFI_Parameters');
    } else if (typeContract === 'EPDR') {
      contract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    }
    const data = yield contract.getString(value);
    console.log('getStringParameter', data);
    yield put(getStringParameterSuccess(data));
  } catch (err) {
    console.error('getStringParameter.Error', err);
  }
}

function* getBytesParameter({ value, typeContract }) {
  try {
    let contract = null;
    if (typeContract === 'EPQFI') {
      contract = new EPQFI_Parameters('EPQFI_Parameters');
    } else if (typeContract === 'EPDR') {
      contract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    }
    const data = yield contract.getBytes(value);
    console.log('getBytesParameter', data);
    yield put(getBytesParameterSuccess(data));
  } catch (err) {
    console.error('getBytesParameter.Error', err);
  }
}

function* getUintParameter({ value, typeContract }) {
  try {
    let contract = null;
    if (typeContract === 'EPQFI') {
      contract = new EPQFI_Parameters('EPQFI_Parameters');
    } else if (typeContract === 'EPDR') {
      contract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    }
    const data = yield contract.getUint(value);
    console.log('getUintParameter', data);
    yield put(getUintParameterSuccess(data));
  } catch (err) {
    console.error('getUintParameter.Error', err);
  }
}

function* getBooleanParameter({ value, typeContract }) {
  try {
    let contract = null;
    if (typeContract === 'EPQFI') {
      contract = new EPQFI_Parameters('EPQFI_Parameters');
    } else if (typeContract === 'EPDR') {
      contract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    }
    const data = yield contract.getBool(value);
    console.log('getBooleanParameter', data);
    yield put(getBoolParameterSuccess(data));
  } catch (err) {
    console.error('getBooleanParameter.Error', err);
  }
}

function getContract(typeContract) {
  if (typeContract === 'q-fees-&-incentives-membership-panel') {
    return new EPQFI_Parameters('EPQFI_Parameters');
  } else if (typeContract === 'q-defi-(decentralized-finance)-membership-panel') {
    return new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
  } else if (typeContract === 'constitution') {
    return new ConstitutionParameters('ConstitutionParameters');
  } else {
    return null;
  }

}

function* getParameterValueByKey({ typeContract, typeParameter, parameterKey }) {
  console.log('typeContract', typeContract);
  console.log('typeParameter', typeParameter);
  console.log('parameterKey', parameterKey);
  try {
    if (typeContract && typeParameter && parameterKey) {
      const contract = getContract(typeContract);
      console.log('contract', contract);
      console.log('typeParameter', typeParameter);
      let data = null;
      switch (typeParameter) {
        case 'address':
          data = yield contract.getAddr(parameterKey);
          break;
        case 'boolean':
          data = yield contract.getBool(parameterKey);
          break;
        case 'string':
          data = yield contract.getString(parameterKey);
          break;
        case 'bytes':
          data = yield contract.getBytes(parameterKey);
          break;
        case 'uint':
          data = yield contract.getUint(parameterKey);
          break;
      }
      console.log('getParameterValueByKey', data);
      if (data) {
        // console.log('getParameterValueByKey', data);
        yield put(getParameterValueByKeySuccess(data));
      } else {
        // yield put(getParameterValueByKeySuccess([]));
        yield put(getParameterValueByKeySuccess('Value not found. Key does not exist yet?'));
      }
    }

  } catch (err) {
    console.error('getParameterValueByKey.Error', err?.message);
    yield put(getParameterValueByKeySuccess('Value not found. Key does not exist yet?'));
  }
}

function* getParameterKeysByType({ typeContract, typeParameter }) {
  console.log('typeContract', typeContract);
  console.log('typeParameter', typeParameter);
  try {
    if (typeContract && typeParameter) {
      const contract = getContract(typeContract);
      console.log('contract', contract);
      let data = null;
      switch (typeParameter) {
        case 'address':
          data = yield contract.getAddrKeys();
          break;
        case 'boolean':
          data = yield contract.getBoolKeys();
          break;
        case 'string':
          data = yield contract.getStringKeys();
          break;
        case 'bytes':
          data = yield contract.getBytesKeys();
          break;
        case 'uint':
          data = yield contract.getUintKeys();
          break;
      }
      console.log('getParameterValueByKey', data);
      if (data) {
        yield put(getParameterKeysByTypeSuccess(data));
      } else {
        yield put(getParameterKeysByTypeSuccess([]));
      }
    }

  } catch (err) {
    console.error('getParameterValueByKey.Error', err?.message);
    yield put(getParameterKeysByTypeSuccess([]));
  }
}

export default [
  takeEvery(actionTypes.GET_ADDRESS_PARAMETER, getAddressParameter),
  takeEvery(actionTypes.GET_STRING_PARAMETER, getStringParameter),
  takeEvery(actionTypes.GET_BYTES_PARAMETER, getBytesParameter),
  takeEvery(actionTypes.GET_UINT_PARAMETER, getUintParameter),
  takeEvery(actionTypes.GET_BOOLEAN_PARAMETER, getBooleanParameter),
  takeEvery(actionTypes.GET_PARAMETER_VALUE_BY_KEY, getParameterValueByKey),
  takeEvery(actionTypes.GET_PARAMETER_KEYS_BY_TYPE, getParameterKeysByType),
];
