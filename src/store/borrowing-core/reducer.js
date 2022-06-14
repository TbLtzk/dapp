import * as actionTypes from './action-types';

const initialState = {
  totalCollateralLocked: null,
  totalSavingBalance: null,
  outstandingDebt: null,
  savingAssets: null,

  borrowingVaults: [],
  loadingBorrowingVaults: true,

  totalSupply: 0,
  interestRate: 0,
  savingRate: 0
};

export default function index (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TOTAL_COLLATERAL_LOCKED:
      return {
        ...state,
        totalCollateralLocked: action.payload
      };
    case actionTypes.SET_TOTAL_SAVING_BALANCE:
      return {
        ...state,
        totalSavingBalance: action.payload
      };
    case actionTypes.SET_OUTSTANDING_DEBT:
      return {
        ...state,
        outstandingDebt: action.payload
      };
    case actionTypes.SET_SAVING_ASSETS:
      return {
        ...state,
        savingAssets: action.payload
      };
    case actionTypes.SET_BORROWING_VAULTS:
      return {
        ...state,
        borrowingVaults: action.payload,
        loadingBorrowingVaults: false
      };
    case actionTypes.SET_TOTAL_SUPPLY:
      return {
        ...state,
        totalSupply: action.payload
      };
    case actionTypes.SET_INTEREST_RATE:
      return {
        ...state,
        interestRate: action.payload
      };
    case actionTypes.SET_SAVING_RATE:
      return {
        ...state,
        savingRate: action.payload
      };
    default:
      return state;
  }
}
