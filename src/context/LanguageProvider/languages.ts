// Icons: https://flagicons.lipis.dev

import datePickerEn from 'date-fns/locale/en-GB';
import datePickerUk from 'date-fns/locale/uk';

import en from '../../locales/en-GB.json';
import uk from '../../locales/uk-UA.json';

export const EN = { locale: 'en-GB', language: 'English', code: 'en', flagSrc: '/flags/en.svg', localization: datePickerEn };
export const UK = { locale: 'uk-UA', language: 'Українська', code: 'uk', flagSrc: '/flags/ua.svg', localization: datePickerUk };

export const languages = {
  'en-GB': { translation: en },
  'uk-UA': { translation: uk },
};

export const languageCodeList = Object.keys(languages);
export const languageList = [EN, UK];
