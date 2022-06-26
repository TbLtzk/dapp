import { useRef } from 'react';

import Button from 'components/Base/Button';

import useOnClickOutside from 'hooks/useOnClickOutside';
import { useWeb3Context } from 'hooks/useWeb3Context';

import LanguageSwitcher from '../LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher';

function SettingsMenu ({ onClose, onLanguageOpen }) {
  const { disconnectWallet } = useWeb3Context();

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
        <Button
          alwaysEnabled
          style={{ width: '300px', margin: '10px' }}
          onClick={disconnectWallet}
        >
          Disconnect Wallet
        </Button>
      </div>
    </div>
  );
}

export default SettingsMenu;
