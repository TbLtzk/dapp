import * as actionTypes from './action-types';

import { MODE } from 'constants/config';

const initialState = {
  appMode: localStorage.getItem(['appMode']) || MODE.basic
};

export default function dashboardMode (state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_MODE:
      localStorage.appMode = action.result;
      return {
        ...state,
        appMode: action.result
      };
    default:
      return state;
  }
}
