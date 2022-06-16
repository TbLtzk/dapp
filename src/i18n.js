import React, { createContext, useCallback, useContext } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';

import { en, ua } from './translations';

const resources = {
  en: {
    translation: en,
  },
  ua: {
    translation: ua,
  },
};

const LanguageContext = createContext();
const LanguageContextProvider = LanguageContext.Provider;

function LanguageProvider ({ children }) {
  const languages = [
    { lang: 'en', title: 'English' },
    { lang: 'ua', title: 'Українська' },
  ];

  i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ua',
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
      <I18nextProvider values={{ data: 'data' }} i18n={i18n}>
        {children}
      </I18nextProvider>
    </LanguageContextProvider>
  );
}

export const useLangauge = () => useContext(LanguageContext);
export default LanguageProvider;
