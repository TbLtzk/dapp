import * as actionTypes from '../actions/action-types/membership';

const initialState = {
  isUserEPQFIMembership: false,
  isUserEPDRMembership: false,
};

export default function membership(state = initialState, action) {
  switch (action.type) {
    case actionTypes.IS_USER_EPQFI_MEMBER_SUCCESS:
      return {
        ...state,
        isUserEPQFIMembership: action.result,
      };
    case actionTypes.IS_USER_EPDR_MEMBER_SUCCESS:
      return {
        ...state,
        isUserEPDRMembership: action.result,
      };
    default:
      return state;
  }
}
