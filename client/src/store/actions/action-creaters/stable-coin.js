import * as actionTypes from '../action-types/stable-coin';

export const getAllowance = (userAddress, contractAddress) => ({
  type: actionTypes.GET_ALLOWANCE,
  userAddress,
  contractAddress
});

export const getAllowanceSuccess = (result) => ({
  type: actionTypes.GET_ALLOWANCE_SUCCESS,
  result
});
