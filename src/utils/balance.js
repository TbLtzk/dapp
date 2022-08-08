import { BN } from './useful';

export function fromBtcBlockchain (value) {
  return BN(value).dividedBy(1e8).toFixed();
}

export function toWei (value) {
  const amount = BN(value);
  const a = BN(10 ** 18);
  return amount.multipliedBy(a).toFixed();
}

export function fromWei (value) {
  if (isNaN(Number(value))) return '0';

  const amount = BN(value);
  const a = BN(10 ** 18);
  return Number(amount.dividedBy(a).toFixed());
}

export function subtractAmount (value = 0, value2 = 0) {
  const result = BN(toWei(value)).minus(toWei(value2)).toFixed();
  return fromWei(result);
}
