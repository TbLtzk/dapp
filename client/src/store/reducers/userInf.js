import * as actionTypes from "../actions/action-types/user-inf";

const initialState = {
    user: null,
    loadingUserInf: true,
    errorM: null,
};

export default function userAuth(state = initialState, action) {

    switch (action.type) {
        case actionTypes.GET_USER_INF:
            return {
                ...state,
                loadingUserInf: true
            };
        case actionTypes.GET_USER_INF_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loadingUserInf: false
            };
        case actionTypes.GET_USER_INF_ERROR:
            return {
                ...state,
                user: null,
                loadingUserInf: false,
                errorM: action.payload
            };
        default:
            return state;
    }
}
