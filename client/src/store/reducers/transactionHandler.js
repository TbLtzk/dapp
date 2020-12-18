import * as actionTypes from "../actions/action-types/transaction-handler";

const initialState = {
    transactionLoading: false,
    errorMessage: null,
};

export default function transactionHandler(state = initialState, action) {

    switch (action.type) {
        case actionTypes.SET_TRANSACTION_LOADING:
            return {
                ...state,
                transactionLoading: true,
                success: false,
                errorMessage: null,
            };
        case actionTypes.SET_TRANSACTION_LOADING_SUCCESS:
            return {
                ...state,
                transactionLoading: false,
                success: true
            };
        case actionTypes.SET_TRANSACTION_LOADING_ERROR:
            return {
                ...state,
                transactionLoading: false,
                errorMessage: action.errorMessage,
            };
        default:
            return state;
    }
}
