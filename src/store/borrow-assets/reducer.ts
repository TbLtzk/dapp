import { VaultData } from 'typings/defi';

import * as types from './types';

interface BorrowItems {
  borrowVault: VaultData | any;
  borrowVaultLoading: boolean;
  borrowVaultError: any | null;

  allowanceRepay: number | string;
  allowanceDeposit: number | string;
  allowanceError: any | null;
}

const initialState = {
  borrowVault: {} as VaultData,
  borrowVaultLoading: true,
  borrowVaultError: null,

  allowanceRepay: 0,
  allowanceDeposit: 0,
  allowanceError: null,
} as BorrowItems;

export default function reducer (state = initialState, action: types.BorrowActions) {
  switch (action.type) {
    case 'GET_BORROW_VAULT_SUCCESS':
      return {
        ...state,
        borrowVault: action.borrowVault,
        borrowVaultError: null,
        borrowVaultLoading: false,
      };
    case 'GET_BORROW_VAULT_ERROR':
      return {
        ...state,
        borrowVault: null,
        borrowVaultError: action.error,
        borrowVaultLoading: false,
      };

    case 'GET_BORROW_ALLOWANCE_REPAY_SUCCESS': {
      return {
        ...state,
        allowanceRepay: action.allowance,
      };
    }
    case 'GET_BORROW_ALLOWANCE_DEPOSIT_SUCCESS': {
      return {
        ...state,
        allowanceDeposit: action.allowance,
      };
    }
    case 'GET_BORROW_ALLOWANCE_ERROR':
      return {
        ...state,
        allowanceError: action.error,
      };

    default:
      return state;
  }
}
