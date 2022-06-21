import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Toggle from 'components/Base/Form/Toggle';

import { setTheme } from 'store/theme/action-creators';
import { theme } from 'store/theme/selectors';

import { THEMES } from 'constants/colors';

function ThemeSwitcher () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentTheme = useSelector(theme);

  function changeTheme () {
    const newTheme = currentTheme === THEMES.light ? THEMES.dark : THEMES.light;
    dispatch(setTheme(newTheme));
  }

  return <Toggle
    toggleSwitch={changeTheme}
    label={t('DARK_THEME')}
    checked={currentTheme === THEMES.light}
  />;
}

export default ThemeSwitcher;
