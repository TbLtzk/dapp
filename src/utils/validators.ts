import { getValidatorValue, ValidatorFn } from '@q-dev/form-hooks';
import { ParameterType } from '@q-dev/q-js-sdk';
import { toBigNumber } from '@q-dev/utils';

import { isAddress } from './web3';

export {
  address,
  amount,
  currentHash,
  futureDate,
  hash,
  max,
  min,
  nonZeroAddress,
  percent,
  required,
  requiredIf,
  url,
  vaultID,
} from '@q-dev/form-hooks';

export const parameterType: ValidatorFn<ParameterType> = type => (val, form) => {
  const typeValue = getValidatorValue(type, form);
  if (!val) return { isValid: true, message: '' };

  switch (typeValue) {
    case ParameterType.ADDRESS:
      return {
        isValid: isAddress(String(val)),
        message: 'Invalid address'
      };

    case ParameterType.BOOL:
      return {
        isValid: ['true', 'false'].includes(String(val).toLowerCase()),
        message: 'Invalid boolean value'
      };

    case ParameterType.STRING:
      return {
        isValid: String(val).length <= 1024,
        message: 'Invalid string value'
      };

    case ParameterType.UINT:
      return {
        isValid: !toBigNumber(String(val)).isNaN(),
        message: 'Invalid uint value'
      };

    default:
      return { isValid: true, message: '' };
  }
};
