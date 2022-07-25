import { getCurrentLangInfo } from 'context/LanguageProvider/helpers';
import { format } from 'date-fns';
import { format as formatAgo } from 'timeago.js';

import { fromWei } from './balance';
import { BN } from './useful';

export function transformToPercentage (number) {
  const convertedNumber = BN(number).dividedBy('10000000000000000000000000').toFixed(6);
  return convertedNumber;
}

export function formatNumber (value, precision = 0) {
  return BN(value).decimalPlaces(precision).toFormat();
}

export function formatAsset (value, asset = '') {
  return `${formatNumber(fromWei(value), 4)} ${asset}`.trim();
}

export function formatPercent (value) {
  return `${formatNumber(value, 4)}%`;
}

export function formatFraction (value) {
  return formatPercent(transformToPercentage(value), 6);
}

export function formatFactor (value) {
  const divider = BN(10).pow(27);
  return formatNumber(BN(value).div(divider), 4);
}

export function formatDuration (value) {
  const time = {
    day: Math.floor(value / 86400),
    hour: Math.floor(value / 3600) % 24,
    minute: Math.floor(value / 60) % 60,
    second: Math.floor(value) % 60,
  };

  return Object.entries(time)
    .filter(([_, val]) => val !== 0)
    .map(([key, val]) => `${val} ${key}${val > 1 ? 's' : ''}`)
    .join(', ');
}

export const formatDate = (value, locale = 'en-GB', pattern = 'PPpp') => {
  try {
    const date = new Date(value);
    if (!date || date.getTime() === 0) return '–';

    const { localization } = getCurrentLangInfo(locale);
    return format(date, pattern, { locale: localization });
  } catch (error) {
    console.error(error);
    return '–';
  }
};

export function formatDateRelative (value, locale = 'en-GB') {
  const date = new Date(value);
  if (!date) return '–';
  return formatAgo(date, locale);
}
