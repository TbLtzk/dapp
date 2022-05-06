import * as actionTypes from './action-types';

const initialState = {
  isUserEPQFIMembership: false,
  isUserEPDRMembership: false,
  isUserEPRSMembership: false,

  EPQFIMembers: [],
  EPQFIMembersLoading: true,
  EPQFIMembersError: null,

  EPDRMembers: [],
  EPDRMembersLoading: true,
  EPDRMembersError: null,

  EPRSMembers: [],
  EPRSMembersLoading: true,
  EPRSMembersError: null
};

export default function membership (state = initialState, action) {
  switch (action.type) {
    case actionTypes.IS_USER_EPQFI_MEMBER_SUCCESS:
      return {
        ...state,
        isUserEPQFIMembership: action.result
      };
    case actionTypes.IS_USER_EPRS_MEMBER_SUCCESS:
      return {
        ...state,
        isUserEPRSMembership: action.result
      };
    case actionTypes.IS_USER_EPDR_MEMBER_SUCCESS:
      return {
        ...state,
        isUserEPDRMembership: action.result
      };
    case actionTypes.GET_EPQFI_MEMBERS_SUCCESS:
      return {
        ...state,
        EPQFIMembersLoading: false,
        EPQFIMembers: action.result
      };
    case actionTypes.GET_EPQFI_MEMBERS_ERROR:
      return {
        ...state,
        EPQFIMembersLoading: false,
        EPQFIMembersError: action.result
      };
    case actionTypes.GET_EPDR_MEMBERS_SUCCESS:
      return {
        ...state,
        EPDRMembersLoading: false,
        EPDRMembers: action.result
      };
    case actionTypes.GET_EPDR_MEMBERS_ERROR:
      return {
        ...state,
        EPDRMembersLoading: false,
        EPDRMembersError: action.result
      };

    case actionTypes.GET_EPRS_MEMBERS_SUCCESS:
      return {
        ...state,
        EPRSMembersLoading: false,
        EPRSMembers: action.result
      };
    case actionTypes.GET_EPRS_MEMBERS_ERROR:
      return {
        ...state,
        EPRSMembersLoading: false,
        EPRSMembersError: action.result
      };
    default:
      return state;
  }
}
