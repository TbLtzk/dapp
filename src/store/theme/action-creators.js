import * as actionTypes from './action-types'

export const setThem = (theme) => ({
  type: actionTypes.CHANGE_THEME,
  result: theme
})
