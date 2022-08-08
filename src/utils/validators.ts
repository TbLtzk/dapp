import { ParameterType } from '@q-dev/q-js-sdk';
import { isBoolean } from 'lodash';
import isDate from 'lodash/isDate';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';

import { BN } from './useful';

const HASH_REGEX = /^0x[a-fA-F0-9]{64}$/;
const VAULT_ID_REGEX = /^[0-9]{1,18}$/;
const URL_REGEX = /https?:\/\/(www\.)?[-äöüa-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-äöüa-zA-Z0-9()@:%_+.~#?&//=]*)/;

interface ValidationResult {
  isValid: boolean;
  message: string;
}
type ValidatorValue = string | number | boolean | Date | ParameterType | File | null;
type Validator<T extends ValidatorValue = ValidatorValue, U = unknown> = (val: T, form?: U) => ValidationResult
type ValidatorFn<U, T extends ValidatorValue = ValidatorValue> = (val: U | ((form: unknown) => T)) => Validator<T>

export const required: Validator = (val) => ({
  isValid: !isEmpty(val) || isNumber(val) || isDate(val) || isBoolean(val) || val instanceof File,
  message: 'The field is required'
});

export const requiredIf: ValidatorFn<(val: ValidatorValue, form: unknown) => boolean> = predicate => (val, form) => {
  return {
    isValid: !predicate(val, form) || required(val).isValid,
    message: 'The field is required'
  };
};

export const amount: ValidatorFn<string | number> = max => (val, form) => {
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
    message: `Max amount: ${max}`
  };
};

export const min: ValidatorFn<number | string> = min => (val, form) => {
  const value = BN(val);
  const validatorValue = BN(getValidatorValue(min, form));

  return {
    isValid: value.comparedTo(validatorValue) >= 0,
    message: `Minimum value is ${min}`
  };
};

export const max: ValidatorFn<number | string> = max => (val, form) => {
  const value = BN(val);
  const validatorValue = BN(getValidatorValue(max, form));

  return {
    isValid: value.comparedTo(validatorValue) <= 0,
    message: `Maximum value is ${max}`
  };
};

export const url: Validator = val => ({
  isValid: !val || URL_REGEX.test(String(val)),
  message: 'Invalid URL'
});

export const address: Validator<string> = val => ({
  isValid: !val || window.web3.utils.isAddress(val),
  message: 'Invalid address'
});

export const vaultID: Validator = val => ({
  isValid: !val || VAULT_ID_REGEX.test(String(val)),
  message: 'Invalid vault ID'
});

export const hash: Validator = val => ({
  isValid: !val || HASH_REGEX.test(String(val)),
  message: 'Invalid hash'
});

export const currentHash: ValidatorFn<string> = hash => val => ({
  isValid: !val || val === hash,
  message: 'Invalid current hash'
});

export const percent: Validator = val => ({
  isValid: !val || (Number(val) >= 0 && Number(val) <= 100),
  message: 'Invalid percentage value'
});

export const parameterType: ValidatorFn<ParameterType> = type => (val, form) => {
  const typeValue = getValidatorValue(type, form);
  if (!val) return { isValid: true, message: '' };

  switch (typeValue) {
    case ParameterType.ADDRESS:
      return {
        isValid: window.web3.utils.isAddress(String(val)),
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

function getValidatorValue<T extends ValidatorValue> (raw: T | ((form: unknown) => T), form: unknown): T {
  return typeof raw === 'function' ? raw(form) : raw;
}
