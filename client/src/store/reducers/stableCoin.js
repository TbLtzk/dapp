import * as actionTypes from '../actions/action-types/stable-coin';

const initialState = {
  balance: 0,
};

export default function stableCoin(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALLOWANCE_SUCCESS:
      return {
        ...state,
        balance: action.result,
      };
    default:
      return state;
  }
}
