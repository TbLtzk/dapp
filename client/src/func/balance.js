import { drizzleRegistry, web3 } from '../contracts/config/drizzle-config';
import { bn } from './useful';
import { BigNumber } from 'bignumber.js';

export const fromBtcBlockchain = (btc) => {
  if (btc.isNaN === true) return 0;
  return btc / 1e+8;
};

export const toBtcBlockchain = (num) => {
  if (num.isNaN === true) return 0;
  return num * 1e+8;
};

export const toWei = (value) => {
  return drizzleRegistry.web3.utils.toWei(new web3.utils.BN(value), 'ether');
};

export const fromWei = (value) => {
  return drizzleRegistry.web3.utils.fromWei(new web3.utils.BN(value), 'ether');
};
export const BN = (value) => {
  // return new BigNumber(value);
  return new web3.utils.BN(value);
};

export const percentageToPercentPerSecond = (number) => {
  if (number) {
    const first = number / 100;
    const second = (1 + first) ** (1 / (3600 * 24 * 365)) - 1;
    const third = BN(String(second * (10 ** 27)));
    console.log('percentageToPercentPerSecond', third);
    console.log('percentageToPercentPerSecond', third.toString());
    return third;
  } else {
    return 0;
  }
};
