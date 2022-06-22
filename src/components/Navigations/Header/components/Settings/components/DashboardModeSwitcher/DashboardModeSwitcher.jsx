import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Toggle from 'components/Base/Form/Toggle';

import { mode } from 'store/dashboard-mode/selectors';

export const MODE = {
  basic: 'basic',
  advanced: 'advanced',
};

function DashboardModeSwitcher () {
  const { t } = useTranslation();
  const appMode = useSelector(mode);
  const [isSwitchOn, setIsSwitchOn] = useState(appMode === MODE.basic);

  function changeMode () {
    setIsSwitchOn(!isSwitchOn);
  }

  return <Toggle
    toggleSwitch={changeMode}
    label={t('ADVANCED_MODE')}
    checked={isSwitchOn}
  />;
}

export default DashboardModeSwitcher;
