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

function* getAddressParameter({ value, typeContract }) {
  try {
    let contract = null;
    if (typeContract === 'EPQFI') {
      contract = new EPQFI_Parameters('EPQFI_Parameters');
    } else if (typeContract === 'EPDR') {
      contract = new EPDR_Parameters('EPDR_Parameters');
    }
    const data = yield contract.getAddr(value);
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
      contract = new EPDR_Parameters('EPDR_Parameters');
    }
    const data = yield contract.getString(value);
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
      contract = new EPDR_Parameters('EPDR_Parameters');
    }
    const data = yield contract.getBytes(value);
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
      contract = new EPDR_Parameters('EPDR_Parameters');
    }
    const data = yield contract.getUint(value);
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
      contract = new EPDR_Parameters('EPDR_Parameters');
    }
    const data = yield contract.getBool(value);
    yield put(getBoolParameterSuccess(data));
  } catch (err) {
    console.error('getBooleanParameter.Error', err);
  }
}

function getContract(typeContract) {
  if (typeContract === 'q-fees-&-incentives-membership-panel') {
    return new EPQFI_Parameters('EPQFI_Parameters');
  } else if (typeContract === 'q-defi-(decentralized-finance)-membership-panel') {
    return new EPDR_Parameters('EPDR_Parameters');
  } else if (typeContract === 'constitution') {
    return new ConstitutionParameters('ConstitutionParameters');
  } else {
    return null;
  }

}

function* getParameterValueByKey({ typeContract, typeParameter, parameterKey }) {
  try {
    if (typeContract && typeParameter && parameterKey) {
      const contract = getContract(typeContract);
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
      if (data) {
        yield put(getParameterValueByKeySuccess(data));
      } else {
        yield put(getParameterValueByKeySuccess('Value not found. Key does not exist yet?'));
      }
    }

  } catch (err) {
    console.error('getParameterValueByKey.Error', err?.message);
    yield put(getParameterValueByKeySuccess('Value not found. Key does not exist yet?'));
  }
}

function* getParameterKeysByType({ typeContract, typeParameter }) {
  try {
    if (typeContract && typeParameter) {
      const contract = getContract(typeContract);
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
