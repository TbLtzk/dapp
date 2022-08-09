import { BigNumber } from 'bignumber.js';
import { isNumber } from 'lodash';

export function calculateInterestRate (value: number): number {
  if (!isNumber(value) || isNaN(value)) return 0;

  const SECONDS_IN_YEAR = 365 * 24 * 60 * 60;
  const ratePerSecond = value >= 10 ** 27
    ? 100
    : Math.max(value / (10 ** 27), 0);

  return ((1 + ratePerSecond) ** SECONDS_IN_YEAR - 1) * 100;
};

export function BN (value: BigNumber.Value): BigNumber {
  return new BigNumber(value);
}

export function parseNumber (value: string): number {
  return Number(value.toString().replace(/[Q,%]/g, ''));
};

export function getFixedPercentage (value: BigNumber.Value) {
  return BN('1e+25').multipliedBy(value).toFixed();
};

export function transformToPercentage (value: string | number): string {
  return new BigNumber(value)
    .dividedBy('10000000000000000000000000')
    .toFixed(6);
}
