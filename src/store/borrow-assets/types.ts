import { ApproveType, Asset, VaultData } from 'typings/defi';

export interface GetBorrowVault {
  type: 'GET_BORROW_VAULT';
  vaultId: number;
}

export interface GetBorrowVaultSuccess {
  type: 'GET_BORROW_VAULT_SUCCESS';
  borrowVault: VaultData;
}

export interface GetBorrowVaultError {
  type: 'GET_BORROW_VAULT_ERROR';
  error: any;
}

export interface GetBorrowAllowance {
  type: 'GET_BORROW_ALLOWANCE';
  borrowType: ApproveType;
  asset: Asset;
}

export interface GetBorrowAllowanceRepaySuccess {
  type: 'GET_BORROW_ALLOWANCE_REPAY_SUCCESS';
  allowance: string;
}

export interface GetBorrowAllowanceDepositSuccess {
  type: 'GET_BORROW_ALLOWANCE_DEPOSIT_SUCCESS';
  allowance: string;
}

export interface GetBorrowAllowanceError {
  type: 'GET_BORROW_ALLOWANCE_ERROR';
  error: any;
}

export interface SetBorrowApprove {
  type: 'SET_BORROW_APPROVE';
  borrowType: ApproveType;
  asset: Asset;
  label: string;
}

export interface SetBorrowDeposit {
  type: 'SET_BORROW_DEPOSIT';
  amount: string;
  vaultId: number;
  decimals: number;
  label: string;
}

export interface SetBorrowWithdraw {
  type: 'SET_BORROW_WITHDRAW';
  amount: string;
  vaultId: number;
  decimals: number;
  label: string;
}

export interface SetBorrowAsBorrow {
  type: 'SET_BORROW_AS_BORROW';
  amount: string;
  vaultId: number;
  label: string;
}

export interface SetBorrowRepay {
  type: 'SET_BORROW_REPAY';
  amount: string;
  vaultId: number;
  label: string;
}

export type BorrowActions =
  | GetBorrowAllowanceRepaySuccess
  | GetBorrowAllowanceDepositSuccess
  | GetBorrowAllowanceError
  | GetBorrowVaultSuccess
  | GetBorrowVaultError;
