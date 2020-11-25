import * as actionTypes from "../actions/action-types/user-inf";

const initialState = {
    userAddress: null,
    balance: null,
};

export default function userAuth(state = initialState, action) {

    switch (action.type) {
        case actionTypes.SET_USER_ADDRESS:
            return {
                ...state,
                userAddress: action.address
            };
            case actionTypes.SET_USER_BALANCE:
            return {
                ...state,
                balance: action.balance
            };
        default:
            return state;
    }
}
