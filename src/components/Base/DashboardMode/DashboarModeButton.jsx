import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mode } from 'store/selectors/dashboardMode';
import { setDashboardMode } from 'store/actions/action-creaters/dashboardMode';
import FormSwithch from 'components/Base/Form/FormSwithch';

export const MODE = {
  basic: 'basic',
  advanced: 'advanced'
};

function DashboardModeButton() {
  const dispatch = useDispatch();
  const appMode = useSelector(mode);
  const [isSwitchOn, setIsSwitchOn] = useState(appMode === MODE.advanced);

  function changeMode() {
    setIsSwitchOn(!isSwitchOn);
    if (appMode === MODE.basic) {
      dispatch(setDashboardMode(MODE.advanced));
    } else {
      dispatch(setDashboardMode(MODE.basic));
    }
  }

  return (
    <FormSwithch
      onChange={changeMode}
      id="mode-switcher"
      checked={isSwitchOn}
      label="Advanced mode"
    />
  );
};

export default DashboardModeButton;
