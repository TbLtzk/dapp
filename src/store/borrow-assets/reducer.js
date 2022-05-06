import * as actionTypes from './action-types';

const initialState = {
  allowanceDeposit: null,
  allowanceRepay: null,
  borrowVaultInfo: null
};

export default function index (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_BORROW_ALLOWANCE_DEPOSIT:
      return {
        ...state,
        allowanceDeposit: action.payload
      };
    case actionTypes.SET_BORROW_ALLOWANCE_REPAY:
      return {
        ...state,
        allowanceRepay: action.payload
      };
    case actionTypes.SET_BORROW_VAULT_INFO:
      return {
        ...state,
        borrowVaultInfo: action.payload
      };

    default:
      return state;
  }
}
