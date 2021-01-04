import * as actionTypes from '../actions/action-types/validation-reward-pools';

const initialState = {
  lastUpdate: 0,
  loadCounter: 0,
  error: '',

  balance: 0,
};

export default function index(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_VRP_DATA_IS_LOADING:
      return {
        ...state,
        loadCounter: state.loadCounter + 1,
      };
    case actionTypes.SET_VRP_DATA_IS_LOADED:
      return {
        ...state,
        lastUpdate: Date.now(),
        loadCounter: state.loadCounter - 1,
      };
    case actionTypes.SET_VRP_ERROR:
      return {
        ...state,
        lastUpdate: Date.now(),
        loadCounter: state.loadCounter - 1,
        error: action.error,
      };
    case actionTypes.SET_VRP_BALANCE:
      return {
        ...state,
        balance: action.payload,
      };
    default:
      return {
        ...state,
        lastUpdate: Date.now(),
      };
  }
}
