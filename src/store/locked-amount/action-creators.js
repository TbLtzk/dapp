import * as actionTypes from './action-types';

export const setDepositLockedAmount = (data, label) => ({
  type: actionTypes.SET_LOCKEDAMOUNT_CALL,
  payload: data,
  label
});

export const setPurgeTimeLocksAmount = (data, label) => ({
  type: actionTypes.SET_PURGEAMOUNT_CALL,
  payload: data,
  label
});
