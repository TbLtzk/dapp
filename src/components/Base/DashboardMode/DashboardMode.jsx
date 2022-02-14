import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mode } from 'store/dashboard-mode/selectors'
import { setDashboardMode } from 'store/dashboard-mode/action-creators'
import FormSwitch from 'components/Base/Form/FormSwitch'
import { getAuctions } from 'store/auctions/action-creators'
import { AUCTIONS_TYPES } from 'constants/statuses'

export const MODE = {
  basic: 'basic',
  advanced: 'advanced'
}

function DashboardMode () {
  const dispatch = useDispatch()
  const appMode = useSelector(mode)
  const [isSwitchOn, setIsSwitchOn] = useState(appMode === MODE.advanced)

  function changeMode () {
    setIsSwitchOn(!isSwitchOn)
    if (appMode === MODE.basic) {
      dispatch(getAuctions(AUCTIONS_TYPES.all))
      dispatch(setDashboardMode(MODE.advanced))
    } else {
      dispatch(setDashboardMode(MODE.basic))
    }
  }

  return <FormSwitch onChange={changeMode} id="mode-switcher" checked={isSwitchOn} label="Advanced mode" />
}

export default DashboardMode

export function SidebarTg ({ openSidebar, setOpenSidebar }) {
  function changeMode () {
    if (openSidebar) {
      setOpenSidebar('')
      localStorage.setItem('sidebar-toggle', '0')
    } else {
      setOpenSidebar('0')
      localStorage.setItem('sidebar-toggle', '')
    }
  }

  return <FormSwitch onChange={changeMode} id="sidebar-switcher" checked={!openSidebar} label="Hide sidebar" />
}
