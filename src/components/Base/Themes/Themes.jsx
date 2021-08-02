import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setThem } from 'store/actions/action-creaters/theme'
import { THEMES } from 'constants/colors'
import { theme } from 'store/selectors/theme'
import FormSwithch from '../Form/FormSwithch'

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

  return (
    <FormSwithch
      onChange={changeThemes}
      id="theme-switcher"
      checked={isSwitchOn}
      label="Dark them"
    />
  )
}

export default Themes
