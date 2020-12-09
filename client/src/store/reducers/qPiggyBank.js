import * as actionTypes from "../actions/action-types/q-piggy-bank";

const initialState = {
    lastUpdate: 0,
    isLoading: false,
    error: '',
    userBalance: 0,
    votingWeight: 0,
    votingLockingEnd: 0,
};

export default function qPiggyBank(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_PB_DATA_IS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.SET_PB_ERROR:
            return {
                ...state,
                lastUpdate: Date.now(),
                isLoading: false,
                error: action.error
            };
        default:
            let newState = {
                ...state,
                lastUpdate: Date.now(),
                isLoading: false,
                error: '',
            };
            switch (action.type) {
                case actionTypes.SET_PB_USER_BALANCE_SUCCESS:
                    return {
                        ...newState,
                        userBalance: action.payload,
                    };
                default:
                    return state;
            }
    }
}
