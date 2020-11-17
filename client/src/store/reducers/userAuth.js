import * as actionTypes from "../actions/action-types/user-auth";

const initialState = {
    provider: null,
    accountId: null,
    loadingCheckProvider: true,
    errorM: null,
};

export default function userAuth(state = initialState, action) {

    switch (action.type) {
        case actionTypes.DETECT_ETHEREUM_PROVIDER:
            return {
                ...state,
                loadingCheckProvider: true
            };
        case actionTypes.DETECT_ETHEREUM_PROVIDER_SUCCESS:
            return {
                ...state,
                provider: action.payload.provider,
                accountId: action.payload.account,
                loadingCheckProvider: false
            };
        case actionTypes.DETECT_ETHEREUM_PROVIDER_ERROR:
            return {
                ...state,
                provider: null,
                accountId: null,
                loadingCheckProvider: false,
                errorM: action.payload
            };
        default:
            return state;
    }
}
