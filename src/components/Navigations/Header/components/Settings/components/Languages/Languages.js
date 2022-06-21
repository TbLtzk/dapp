import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useLangauge } from 'i18n';

import useOnClickOutside from 'hooks/useOnClickOutside';

function Languages ({ handleClose, handleBack }) {
  const ref = useRef();

  const { languages, changeLang } = useLangauge();
  const { i18n } = useTranslation();

  useOnClickOutside(ref, () => handleClose());

  return (
    <div ref={ref}>
      <div className="popup_title" >
        <h6>
          <i className="mdi mdi-chevron-left" onClick={handleBack}/>
          Choose language
        </h6>
        <i className="mdi mdi-close" onClick={handleClose} />
      </div>
      <div style={{ borderBottom: '1px solid' }} />

      <div className="popup_menu">
        {languages.map(({ lang, title, img }) => (
          <div
            key={lang}
            className="langauge_container"
            onClick={() => changeLang(lang)}
          >
            <div className="language">
              <div>
                <img src={img} alt="lang" />
              </div>

              <h6>{title}</h6>
            </div>

            {lang === i18n.language && <i className="mdi mdi-check" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Languages;
