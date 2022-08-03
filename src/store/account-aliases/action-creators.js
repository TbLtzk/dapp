import * as actionTypes from './action-types';

export const getAliases = (address) => ({
  type: actionTypes.GET_ALIASES,
  address,
});

export const setAliases = (val) => ({
  type: actionTypes.SET_ALIASES,
  payload: val,
});

export const setAliasesLoading = (val) => ({
  type: actionTypes.SET_ALIASES_LOADING,
  payload: val,
});

export const getAliasEvents = (address) => ({
  type: actionTypes.GET_ALIAS_EVENTS,
  address,
});

export const setAliasEvents = (val) => ({
  type: actionTypes.SET_ALIAS_EVENTS,
  payload: val,
});

export const setEventsLoading = (val) => ({
  type: actionTypes.SET_EVENTS_LOADING,
  payload: val,
});

export const setAlias = ({ address, purpose }, label) => ({
  type: actionTypes.SET_ALIAS,
  address,
  purpose,
  label
});

export const reserveAlias = (address, label) => ({
  type: actionTypes.RESERVE_ALIAS,
  address,
  label
});
