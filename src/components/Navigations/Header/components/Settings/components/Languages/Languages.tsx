import { useTranslation } from 'react-i18next';

import { useLanguage } from 'i18n';
import Icon from 'ui/Icon';

import { LanguagesContainer } from './styles';

function Languages ({ onBack }: { onBack: () => void }) {
  const { languages, changeLang } = useLanguage();
  const { i18n } = useTranslation();

  const changeLanguage = (val: string) => {
    changeLang(val);
    onBack();
  };

  return (
    <LanguagesContainer>
      {languages.map(({ lang, title, src }) => (
        <div
          key={lang}
          className="language-option"
          onClick={() => changeLanguage(lang)}
        >
          <Icon
            name="check"
            className="language-option__check"
            style={{ opacity: lang === i18n.language ? 1 : 0 }}
          />

          <div className="language-option__main">
            <img
              className="language-option__flag"
              src={src}
              alt="lang"
            />

            <p
              className="typo-p-md"
              style={{ fontWeight: lang === i18n.language ? 600 : 400 }}
            >
              {title}
            </p>
          </div>
        </div>
      ))}
    </LanguagesContainer>
  );
}

export default Languages;
