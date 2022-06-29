import { useState } from 'react';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import Languages from './components/Languages';
import SettingsMenu from './components/SettingsMenu';
import { SettingsDropdown } from './styles';

function Settings () {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const handleSettingsToggle = (val: boolean) => {
    setSettingsOpen(val);
    if (!val) return;

    setLanguageOpen(false);
  };

  return (
    <SettingsDropdown
      right
      open={settingsOpen}
      trigger={(
        <Button
          alwaysEnabled
          icon
          look="secondary"
          active={settingsOpen}
        >
          <Icon name="settings" />
        </Button>
      )}
      onToggle={handleSettingsToggle}
    >
      <div className="settings-content">
        <h3 className="settings-title text-xl font-semibold">
          {languageOpen ? 'Language' : 'Settings'}
        </h3>

        <div className="settings-main">
          {languageOpen
            ? <Languages onBack={() => setLanguageOpen(false)} />
            : <SettingsMenu onLanguageOpen={() => setLanguageOpen(true)} />
          }
        </div>
      </div>
    </SettingsDropdown>
  );
}

export default Settings;
