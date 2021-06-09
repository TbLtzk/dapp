import * as actionTypes from '../actions/action-types/theme';
import { THEMES } from 'constants/colors';

const initialState = {
  currentTheme: THEMES.dark,
};

export default function systemReserve(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_THEME:
      localStorage['theme-mode'] = action.result;
      return {
        ...state,
        currentTheme: action.result,
      };
    default:
      return state;
  }
}
