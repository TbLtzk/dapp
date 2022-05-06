import React from 'react';
import { useSelector } from 'react-redux';

import logo from 'assets/img/logo.png';

import { theme } from 'store/theme/selectors';

import { THEMES } from 'constants/colors';

function LogoImg () {
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
