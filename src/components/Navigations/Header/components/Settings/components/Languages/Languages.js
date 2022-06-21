import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useLanguage } from 'i18n';

import useOnClickOutside from 'hooks/useOnClickOutside';

function Languages ({ onClose, onBack }) {
  const ref = useRef();

  const { languages, changeLang } = useLanguage();
  const { i18n } = useTranslation();

  useOnClickOutside(ref, () => onClose());

  return (
    <div ref={ref}>
      <div className="popup_title" >
        <h6>
          <i className="mdi mdi-chevron-left" onClick={onBack}/>
          Choose language
        </h6>
        <i className="mdi mdi-close" onClick={onClose} />
      </div>
      <div style={{ borderBottom: '1px solid' }} />

      <div className="popup_menu">
        {languages.map(({ lang, title, img }) => (
          <div
            key={lang}
            className="language_container"
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
