import * as actionTypes from './action-types';

const initialState = {
  isAliasesLoading: false,
  isEventsLoading: false,
  aliases: [],
  events: [],
};

export default function index (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ALIASES:
      return {
        ...state,
        aliases: action.payload,
      };

    case actionTypes.SET_ALIASES_LOADING:
      return {
        ...state,
        isAliasesLoading: action.payload,
      };

    case actionTypes.SET_ALIAS_EVENTS:
      return {
        ...state,
        events: action.payload,
      };

    case actionTypes.SET_EVENTS_LOADING:
      return {
        ...state,
        isEventsLoading: action.payload,
      };

    default:
      return state;
  }
}
