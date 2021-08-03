import * as actionTypes from '../action-types/theme'

export const setThem = (theme) => ({
  type: actionTypes.CHANGE_THEME,
  result: theme
})
