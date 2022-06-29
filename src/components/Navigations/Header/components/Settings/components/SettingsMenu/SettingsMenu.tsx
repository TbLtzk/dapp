import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useLanguage } from 'i18n';
import { THEMES } from 'styles/colors';
import Switch from 'ui/Switch';

import { SettingsMenuContainer } from './styles';

import { setTheme } from 'store/theme/action-creators';
import { theme } from 'store/theme/selectors';

function LanguageSwitcher ({ onLanguageOpen }: { onLanguageOpen: () => void }) {
  const dispatch = useDispatch();
  const currentTheme = useSelector(theme);

  const { i18n, t } = useTranslation();
  const { languages } = useLanguage();
  const language = languages.find(({ lang }) => lang === i18n.language) || languages[0];

  function changeTheme () {
    const newTheme = currentTheme === THEMES.light
      ? THEMES.dark
      : THEMES.light;
    dispatch(setTheme(newTheme));
  }

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

          <p className="text-md font-bold">
            {language.title}
          </p>
        </div>
      </div>

      <Switch
        className="theme-toggle"
        label={t('DARK_THEME')}
        value={currentTheme === THEMES.dark}
        onChange={changeTheme}
      />
    </SettingsMenuContainer>
  );
}

export default LanguageSwitcher;
