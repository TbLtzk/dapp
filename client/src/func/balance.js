import { BN } from './useful'

export function fromBtcBlockchain(value) {
  return BN(value)
    .dividedBy(1e+8)
    .toFixed();
}

export function toBtcBlockchain(value) {
  return BN(value)
    .multipliedBy(1e+8)
    .toFixed();
}

export function percentageToPercentPerSecond(number) {
  if (number) {
    const first = number / 100;
    const second = (1 + first) ** (1 / (3600 * 24 * 365)) - 1;
    const third = BN(String(second * (10 ** 27)));
    return third.toFixed();
  } else {
    return 0;
  }
}

export function toWei(value) {
  const amount = BN(value);
  const a = BN(10 ** 18);
  return amount.multipliedBy(a)
    .toFixed();
}

export function fromWei(value) {
  const amount = BN(value);
  const a = BN(10 ** 18);
  return amount.dividedBy(a)
    .toFixed();
}
