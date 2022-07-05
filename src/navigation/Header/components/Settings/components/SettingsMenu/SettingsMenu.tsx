import { useTranslation } from 'react-i18next';

import { useLanguage } from 'i18n';
import { useTheme } from 'styled-components';
import Switch from 'ui/Switch';

import { SettingsMenuContainer } from './styles';

function LanguageSwitcher ({ onLanguageOpen }: { onLanguageOpen: () => void }) {
  const { isDarkTheme, onChangeTheme } = useTheme();

  const { i18n, t } = useTranslation();
  const { languages } = useLanguage();
  const language = languages.find(({ lang }) => lang === i18n.language) || languages[0];

  return (
    <SettingsMenuContainer>
      <div className="language-block" onClick={onLanguageOpen}>
        <p className="text-lg">Language</p>

        <div className="language-pick">
          <img
            className="language-pick__flag"
            src={language.src}
            alt="flag"
          />

          <p className="text-md font-semibold">
            {language.title}
          </p>
        </div>
      </div>

      <Switch
        className="theme-toggle"
        label={t('DARK_THEME')}
        value={isDarkTheme}
        onChange={onChangeTheme}
      />
    </SettingsMenuContainer>
  );
}

export default LanguageSwitcher;
