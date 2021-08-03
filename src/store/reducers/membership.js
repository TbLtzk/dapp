import * as actionTypes from '../actions/action-types/membership'

const initialState = {
  isUserEPQFIMembership: false,
  isUserEPDRMembership: false,

  EPQFIMembers: [],
  EPQFIMembersLoading: false,
  EPQFIMembersError: null,

  EPDRMembers: [],
  EPDRMembersLoading: false,
  EPDRMembersError: null
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
        EPQFIMembersLoading: true
      }
    case actionTypes.GET_EPQFI_MEMBERS_SUCCESS:
      return {
        ...state,
        EPQFIMembersLoading: false,
        EPQFIMembers: action.result,
        EPQFIMembersError: null
      }
    case actionTypes.GET_EPQFI_MEMBERS_ERROR:
      return {
        ...state,
        EPQFIMembersLoading: false,
        EPQFIMembers: [],
        EPQFIMembersError: action.result
      }

    case actionTypes.GET_EPDR_MEMBERS:
      return {
        ...state,
        EPDRMembersLoading: true
      }
    case actionTypes.GET_EPDR_MEMBERS_SUCCESS:
      return {
        ...state,
        EPDRMembersLoading: false,
        EPDRMembers: action.result,
        EPDRMembersError: null
      }
    case actionTypes.GET_EPDR_MEMBERS_ERROR:
      return {
        ...state,
        EPDRMembersLoading: false,
        EPDRMembers: [],
        EPDRMembersError: action.result
      }
    default:
      return state
  }
}
