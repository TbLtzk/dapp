import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setThem } from 'store/theme/action-creators'
import { THEMES } from 'constants/colors'
import { theme } from 'store/theme/selectors'
import FormSwitch from '../Form/FormSwitch'

function Themes () {
  const dispatch = useDispatch()
  const currentTheme = useSelector(theme)
  const [isSwitchOn, setIsSwitchOn] = useState(currentTheme === THEMES.dark)

  function changeThemes () {
    setIsSwitchOn(!isSwitchOn)
    if (currentTheme === THEMES.light) {
      dispatch(setThem(THEMES.dark))
    } else {
      dispatch(setThem(THEMES.light))
    }
  }

  return <FormSwitch onChange={changeThemes} id="theme-switcher" checked={isSwitchOn} label="Dark theme" />
}

export default Themes
