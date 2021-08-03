import React from 'react'
import { GlobalStyle } from 'constants/globalStyle'
import { ThemeProvider } from 'styled-components'
import themeStyles from 'constants/style'
import { darkColors, lightColors, THEMES } from 'constants/colors'

// It's a crutch. Due to the prevailing architecture, the store is not
// available on the project from the beginning of the application and
// this is an option for components with a theme without a store.
function StartConfigurationStyleLayout ({ children }) {
  function getColors (theme) {
    let generalColors = {}
    switch (theme) {
      case THEMES.light:
        generalColors = lightColors
        break
      case THEMES.dark:
        generalColors = darkColors
        break
      default:
        generalColors = darkColors
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
      colors: getColors(localStorage['theme-mode'] || THEMES.dark)
    }
  }
  >
    <GlobalStyle/>
    {children}
  </ThemeProvider>
}

export default StartConfigurationStyleLayout
