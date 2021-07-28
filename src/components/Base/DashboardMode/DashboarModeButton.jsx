import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Buttons/Button'
import { mode } from 'store/selectors/dashboardMode'
import { setDashboardMode } from 'store/actions/action-creaters/dashboardMode'

export const MODE = {
  basic: 'basic',
  advanced: 'advanced'
}

function DashboardModeButton () {
  const dispatch = useDispatch()
  const appMode = useSelector(mode)

  function changeMode () {
    if (appMode === MODE.basic) {
      dispatch(setDashboardMode(MODE.advanced))
    } else {
      dispatch(setDashboardMode(MODE.basic))
    }
  }
  return (
        <Button
            title={`${appMode === MODE.basic ? MODE.advanced : MODE.basic} mode`}
            type='button'
            width='140px'
            margin='0 20px 0 0'
            handleButton={changeMode}
        />
  )
};

export default DashboardModeButton
