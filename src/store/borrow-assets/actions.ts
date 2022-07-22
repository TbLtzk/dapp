import { ApproveType, Asset, VaultData } from 'typings/defi';

import * as types from './types';

export const getBorrowVault = (vaultId: number | string): types.GetBorrowVault => ({
  type: 'GET_BORROW_VAULT',
  vaultId,
});

export const getBorrowVaultSuccess = (borrowVault: VaultData): types.GetBorrowVaultSuccess => ({
  type: 'GET_BORROW_VAULT_SUCCESS',
  borrowVault,
});

export const getBorrowVaultError = (error: any): types.GetBorrowVaultError => ({
  type: 'GET_BORROW_VAULT_ERROR',
  error,
});

export const getBorrowAllowance = (borrowType: ApproveType, asset: Asset): types.GetBorrowAllowance => ({
  type: 'GET_BORROW_ALLOWANCE',
  borrowType,
  asset,
});

export const getBorrowAllowanceRepaySuccess = (allowance: string | number): types.GetBorrowAllowanceRepaySuccess => ({
  type: 'GET_BORROW_ALLOWANCE_REPAY_SUCCESS',
  allowance,
});

export const getBorrowAllowanceDepositSuccess = (
  allowance: string | number
): types.GetBorrowAllowanceDepositSuccess => ({
  type: 'GET_BORROW_ALLOWANCE_DEPOSIT_SUCCESS',
  allowance,
});

export const getBorrowAllowanceError = (error: any): types.GetBorrowAllowanceError => ({
  type: 'GET_BORROW_ALLOWANCE_ERROR',
  error,
});

export const setBorrowAprove = (borrowType: ApproveType, asset: Asset): types.SetBorrowApprove => ({
  type: 'SET_BORROW_APPROVE',
  borrowType,
  asset,
});

export const setBorrowDeposit = (
  amount: string | number,
  vaultId: string | number,
  decimals: number
): types.SetBorrowDeposit => ({
  type: 'SET_BORROW_DEPOSIT',
  amount,
  vaultId,
  decimals,
});

export const setBorrowWithdraw = (
  amount: string | number,
  vaultId: string | number,
  decimals: number
): types.SetBorrowWithdraw => ({
  type: 'SET_BORROW_WITHDRAW',
  amount,
  vaultId,
  decimals,
});

export const setBorrowAsBorrow = (amount: string | number, vaultId: string | number): types.SetBorrowAsBorrow => ({
  type: 'SET_BORROW_AS_BORROW',
  amount,
  vaultId,
});

export const setBorrowRepay = (amount: string | number, vaultId: string | number): types.SetBorrowRepay => ({
  type: 'SET_BORROW_REPAY',
  amount,
  vaultId,
});
