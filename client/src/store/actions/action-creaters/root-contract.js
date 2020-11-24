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
export const stakeToPanel = (contract) => ({
    type: actionTypes.STAKE_TO_PANEL,
    contract
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
export const announceWithdrawal = (contract, amount) => ({
    type: actionTypes.ANNOUNCE_WITHDRAWAL,
    contract,
    amount
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
export const withdraw = (contract, amount, payTo) => ({
    type: actionTypes.WITHDRAW,
    contract,
    amount,
    payTo
});

export const withdrawSuccess = (result) => ({
    type: actionTypes.WITHDRAW_SUCCESS,
    result,
});

export const withdrawError = (result) => ({
    type: actionTypes.WITHDRAW_ERROR,
    result,
});
