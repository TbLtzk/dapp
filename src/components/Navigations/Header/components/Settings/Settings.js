import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Button from 'components/Base/Button';

import Languages from './components/Languages';
import SettingsMenu from './components/SettingsMenu';
import { SettingsContainer } from './styles';

const POPUP = {
  settings: 'settings',
  language: 'language',
};

const variants = {
  initial: { scale: 0.3, opacity: 0, right: 0, top: 40, position: 'absolute', zIndex: 10 },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
  },
};

function Settings () {
  const [openKey, setOpenKey] = useState('');

  const handleSettingsOpen = () => {
    setOpenKey(POPUP.settings);
  };

  const handleLanguageOpen = () => {
    setOpenKey(POPUP.language);
  };

  const handleClose = () => {
    setOpenKey('');
  };

  const handleBack = () => {
    setOpenKey(POPUP.settings);
  };

  return (
    <SettingsContainer>
      <Button
        alwaysEnabled
        style={{ fontSize: '20px', marginLeft: '20px' }}
        onClick={handleSettingsOpen}
      >
        <i className="mdi mdi-cog-outline" />
      </Button>

      <AnimatePresence>
        <motion.div
          key={openKey}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {openKey === POPUP.settings && (
            <div className="popup_container">
              <SettingsMenu onClose={handleClose} onLanguageOpen={handleLanguageOpen} />
            </div>
          )}
          {openKey === POPUP.language && (
            <div className="popup_container">
              <Languages onClose={handleClose} onBack={handleBack} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </SettingsContainer>
  );
}

export default Settings;
