import { ParameterType } from '@q-dev/q-js-sdk';

import { CONTRACT_TYPES } from 'constants/contracts';

export function getTypeName (typeId) {
  switch (typeId) {
    case ParameterType.ADDRESS:
      return 'Address';
    case ParameterType.BOOL:
      return 'Boolean';
    case ParameterType.STRING:
      return 'String';
    case ParameterType.UINT:
      return 'Uint';
  }
}

export function getTypeKey (typeId) {
  switch (typeId) {
    case ParameterType.ADDRESS:
      return 'address';
    case ParameterType.BOOL:
      return 'boolean';
    case ParameterType.STRING:
      return 'string';
    case ParameterType.UINT:
      return 'uint';
    case ParameterType.BYTE:
      return 'byte';
    default:
      return '';
  }
}

export function getContractTypeKey (typeId) {
  switch (typeId) {
    case CONTRACT_TYPES.constitution:
      return 'constitution';
    case CONTRACT_TYPES.qDefi:
      return 'qDefi';
    case CONTRACT_TYPES.qFee:
      return 'qFee';
    default:
      return '';
  }
}
