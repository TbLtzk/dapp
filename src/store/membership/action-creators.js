import * as actionTypes from './action-types'

export const getIsUserEPDRMember = (address) => ({
  type: actionTypes.IS_USER_EPDR_MEMBER,
  address
})
export const getIsUserEPDRMemberSuccess = (result) => ({
  type: actionTypes.IS_USER_EPDR_MEMBER_SUCCESS,
  result
})

export const getIsUserEPRSMember = (address) => ({
  type: actionTypes.IS_USER_EPRS_MEMBER,
  address
})
export const getIsUserEPRSMemberSuccess = (result) => ({
  type: actionTypes.IS_USER_EPRS_MEMBER_SUCCESS,
  result
})

export const getIsUserEPQFIMember = (address) => ({
  type: actionTypes.IS_USER_EPQFI_MEMBER,
  address
})
export const getIsUserEPQFIMemberSuccess = (result) => ({
  type: actionTypes.IS_USER_EPQFI_MEMBER_SUCCESS,
  result
})

export const getEPDRMembers = () => ({
  type: actionTypes.GET_EPDR_MEMBERS
})
export const getEPDRMembersSuccess = (result) => ({
  type: actionTypes.GET_EPDR_MEMBERS_SUCCESS,
  result
})
export const getEPDRMembersError = (result) => ({
  type: actionTypes.GET_EPDR_MEMBERS_ERROR,
  result
})

export const getEPQFIMembers = () => ({
  type: actionTypes.GET_EPQFI_MEMBERS
})
export const getEPQFIMembersSuccess = (result) => ({
  type: actionTypes.GET_EPQFI_MEMBERS_SUCCESS,
  result
})
export const getEPQFIMembersError = (result) => ({
  type: actionTypes.GET_EPQFI_MEMBERS_ERROR,
  result
})

export const getEPRSMembers = () => ({
  type: actionTypes.GET_EPRS_MEMBERS
})
export const getEPRSMembersSuccess = (result) => ({
  type: actionTypes.GET_EPRS_MEMBERS_SUCCESS,
  result
})
export const getEPRSMembersError = (result) => ({
  type: actionTypes.GET_EPRS_MEMBERS_ERROR,
  result
})
