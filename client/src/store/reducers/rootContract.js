import * as actionTypes from "../actions/action-types/root-contract";

const initialState = {
    rootMembersData: [],
    rootMembersAmountStakes: null,
    loadingRootMembers: true,
    errorM: null,
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
        default:
            return state;
    }
}
