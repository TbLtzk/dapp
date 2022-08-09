import BigNumber from 'bignumber.js';
import { getCurrentLangInfo } from 'context/LanguageProvider/helpers';
import { format } from 'date-fns';
import { format as formatAgo } from 'timeago.js';

import { transformToPercentage } from './numbers';

export function formatNumber (value: string | number, precision = 4): string {
  return new BigNumber(value)
    .decimalPlaces(precision, BigNumber.ROUND_DOWN)
    .toFormat();
}

export function formatNumberFixed (value: string | number, precision = 4): string {
  return new BigNumber(value).toFormat(precision);
}

export function formatNumberCompact (value: string | number, precision = 4): string {
  const rounded = new BigNumber(value).decimalPlaces(precision, BigNumber.ROUND_DOWN);

  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: precision
  }).format(Number(rounded));
}

export function formatAsset (value: string | number, asset = ''): string {
  return `${formatNumber(value, 4)} ${asset}`.trim();
}

export function formatPercent (value: string | number): string {
  return `${formatNumber(value, 4)}%`;
}

export function formatFraction (value: string | number): string {
  return formatPercent(transformToPercentage(value));
}

export function formatFactor (value: string | number): string {
  const divider = new BigNumber(10).pow(27);
  return formatNumber(new BigNumber(value).div(divider).toString(), 4);
}

export function formatDuration (value: string | number): string {
  const duration = Number(value);
  const time = {
    day: Math.floor(duration / 86_400),
    hour: Math.floor(duration / 3600) % 24,
    minute: Math.floor(duration / 60) % 60,
    second: Math.floor(duration) % 60,
  };

  return Object.entries(time)
    .filter(([_, val]) => val !== 0)
    .map(([key, val]) => `${val} ${key}${val > 1 ? 's' : ''}`)
    .join(', ');
}

export function formatDate (
  value: string | number | Date,
  locale = 'en-GB',
  pattern = 'PPpp'
): string {
  try {
    const date = new Date(value);
    if (!date.getTime()) return '–';

    const { localization } = getCurrentLangInfo(locale);
    return format(date, pattern, { locale: localization });
  } catch (error) {
    console.error(error);
    return '–';
  }
};

export function formatDateRelative (
  value: string | number | Date,
  locale = 'en-GB'
): string {
  const date = new Date(value);
  if (!date) return '–';
  return formatAgo(date, locale);
}
