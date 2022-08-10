import { getCurrentLangInfo } from 'context/LanguageProvider/helpers';
import { format } from 'date-fns';
import { format as formatAgo } from 'timeago.js';

type Timestamp = string | number;
type DateLike = string | number | Date | null;

export function unixToDate (unix: Timestamp): Date {
  return new Date(Number(unix) * 1000);
}

export function dateToUnix (value: DateLike = Date.now()): number {
  return Math.floor(Number(value) / 1000);
}

export function formatDateRelative (
  value: DateLike,
  lang: string = 'en-GB'
): string {
  if (!value) return '–';

  return new Date(value).getTime()
    ? formatAgo(value, lang)
    : '–';
}

export function formatTimeGMT (value: DateLike, lang?: string): string {
  return formatDate(value, lang, 'HH:mm OOOO');
}

export function formatDateDMY (value: DateLike, lang?: string): string {
  return formatDate(value, lang, 'dd.MM.yyyy');
}

export function formatDateGMT (value: DateLike, lang?: string): string {
  return formatDate(value, lang, 'dd.MM.yyyy HH:mm OOOO');
}

export function formatDate (
  value: DateLike,
  locale = 'en-GB',
  pattern = 'PPpp'
): string {
  if (!value) return '–';

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

export function formatDuration (value: Timestamp): string {
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
