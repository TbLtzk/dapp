import React, { useEffect } from 'react'
import { GlobalStyle } from 'constants/globalStyle'
import { ThemeProvider } from 'styled-components'
import themeStyles from 'constants/style'
import { darkColors, lightColors, THEMES } from 'constants/colors'
import { theme } from 'store/theme/selectors'
import { setThem } from 'store/theme/action-creators'

import { useDispatch, useSelector } from 'react-redux'

function StyleLayout ({ children }) {
  const dispatch = useDispatch()
  const currentTheme = useSelector(theme)

  useEffect(() => {
    switch (localStorage['theme-mode']) {
      case THEMES.light:
      case THEMES.dark:
        dispatch(setThem(localStorage['theme-mode'] || THEMES.dark))
        break
      default:
        dispatch(setThem(THEMES.dark))
    }
  }, [])

  function getColors (theme) {
    let generalColors = {}
    switch (theme) {
      case THEMES.light:
        generalColors = lightColors
        break
      case THEMES.dark:
        generalColors = darkColors
        break
    }
    return {
      ...generalColors,
      links: generalColors.white,
      activeLinks: generalColors.neonGreen,
      main: generalColors.oxfordBlue,
      circleDark: generalColors.oxfordBlueTint2,
      circleWhite: generalColors.white,
      blue: generalColors.oxfordBlue,
      grey: generalColors.oxfordBlueTint3,
      error: generalColors.validationError,
      th: generalColors.oxfordBlueTint3,
      td: generalColors.white,
      darkText: generalColors.oxfordBlue
    }
  }

  return <ThemeProvider theme={
    {
      ...themeStyles,
      colors: getColors(currentTheme)
    }
  }
  >
    <GlobalStyle/>
    {children}
  </ThemeProvider>
}

export default StyleLayout
