import * as actionTypes from './action-types';

export const setDepositLockedAmount = (data) => ({
  type: actionTypes.SET_LOCKEDAMOUNT_CALL,
  payload: data
});

export const setPurgeTimeLocksAmount = (data) => ({
  type: actionTypes.SET_PURGEAMOUNT_CALL,
  payload: data
});
