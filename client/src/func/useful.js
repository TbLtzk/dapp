import { BigNumber } from 'bignumber.js';
import { web3 } from '../contracts/config/drizzle-config';

export const errorHandler = (error, field, min = 0, max = 100) => {
  if (undefined === error[field]) return '';

  switch (error[field].type) {
    case 'required':
      return 'Field is required!';
    case 'min':
      return `Value must be more than ${min}`;
    case 'max':
      return `Value must be less than ${max}`;
    default:
      return 'Validation error!';
  }
};

export const fN = (number) => {
  if (number === undefined || number.isNaN) return number;
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 4 }).format(number);
};

export const numberToUintPercent = (num) => {
  const numL = num;
  let uintNum;
  if (numL === undefined || numL.isNaN === true) return undefined;
  if (numL <= 0) {
    uintNum = 0;
  } else if (numL >= 100) {
    uintNum = 10 ** 27;
  } else {
    uintNum = (numL * (10 ** 27)) / 100;
  }

  const BNNum = new BigNumber(uintNum);
  return web3.utils.toHex(BNNum);
};

export const uintPercentToNumber = (num) => {
  if (num === undefined || num.isNaN === true) return undefined;
  if (num <= 0) return 0;
  if (num >= (10 ** 27)) return 100;

  return num / (10 ** 27);
};

export const uintPerSecondToPerYearNumber = (num) => {
  const numL = num;

  if (numL === undefined || numL.isNaN === true) return undefined;

  const perSec = uintPercentToNumber(numL);
  return (((1 + perSec) ** (365 * 24 * 3600)) - 1) * 100;
};


export const bn = (number) => {
  return new BigNumber(number);
};

export const getPercentageFormat = (number) => {
  return bn(1e+27)
    .multipliedBy(number)
    .dividedBy(100);
};


