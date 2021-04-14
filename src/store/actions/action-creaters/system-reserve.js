import * as actionTypes from '../action-types/system-reserve';

export const getAvailableAmount = () => ({
  type: actionTypes.GET_AVAILABLE_AMOUNT,
});

export const getAvailableAmountSuccess = (result) => ({
  type: actionTypes.GET_AVAILABLE_AMOUNT_SUCCESS,
  result
});

export const getAvailableAmountError = (result) => ({
  type: actionTypes.GET_AVAILABLE_AMOUNT_ERROR,
  result
});
