import { BigNumber } from 'bignumber.js';
import isNumber from 'lodash/isNumber';

export function toBigNumber (value: BigNumber.Value): BigNumber {
  return new BigNumber(value);
}

export function parseNumber (value: string): number {
  return Number(value.toString().replace(/[Q,%]/g, ''));
}

export function formatNumber (value: BigNumber.Value, precision = 4): string {
  return new BigNumber(value).decimalPlaces(precision, BigNumber.ROUND_DOWN).toFormat();
}

export function formatNumberFixed (value: BigNumber.Value, precision = 4): string {
  return new BigNumber(value).toFormat(precision);
}

export function formatNumberCompact (value: BigNumber.Value, precision = 4): string {
  const rounded = new BigNumber(value).decimalPlaces(precision, BigNumber.ROUND_DOWN);

  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: precision,
  }).format(Number(rounded));
}

export function formatAsset (value: BigNumber.Value, asset = ''): string {
  return `${formatNumber(value)} ${asset}`.trim();
}

export function getFixedPercentage (value: BigNumber.Value) {
  return toBigNumber('1e+25').multipliedBy(value).toFixed();
}

export function transformToPercentage (value: BigNumber.Value): string {
  return new BigNumber(value).dividedBy('10000000000000000000000000').toFixed(6);
}

export function formatPercent (value: BigNumber.Value, precision?: number): string {
  return isNaN(Number(value.toString())) ? '0 %' : `${formatNumber(value, precision)} %`;
}

export function formatFraction (value: BigNumber.Value): string {
  return formatPercent(transformToPercentage(value));
}

export function formatFactor (value: BigNumber.Value): string {
  const divider = new BigNumber(10).pow(27);
  return formatNumber(new BigNumber(value).div(divider).toString());
}

export function calculateInterestRate (value: number): number {
  if (!isNumber(value) || isNaN(value)) return 0;

  const SECONDS_IN_YEAR = 365 * 24 * 60 * 60;
  const MAX_INTEREST = 10 ** 27;

  const ratePerSecond = value >= MAX_INTEREST ? 100 : Math.max(value / MAX_INTEREST, 0);

  return ((1 + ratePerSecond) ** SECONDS_IN_YEAR - 1) * 100;
}
