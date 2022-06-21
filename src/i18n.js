import { createContext, useCallback, useContext } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';

import { de, en, ua } from './locales';

const resources = {
  en: {
    translation: en,
  },
  ua: {
    translation: ua,
  },
  de: {
    translation: de,
  },
};

const LanguageContext = createContext();
const LanguageContextProvider = LanguageContext.Provider;
// https://flagicons.lipis.dev

function LanguageProvider ({ children }) {
  const languages = [
    { lang: 'en', title: 'English', img: 'flags/en.svg' },
    { lang: 'de', title: 'Deutsch', img: 'flags/de.svg' },
    { lang: 'ua', title: 'Українська', img: 'flags/ua.svg' },
  ];

  i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });

  const changeLang = useCallback((lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.setAttribute('lang', lang);
  }, []);

  return (
    <LanguageContextProvider value={{ languages, changeLang }}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </LanguageContextProvider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
export default LanguageProvider;
