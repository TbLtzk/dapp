import { BigNumber } from 'bignumber.js';

export const fromBtcBlockchain = (btc) => {
  if (btc.isNaN === true) return 0;
  return btc / 1e+8;
};

export const toBtcBlockchain = (num) => {
  if (num.isNaN === true) return 0;
  return num * 1e+8;
};

export const percentageToPercentPerSecond = (number) => {
  if (number) {
    const a = BN(3600 * 24 * 365)
    const b = BN(10 ** 27)
    const c = BN(1)
    const numberBn = BN(number)
    const first = numberBn.multipliedBy(100);
    const second = first.plus(1).pow(c.dividedBy(a)).minus(1)
    return second.multipliedBy(b).toFixed();
  } else {
    return 0;
  }
};

export const percentageToPercentPerSecond2 = (number) => {
  if (number) {
    const a = BN(3600 * 24 * 365)
    const b = BN(10 ** 27)
    const c = BN(1)
    const numberBn = BN(number)
    const first = numberBn.multipliedBy(100);
    const second = first.plus(1).pow(c.dividedBy(a)).minus(1)
    return second.multipliedBy(b).toFixed();
  } else {
    return 0;
  }
};

export const BN = (value) => {
  return new BigNumber(value);
  // return new web3.utils.BN(value);
};

export function toWei(value) {
  const amount = BN(value)
  const a = BN(10 ** 18 )
  return amount.multipliedBy(a).toFixed()
}

export const fromWei = (value) => {
  const amount = BN(value)
  const a = BN(10 ** 18 )
  return amount.dividedBy(a).toFixed()
};
