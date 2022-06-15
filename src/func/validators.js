import { ParameterType } from '@q-dev/q-js-sdk';
import { isBoolean } from 'lodash';
import isDate from 'lodash/isDate';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';

import { BN, isAddress } from './useful';

import { hashRegex, linkRegex, vaultID as vaultIDRegex } from 'constants/regex';

export const required = (val) => ({
  isValid: !isEmpty(val) || isNumber(val) || isDate(val) || isBoolean(val) || val instanceof File,
  message: 'The field is required'
});

export const requiredIf = predicate => (val, form) => {
  return {
    isValid: !predicate(val, form) || required(val).isValid,
    message: 'The field is required'
  };
};

export const amount = max => (val, form) => {
  const value = BN(val);
  const zero = BN(0);
  const validatorValue = BN(getValidatorValue(max, form));

  if (value.comparedTo(zero) === 0) {
    return {
      isValid: false,
      message: 'Amount must be greater than 0'
    };
  }

  if (validatorValue.comparedTo(BN(0)) === 0) {
    return {
      isValid: false,
      message: 'Available amount is 0'
    };
  }

  return {
    isValid: value.comparedTo(validatorValue) <= 0,
    message: `Maximum amount is ${max}`
  };
};

export const min = min => (val, form) => {
  const value = BN(val);
  const validatorValue = BN(getValidatorValue(min, form));

  return {
    isValid: value.comparedTo(validatorValue) >= 0,
    message: `Minimum value is ${min}`
  };
};

export const max = max => (val, form) => {
  const value = BN(val);
  const validatorValue = BN(getValidatorValue(max, form));

  return {
    isValid: value.comparedTo(validatorValue) <= 0,
    message: `Maximum value is ${max}`
  };
};

export const url = val => ({
  isValid: !val || String(val).search(linkRegex) !== -1,
  message: 'Invalid URL'
});

export const address = val => ({
  isValid: !val || isAddress(val),
  message: 'Invalid address'
});

export const vaultID = val => ({
  isValid: !val || String(val).search(vaultIDRegex) !== -1,
  message: 'Invalid vault ID'
});

export const hash = val => ({
  isValid: !val || String(val).search(hashRegex) !== -1,
  message: 'Invalid hash'
});

export const percent = val => ({
  isValid: !val || (val >= 0 && val <= 100),
  message: 'Invalid percentage value'
});

export const parameterType = type => (val, form) => {
  const typeValue = getValidatorValue(type, form);
  if (!val) return { isValid: true, message: '' };

  switch (typeValue) {
    case ParameterType.ADDRESS:
      return {
        isValid: isAddress(address),
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
        isValid: !BN(String(val)).isNaN(),
        message: 'Invalid uint value'
      };

    default:
      return { isValid: true, message: '' };
  }
};

function getValidatorValue (raw, form) {
  return typeof raw === 'function' ? raw(form) : raw;
}
