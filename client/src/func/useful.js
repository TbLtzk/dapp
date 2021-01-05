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

export const roundNumber = (num, numAfterComa = 0) => {
  if (num === undefined || num.isNaN === true) return undefined;

  let res = num;
  if (numAfterComa === 0) {
    res = Math.round(num);
  } else {
    const roundNum = 10 ** numAfterComa;
    res = Math.round(num * roundNum) / roundNum;
  }
  return res;
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

  return (num * 100) / (10 ** 27);
};

export const uintPerSecondToPerYearNumber = (num) => {
  const numL = num;
  if (numL === undefined || numL.isNaN === true) return undefined;

  const perSec = uintPercentToNumber(numL) / 100;
  const res = (((1 + perSec) ** (365 * 24 * 3600)) - 1) * 100;
  return roundNumber(res, 4);
};
