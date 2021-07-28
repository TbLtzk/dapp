import * as actionTypes from '../actions/action-types/membership'

const initialState = {
  isUserEPQFIMembership: false,
  isUserEPDRMembership: false,

  EPQFI_Members: [],
  EPQFI_MembersLoading: false,
  EPQFI_MembersError: null,

  EPDR_Members: [],
  EPDR_MembersLoading: false,
  EPDR_MembersError: null
}

export default function membership (state = initialState, action) {
  switch (action.type) {
    case actionTypes.IS_USER_EPQFI_MEMBER_SUCCESS:
      return {
        ...state,
        isUserEPQFIMembership: action.result
      }
    case actionTypes.IS_USER_EPDR_MEMBER_SUCCESS:
      return {
        ...state,
        isUserEPDRMembership: action.result
      }
    case actionTypes.GET_EPQFI_MEMBERS:
      return {
        ...state,
        EPQFI_MembersLoading: true
      }
    case actionTypes.GET_EPQFI_MEMBERS_SUCCESS:
      return {
        ...state,
        EPQFI_MembersLoading: false,
        EPQFI_Members: action.result,
        EPQFI_MembersError: null
      }
    case actionTypes.GET_EPQFI_MEMBERS_ERROR:
      return {
        ...state,
        EPQFI_MembersLoading: false,
        EPQFI_Members: [],
        EPQFI_MembersError: action.result
      }

    case actionTypes.GET_EPDR_MEMBERS:
      return {
        ...state,
        EPDR_MembersLoading: true
      }
    case actionTypes.GET_EPDR_MEMBERS_SUCCESS:
      return {
        ...state,
        EPDR_MembersLoading: false,
        EPDR_Members: action.result,
        EPDR_MembersError: null
      }
    case actionTypes.GET_EPDR_MEMBERS_ERROR:
      return {
        ...state,
        EPDR_MembersLoading: false,
        EPDR_Members: [],
        EPDR_MembersError: action.result
      }
    default:
      return state
  }
}
