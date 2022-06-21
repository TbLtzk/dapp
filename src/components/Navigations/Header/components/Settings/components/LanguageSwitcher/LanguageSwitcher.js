import React from 'react';
import { useTranslation } from 'react-i18next';

import { useLanguage } from 'i18n';

function LanguageSwitcher ({ onLanguageOpen }) {
  const { i18n } = useTranslation();
  const { languages } = useLanguage();
  const language = languages?.find(({ lang }) => lang === i18n.language);

  return (
    <div className="language_container" onClick={onLanguageOpen}>
      <div>Language:</div>

      <div className="language">
        <div>
          <img src={language.img} alt="flag" />
        </div>
        <h6>{language.title}</h6>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
