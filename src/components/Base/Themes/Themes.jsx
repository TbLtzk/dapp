import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Switch from '../Form/Switch';

import { setTheme } from 'store/theme/action-creators';
import { theme } from 'store/theme/selectors';

import { THEMES } from 'constants/colors';

function Themes () {
  const dispatch = useDispatch();
  const currentTheme = useSelector(theme);

  function changeTheme () {
    const newTheme = currentTheme === THEMES.light ? THEMES.dark : THEMES.light;
    dispatch(setTheme(newTheme));
  }

  return (
    <Switch
      id="theme-switcher"
      checked={currentTheme === THEMES.dark}
      label="Dark theme"
      onChange={changeTheme}
    />
  );
}

export default Themes;
