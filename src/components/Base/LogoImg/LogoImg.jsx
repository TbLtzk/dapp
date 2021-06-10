import React from 'react';

import logo from 'assets/img/logo.png';
import { useSelector } from 'react-redux';
import { theme } from 'store/selectors/theme';
import { THEMES } from 'constants/colors';

function LogoImg() {
  const currentTheme = useSelector(theme);
  return (
    <img
      style={{ filter: currentTheme === THEMES.dark ? 'brightness(100)' : null }}
      alt="logo"
      src={logo}
      className="d-inline-block align-top"
    />
  );
}

export default LogoImg;

