export enum ObjectionStatus {
  NONE = '0',
  OPEN = '1',
  ACCEPTED = '2',
  PENDING = '3',
  DECIDED = '4',
  EXECUTED = '5',
};

export const TRANSACTION_TYPES = {
  success: 'Success',
  rejected: 'Rejected',
};

export const LOAD_TYPES = {
  error: 'error',
  loaded: 'loaded',
  loading: 'loading',
  initError: 'init-error',
  notLogged: 'not-logged',
  notInstalled: 'not-installed',
  wrongNetwork: 'wrong-network',
};
