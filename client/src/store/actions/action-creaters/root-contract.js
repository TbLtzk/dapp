import * as actionTypes from '../action-types/root-contract';

/* getRootMembersData */
export const getRootMembersData = (contract) => ({
    type: actionTypes.GET_ROOT_MEMBERS_DATA,
    contract
});

export const getRootMembersDataSuccess = (result) => ({
    type: actionTypes.GET_ROOT_MEMBERS_DATA_SUCCESS,
    result,
});

export const getRootMembersDataError = (result) => ({
    type: actionTypes.GET_ROOT_MEMBERS_DATA_ERROR,
    result,
});

/* stakeToPanel */
export const stakeToPanel = (contract, data) => ({
    type: actionTypes.STAKE_TO_PANEL,
    contract,
    data
});

export const stakeToPanelSuccess = (result) => ({
    type: actionTypes.STAKE_TO_PANEL_SUCCESS,
    result,
});

export const stakeToPanelError = (result) => ({
    type: actionTypes.STAKE_TO_PANEL_ERROR,
    result,
});

/* announceWithdrawal */
export const announceWithdrawal = (contract, amount, paymentInf) => ({
    type: actionTypes.ANNOUNCE_WITHDRAWAL,
    contract,
    amount,
    paymentInf
});

export const announceWithdrawalSuccess = (result) => ({
    type: actionTypes.ANNOUNCE_WITHDRAWAL_SUCCESS,
    result,
});

export const announceWithdrawalError = (result) => ({
    type: actionTypes.ANNOUNCE_WITHDRAWAL_ERROR,
    result,
});

/* WITHDRAW */
export const withdraw = (contract, amount, payTo, paymentInf) => ({
    type: actionTypes.WITHDRAW,
    contract,
    amount,
    payTo,
    paymentInf
});

export const withdrawSuccess = (result) => ({
    type: actionTypes.WITHDRAW_SUCCESS,
    result,
});

export const withdrawError = (result) => ({
    type: actionTypes.WITHDRAW_ERROR,
    result,
});

/* check is user root node */
export const checkIsUserRootNode = (contract, address) => ({
    type: actionTypes.CHECK_IS_USER_ROOT_NODE,
    contract,
    address,
});

export const checkIsUserRootNodeSuccess = (result) => ({
    type: actionTypes.CHECK_IS_USER_ROOT_NODE_SUCCESS,
    result,
});

export const checkIsUserRootNodeError = (result) => ({
    type: actionTypes.CHECK_IS_USER_ROOT_NODE_ERROR,
    result,
});

/* check is user root node */
export const getRootNodeStakes = (contract, address) => ({
    type: actionTypes.GET_ROOT_NODE_STAKES,
    contract,
    address,
});

export const getRootNodeStakesSuccess = (result) => ({
    type: actionTypes.GET_ROOT_NODE_STAKES_SUCCESS,
    result,
});

export const getRootNodeStakesError = (result) => ({
    type: actionTypes.GET_ROOT_NODE_STAKES_ERROR,
    result,
});
