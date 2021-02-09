import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from 'store/actions/action-types/parameters';
import {
  getAddressParameterSuccess, getBoolParameterSuccess,
  getStringParameterSuccess, getUintParameterSuccess, getBytesParameterSuccess,
  getParameterValueByKeyError, getParameterValueByKeySuccess
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
      contract = new EPDR_Parameters('EPDR_Parameters');
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
      contract = new EPDR_Parameters('EPDR_Parameters');
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
      contract = new EPDR_Parameters('EPDR_Parameters');
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
      contract = new EPDR_Parameters('EPDR_Parameters');
    }
    const data = yield contract.getBool(value);
    console.log('getBooleanParameter', data);
    yield put(getBoolParameterSuccess(data));
  } catch (err) {
    console.error('getBooleanParameter.Error', err);
  }
}

function* getParameterValueByKey({ typeContract, typeParameter, parameterKey }) {
  console.log('typeContract', typeContract);
  console.log('typeParameter', typeParameter);
  console.log('parameterKey', parameterKey);
  try {
    if (typeContract && typeParameter && parameterKey) {
      let contract = null;
      if (typeContract === 'q-fees-&-incentives-membership-panel') {
        contract = new EPQFI_Parameters('EPQFI_Parameters');
      } else if (typeContract === 'q-defi-(decentralized-finance)-membership-panel') {
        contract = new EPDR_Parameters('EPDR_Parameters');
      } else if (typeContract === 'constitution') {
        contract = new ConstitutionParameters('ConstitutionParameters');
      }
      console.log('contract', contract);
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
        console.log('getParameterValueByKey', data);
        yield put(getParameterValueByKeySuccess(data));
      }else {
        yield put(getParameterValueByKeySuccess('Value not found. Key does not exist yet?'));
      }
    }

  } catch (err) {
    console.error('getParameterValueByKey.Error', err?.message);
    yield put(getParameterValueByKeySuccess('Value not found. Key does not exist yet?'));
  }
}

export default [
  takeEvery(actionTypes.GET_ADDRESS_PARAMETER, getAddressParameter),
  takeEvery(actionTypes.GET_STRING_PARAMETER, getStringParameter),
  takeEvery(actionTypes.GET_BYTES_PARAMETER, getBytesParameter),
  takeEvery(actionTypes.GET_UINT_PARAMETER, getUintParameter),
  takeEvery(actionTypes.GET_BOOLEAN_PARAMETER, getBooleanParameter),
  takeEvery(actionTypes.GET_PARAMETER_VALUE_BY_KEY, getParameterValueByKey),
];
