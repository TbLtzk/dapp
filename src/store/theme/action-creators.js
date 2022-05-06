import * as actionTypes from './action-types'

export const setTheme = (theme) => ({
  type: actionTypes.CHANGE_THEME,
  result: theme
})
