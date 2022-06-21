import React from 'react';
import { useTranslation } from 'react-i18next';

import { useLangauge } from 'i18n';

function LanguageSwitcher ({ handleLanguageOpen }) {
  const { i18n } = useTranslation();
  const { languages } = useLangauge();
  const language = languages?.find(({ lang }) => lang === i18n.language);

  return (
    <div className="langauge_container" onClick={handleLanguageOpen}>
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
