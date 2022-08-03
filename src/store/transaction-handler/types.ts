export interface GetUserBalances {
  type: 'GET_USER_BALANCES';
}

export interface SetClearTransaction {
  type: 'SET_CLEAR_TRANSACTION';
}

export interface SetTransactionLoading {
  type: 'SET_TRANSACTION_LOADING';
}

export interface SetTransactionHash {
  type: 'SET_TRANSACTION_HASH';
  transactionHash: string;
}

export interface SetTransactionLoadingSuccess {
  type: 'SET_TRANSACTION_LOADING_SUCCESS';
  successMessage: any;
}

export interface SetTransactionLoadingError {
  type: 'SET_TRANSACTION_LOADING_ERROR';
  errorMessage: any;
}

export interface SetTransactionLoadingComplete {
  type: 'SET_TRANSACTION_LOADING_COMPLETE';
}

export type TransactionActions =
  | SetClearTransaction
  | SetTransactionLoading
  | SetTransactionHash
  | SetTransactionLoadingSuccess
  | SetTransactionLoadingError
  | SetTransactionLoadingComplete;
