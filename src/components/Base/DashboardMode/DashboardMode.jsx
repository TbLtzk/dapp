import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Switch from 'components/Base/Form/Switch';

import { getAuctions } from 'store/auctions/action-creators';
import { setDashboardMode } from 'store/dashboard-mode/action-creators';
import { mode } from 'store/dashboard-mode/selectors';
import { getProposals } from 'store/voting/proposals/actions';

import { AUCTIONS_TYPES } from 'constants/statuses';

export const MODE = {
  basic: 'basic',
  advanced: 'advanced'
};

function DashboardMode () {
  const dispatch = useDispatch();
  const appMode = useSelector(mode);
  const [isSwitchOn, setIsSwitchOn] = useState(appMode === MODE.advanced);

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

  return <Switch
    id="mode-switcher"
    checked={isSwitchOn}
    label="Advanced mode"
    onChange={changeMode}
  />;
}

export default DashboardMode;
