import * as actionTypes from "../actions/action-types/root-contract";

const initialState = {
    rootMembersData: [],
    rootMembersAmountStakes: null,
    loadingRootMembers: true,
    errorM: null,
    isUserRootNode: false,
    loadingCheckingRootNode: true,
    rootNodeStake: 0,
};

export default function rootContract(state = initialState, action) {

    switch (action.type) {
        case actionTypes.GET_ROOT_MEMBERS_DATA:
            return {
                ...state,
                loadingRootMembers: true
            };
        case actionTypes.GET_ROOT_MEMBERS_DATA_SUCCESS:
            return {
                ...state,
                rootMembersData: action?.result?.rootNodeData,
                rootMembersAmountStakes: action?.result?.totalStakes,
                loadingRootMembers: false
            };
        case actionTypes.GET_ROOT_MEMBERS_DATA_ERROR:
            return {
                ...state,
                rootMembersData: [],
                loadingRootMembers: false,
                errorM: action.result
            };

        case actionTypes.CHECK_IS_USER_ROOT_NODE_SUCCESS:
            return {
                ...state,
                isUserRootNode: action.result,
                loadingCheckingRootNode: false,
            };
        case actionTypes.CHECK_IS_USER_ROOT_NODE_ERROR:
            return {
                ...state,
                isUserRootNode: false,
                loadingCheckingRootNode: false,
            };
        case actionTypes.GET_ROOT_NODE_STAKES_SUCCESS:
            return {
                ...state,
                rootNodeStake: action.result,
            };
        default:
            return state;
    }
}
