import { createContext, useCallback, useContext } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { register } from 'timeago.js';
import timeAgoDeLang from 'timeago.js/lib/lang/de';
import timeAgoEnLang from 'timeago.js/lib/lang/en_US';
import timeAgoUkLang from 'timeago.js/lib/lang/uk';

import { de, en, ua } from './locales';

register('en', timeAgoEnLang);
register('de', timeAgoDeLang);
register('uk', timeAgoUkLang);

const resources = {
  en: { translation: en },
  ua: { translation: ua },
  de: { translation: de },
};

const languages = [
  { lang: 'en', title: 'English', src: '/flags/en.svg' },
  { lang: 'de', title: 'Deutsch', src: '/flags/de.svg' },
  { lang: 'ua', title: 'Українська', src: '/flags/ua.svg' },
];

const LanguageContext = createContext({ languages, changeLang: (_) => {} });
// https://flagicons.lipis.dev

function LanguageProvider ({ children }) {
  i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      supportedLngs: ['de', 'en', 'ua'],
      interpolation: {
        escapeValue: false,
      },
    });

  const changeLang = useCallback((lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.setAttribute('lang', lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ languages, changeLang }}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
export default LanguageProvider;
