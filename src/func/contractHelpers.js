import { ParameterType } from '@q-dev/q-js-sdk';

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
