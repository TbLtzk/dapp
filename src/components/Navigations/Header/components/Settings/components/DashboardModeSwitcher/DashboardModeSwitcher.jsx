import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Toggle from 'components/Base/Form/Toggle';

import { getAuctions } from 'store/auctions/action-creators';
import { setDashboardMode } from 'store/dashboard-mode/action-creators';
import { mode } from 'store/dashboard-mode/selectors';
import { getProposals } from 'store/voting/proposals/actions';

import { AUCTIONS_TYPES } from 'constants/statuses';

export const MODE = {
  basic: 'basic',
  advanced: 'advanced',
};

function DashboardModeSwitcher () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const appMode = useSelector(mode);
  const [isSwitchOn, setIsSwitchOn] = useState(appMode === MODE.basic);

  function changeMode () {
    setIsSwitchOn(!isSwitchOn);
    if (appMode === MODE.basic) {
      dispatch(getAuctions(AUCTIONS_TYPES.all));
      dispatch(getProposals('q'));
      dispatch(getProposals('rootNode'));
      dispatch(getProposals('expert'));
      dispatch(getProposals('slashing'));
      dispatch(getProposals('contractUpdate'));
      dispatch(setDashboardMode(MODE.advanced));
    } else {
      dispatch(setDashboardMode(MODE.basic));
    }
  }

  return <Toggle
    toggleSwitch={changeMode}
    label={t('ADVANCED_MODE')}
    checked={isSwitchOn}
  />;
}

export default DashboardModeSwitcher;
