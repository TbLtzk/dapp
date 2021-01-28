import * as actionTypes from '../action-types/membership';

export const getIsUserEPDRMember = (address) => ({
  type: actionTypes.IS_USER_EPDR_MEMBER,
  address
});
export const getIsUserEPDRMemberSuccess = (result) => ({
  type: actionTypes.IS_USER_EPDR_MEMBER_SUCCESS,
  result
});

export const getIsUserEPQFIMember = (address) => ({
  type: actionTypes.IS_USER_EPQFI_MEMBER,
  address
});
export const getIsUserEPQFIMemberSuccess = (result) => ({
  type: actionTypes.IS_USER_EPQFI_MEMBER_SUCCESS,
  result
});
