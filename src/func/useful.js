import { ParameterType } from '@q-dev/q-js-sdk';
import { BigNumber } from 'bignumber.js';
import { isNumber, orderBy } from 'lodash';

import ErrorHandler from './ErrorHandler';

import { transformAuctionNameToAuctionType } from 'contracts/helpers/auctions-helpers/auction-service-helper';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { keyRegex } from 'constants/regex';

export const transformToHex = (value) => {
  return window.web3.utils.toHex(value);
};

export const toTitleCase = (phrase = '') =>
  phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const errorHandler = (error, field, min = 0, max = 100) => {
  if (undefined === error[field]) return '';

  switch (error[field].type) {
    case 'required':
      return 'Please, fill the field';
    case 'min':
      return `Value must be more than ${min}`;
    case 'max':
      return `Value must be less than ${max}`;
    default:
      return 'Validation error!';
  }
};

export const getMinimalActiveBlockHeight = async () => {
  try {
    const latestBlock = await fetchBlockNumber('latest');
    const blocks = 1_000_000;
    const minimalActiveBlockHeight = Math.max(0, Number(latestBlock) - Number(blocks));

    return {
      minimalActiveBlockHeight,
      lastBlockHeight: latestBlock,
    };
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return {
      minimalActiveBlockHeight: 0,
      lastBlockHeight: 'latest',
    };
  }
};

export const formatInfinityNumber = (number) => {
  if (isNaN(number) || !number) {
    return 0;
  }

  const maximumFractionDigits = 4;
  const minimumFractionDigits = 4;

  const truncated = BN(number).toFixed(maximumFractionDigits, BigNumber.ROUND_DOWN);
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits, minimumFractionDigits }).format(truncated);
};

export const fN = (number) => {
  if (number === undefined || isNaN(number) || number === null) return 0;
  const maximumFractionDigits = 4;

  const truncated = BN(number).toFixed(maximumFractionDigits, BigNumber.ROUND_DOWN);
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits }).format(truncated);
};

export const fixNumber = (number) => {
  return Number(BN(number).toFixed(4));
};

export const uintPercentToNumber = (num) => {
  if (num === undefined || num.isNaN === true) return undefined;
  if (num <= 0) return 0;
  if (num >= 10 ** 27) return 100;

  return num / 10 ** 27;
};

export const groupArrayByBlockNumber = (array) => {
  return orderBy(array, ['blockNumber'], ['desc', 'asc']);
};

export const fillArray = (length) => {
  const array = [];
  for (let i = 0; i < length; i++) {
    array[i] = i;
  }
  return array;
};

export const isAddress = (address) => {
  return window.web3.utils.isAddress(address);
};

export const uintPerSecondToPerYearNumber = (num) => {
  if (isNumber(Number(num))) {
    const perSec = uintPercentToNumber(num);
    const result = ((1 + perSec) ** (365 * 24 * 3600) - 1) * 100;
    return Number(result);
  } else {
    return null;
  }
};

export function BN (value) {
  return new BigNumber(value);
}

export const toNumber = (value) => Number(value.toString().replace(/[Q,%]/g, ''));

export const getPercentageFormat = (number) => {
  return BN('1e+25').multipliedBy(number).toFixed();
};

export const addIndex = (array) => {
  return array.map((item, idx) => ({ id: idx + 1, ...item }));
};

export const createShareText = (type, contract, id, user) => {
  const link = `${window.location.origin}`;
  switch (type) {
    case 'proposal': {
      return link + `/governance/proposal/${contract}/${id}`;
    }
    case 'auction': {
      const auctionPart = `/auction/${transformAuctionNameToAuctionType(contract)}/${id}`;
      if (contract === CONTRACTS_NAMES.liquidationAuction) {
        return link + auctionPart + '+' + user;
      } else {
        return link + auctionPart;
      }
    }
  }
};

const stringRegex = /^[äöüa-zA-Z0-9]+$/gm;
const booleanValues = ['true', 'false', 'True', 'False', 'TRUE', 'FALSE', '1', '0'];
export const unitRegex = /^[1-9]+[0-9]*$/;

export function validatePattern (value, type) {
  switch (type) {
    case ParameterType.ADDRESS: {
      return isAddress(value) ? true : 'Invalid address';
    }
    case ParameterType.BOOL: {
      return booleanValues.includes(value) ? true : 'Invalid boolean value';
    }
    case ParameterType.STRING: {
      return value.match(stringRegex) && value.length <= 70 ? true : 'Invalid string value';
    }
    case ParameterType.UINT: {
      return value.match(unitRegex) && value.length <= 70 ? true : 'Invalid uint value';
    }
  }
}

export function parameterKeyValidation (key) {
  return key.length <= 70 && key.match(keyRegex) ? true : 'Parameter key not valid';
}

export async function fetchBlockNumber (block = 'latest') {
  try {
    const blockNumber = await window?.web3?.eth.getBlock(block);
    return blockNumber.number;
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return 0;
  }
}

export function trimAddress (address) {
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
}

export const reloadPage = (timeout = 500) => {
  setTimeout(() => window.location.reload(), timeout);
};

/**
 * @template T
 * @param {T} [str]
 *
 * @returns {Capitalize<T>}
 */
export function capitalize (str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
