import * as actionTypes from '../actions/action-types/q-piggy-bank';

const initialState = {
  lastUpdate: 0,
  isLoading: false,
  error: '',
  userBalance: 0,
  votingWeight: 0,
  votingLockingEnd: 0,
  deposit: 0,

  delegationList: [],
  loadingDelegationList: false,
  errorDelegationList: null,
};

export default function qPiggyBank(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PB_DATA_IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.SET_PB_ERROR:
      return {
        ...state,
        lastUpdate: Date.now(),
        isLoading: false,
        error: action.error
      };
    default:
      let newState = {
        ...state,
        lastUpdate: Date.now(),
        isLoading: false,
        error: '',
      };
      switch (action.type) {
        case actionTypes.SET_PB_USER_BALANCE:
          return {
            ...newState,
            userBalance: action.payload,
          };
        case actionTypes.SET_PB_LOCKED_ASSETS:
          return {
            ...newState,
            votingWeight: action.votingWeight,
            votingLockingEnd: action.votingLockingEnd,
          };
        case actionTypes.GET_DELEGATIONS_LIST:
          return {
            ...state,
            loadingDelegationList: true,
          };
        case actionTypes.GET_DELEGATIONS_LIST_SUCCESS:
          return {
            ...state,
            loadingDelegationList: false,
            delegationList: action.result,
            errorDelegationList: null,
          };
        case actionTypes.GET_DELEGATIONS_LIST_ERROR:
          return {
            ...state,
            loadingDelegationList: false,
            delegationList: [],
            errorDelegationList: action.result,
          };
        default:
          return state;
      }
  }
}
