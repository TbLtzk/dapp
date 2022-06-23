import { useRef } from 'react';

import useOnClickOutside from 'hooks/useOnClickOutside';

import LanguageSwitcher from '../LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher';

function SettingsMenu ({ onClose, onLanguageOpen }) {
  const ref = useRef();

  useOnClickOutside(ref, () => onClose());

  return (
    <div ref={ref}>
      <div className="popup_title">
        <h5>Settings</h5> <i className="mdi mdi-close" onClick={onClose} />
      </div>
      <div style={{ borderBottom: '1px solid' }} />
      <div className="popup_menu">
        <LanguageSwitcher onLanguageOpen={onLanguageOpen} />
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default SettingsMenu;
