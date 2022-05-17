import isDate from 'lodash/isDate';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';

import { BN, isAddress } from './useful';

import { hashRegex, linkRegex, vaultID as vaultIDRegex } from 'constants/regex';

export const required = (val) => ({
  isValid: !isEmpty(val) || isNumber(val) || isDate(val) || val instanceof File,
  message: 'Please, fill the field'
});

export const requiredIf = predicate => (val, form) => {
  return {
    isValid: !predicate(val, form) || required(val).isValid,
    message: 'Please, fill the field'
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

export const max = max => (val, form) => {
  const value = BN(val);
  const validatorValue = BN(getValidatorValue(max, form));

  return {
    isValid: value.comparedTo(validatorValue) <= 0,
    message: `Maximum value is ${max}`
  };
};

export const url = val => ({
  isValid: !val || linkRegex.test(String(val)),
  message: 'Please, enter a valid URL'
});

export const address = val => ({
  isValid: !val || isAddress(val),
  message: 'Invalid address'
});

export const vaultID = val => ({
  isValid: !val || vaultIDRegex.test(String(val)),
  message: 'Invalid address'
});

export const hash = val => ({
  isValid: !val || hashRegex.test(String(val)),
  message: 'Invalid hash'
});

export const percent = val => ({
  isValid: !val || (val >= 0 && val <= 100),
  message: 'Invalid percentage value'
});

function getValidatorValue (raw, form) {
  return typeof raw === 'function' ? raw(form) : raw;
}
