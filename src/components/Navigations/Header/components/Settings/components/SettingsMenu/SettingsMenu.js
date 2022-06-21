import React, { useRef } from 'react';

import useOnClickOutside from 'hooks/useOnClickOutside';

import DashboardModeSwitcher from '../DashboardModeSwitcher/DashboardModeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher';

function SettingsMenu ({ handleClose, handleLanguageOpen }) {
  const ref = useRef();

  useOnClickOutside(ref, () => handleClose());

  return (
    <div ref={ref}>
      <div className="popup_title">
        <h5>Settings</h5> <i className="mdi mdi-close" onClick={handleClose} />
      </div>
      <div style={{ borderBottom: '1px solid' }} />
      <div className="popup_menu">
        <LanguageSwitcher handleLanguageOpen={handleLanguageOpen} />
        <ThemeSwitcher />
        <DashboardModeSwitcher />
      </div>
    </div>
  );
}

export default SettingsMenu;
