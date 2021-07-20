import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from 'store/actions/action-types/parameters';
import {
  getAddressParameterSuccess, getBoolParameterSuccess,
  getStringParameterSuccess, getUintParameterSuccess, getBytesParameterSuccess,
  getParameterValueByKeySuccess,
  getParameterKeysByTypeSuccess
} from 'store/actions/action-creaters/parameters';
import { ParameterType } from '@q-dev/q-js-sdk';

import EPQFI_Parameters from 'contracts/src/parameters/EPQFI_Parameters';
import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters';
import ConstitutionParameters from 'contracts/src/parameters/ConstitutionParameters';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { CONTRACT_TYPES } from 'constants/contracts';
import { getContractTypeKey } from 'func/contractHelpers';

function* getAddressParameter({
  value,
  typeContract
}) {
  try {
    let contract = null;
    if (typeContract === 'EPQFI') {
      contract = new EPQFI_Parameters('EPQFI_Parameters');
    } else if (typeContract === 'EPDR') {
      contract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    }
    const data = yield contract.getAddr(value);
    yield put(getAddressParameterSuccess(data));
  } catch (err) {
    console.error('getAddressParameter.Error', err);
  }
}

function* getStringParameter({
  value,
  typeContract
}) {
  try {
    let contract = null;
    if (typeContract === 'EPQFI') {
      contract = new EPQFI_Parameters('EPQFI_Parameters');
    } else if (typeContract === 'EPDR') {
      contract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    }
    const data = yield contract.getString(value);
    yield put(getStringParameterSuccess(data));
  } catch (err) {
    console.error('getStringParameter.Error', err);
  }
}

function* getBytesParameter({
  value,
  typeContract
}) {
  try {
    let contract = null;
    if (typeContract === 'EPQFI') {
      contract = new EPQFI_Parameters('EPQFI_Parameters');
    } else if (typeContract === 'EPDR') {
      contract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    }
    const data = yield contract.getBytes(value);
    yield put(getBytesParameterSuccess(data));
  } catch (err) {
    console.error('getBytesParameter.Error', err);
  }
}

function* getUintParameter({
  value,
  typeContract
}) {
  try {
    let contract = null;
    if (typeContract === 'EPQFI') {
      contract = new EPQFI_Parameters('EPQFI_Parameters');
    } else if (typeContract === 'EPDR') {
      contract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    }
    const data = yield contract.getUint(value);
    yield put(getUintParameterSuccess(data));
  } catch (err) {
    console.error('getUintParameter.Error', err);
  }
}

function* getBooleanParameter({
  value,
  typeContract
}) {
  try {
    let contract = null;
    if (typeContract === 'EPQFI') {
      contract = new EPQFI_Parameters('EPQFI_Parameters');
    } else if (typeContract === 'EPDR') {
      contract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    }
    const data = yield contract.getBool(value);
    yield put(getBoolParameterSuccess(data));
  } catch (err) {
    console.error('getBooleanParameter.Error', err);
  }
}

function getContract(typeContract) {
  if (typeContract === CONTRACT_TYPES.qFee) {
    return new EPQFI_Parameters('EPQFI_Parameters');
  } else if (typeContract === CONTRACT_TYPES.qDefi) {
    return new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
  } else if (typeContract === CONTRACT_TYPES.constitution) {
    return new ConstitutionParameters('ConstitutionParameters');
  } else {
    return null;
  }

}

function* getParameterValueByKey({
  typeContract,
  typeParameter,
  parameterKey
}) {
  try {
    if (typeContract && typeParameter && parameterKey) {
      const contract = getContract(typeContract);
      let data = null;
      switch (typeParameter) {
        case ParameterType.ADDRESS:
          data = yield contract.getAddr(parameterKey);
          break;
        case ParameterType.BOOL:
          data = yield contract.getBool(parameterKey);
          break;
        case ParameterType.STRING:
          data = yield contract.getString(parameterKey);
          break;
        case ParameterType.BYTE:
          data = yield contract.getBytes(parameterKey);
          break;
        case ParameterType.UINT:
          data = yield contract.getUint(parameterKey);
          break;
      }
      if (data) {
        yield put(getParameterValueByKeySuccess({
          typeContract: getContractTypeKey(typeContract),
          typeParameter,
          parameterKey,
          data
        }));
      }
    }

  } catch (err) {
    console.error('getParameterValueByKey.Error', err?.message);
  }
}

function* getParameterKeysByType({
  typeContract,
  typeParameter
}) {
  try {
    if (typeContract && typeParameter) {
      const contract = getContract(typeContract);
      let data = null;
      switch (typeParameter) {
        case ParameterType.ADDRESS:
          data = yield contract.getAddrKeys();
          break;
        case ParameterType.BOOL:
          data = yield contract.getBoolKeys();
          break;
        case ParameterType.STRING:
          data = yield contract.getStringKeys();
          break;
        case ParameterType.BYTE:
          data = yield contract.getBytesKeys();
          break;
        case ParameterType.UINT:
          data = yield contract.getUintKeys();
          break;
      }
      if (data) {
        yield put(getParameterKeysByTypeSuccess({
          typeContract,
          typeParameter,
          data
        }));
      } else {
        yield put(getParameterKeysByTypeSuccess({
          typeContract,
          typeParameter,
          data: {}
        }));
      }
    }

  } catch (err) {
    console.error('getParameterValueByKey.Error', err?.message);
    yield put(getParameterKeysByTypeSuccess({
      typeContract,
      typeParameter,
      data: {}
    }));
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
