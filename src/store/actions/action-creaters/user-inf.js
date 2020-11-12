import * as actionTypes from '../action-types/user-inf';

export const getUserInf = () => ({
    type: actionTypes.GET_USER_INF,
});

export const getUserInfSuccess = (payload) => ({
    type: actionTypes.GET_USER_INF_SUCCESS,
    payload,
});

export const getUserInfError = (payload) => ({
    type: actionTypes.GET_USER_INF_ERROR,
    payload,
});


