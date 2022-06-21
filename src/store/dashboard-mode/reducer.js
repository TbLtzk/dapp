import { MODE } from 'components/Navigations/Header/components/Settings/components/DashboardModeSwitcher/DashboardModeSwitcher';

import * as actionTypes from './action-types';

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
