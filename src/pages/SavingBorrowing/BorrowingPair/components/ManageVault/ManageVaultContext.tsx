import { createContext, useContext, useEffect } from 'react';

import { ApproveType, Asset, StablecoinAsset, VaultData, VaultWithId } from 'typings/defi';

import { useBorrowAssets } from 'pages/SavingBorrowing/BorrowingPair/hooks/useBorrowAssets';

import ManageVaultTabs from './ManageVaultTabs';

import type { TxWithCaller } from 'store/transaction/hooks';

import { Bus } from 'utils/event-bus';

interface DepositOrWithdrawArg {
  amount: string;
  vaultId: number;
  decimals: number;
}

export interface AllowanceArg {
  borrowType: ApproveType;
  asset: Asset;
}

export interface ManageVaultData {
  borrowVault: VaultData;
  allowanceDeposit: string;
  allowanceRepay: string;

  getBorrowingVault: (vaultId: number | string) => Promise<void>;
  getBorrowingAllowance: (arg: AllowanceArg) => Promise<void>;
  approveBorrowing: (arg: AllowanceArg) => Promise<TxWithCaller>;
  borrowAsset: ({ amount, vaultId }: { amount: string; vaultId: number }) => Promise<TxWithCaller>;
  repayBorrowing: ({ amount, vaultId }: { amount: string; vaultId: number }) => Promise<TxWithCaller>;
  depositCollateral: (arg: DepositOrWithdrawArg) => Promise<TxWithCaller>;
  withdrawCollateral: (arg: DepositOrWithdrawArg) => Promise<TxWithCaller>;
};

export const ManageVaultContext = createContext<ManageVaultData>({} as ManageVaultData);

interface Props {
  vault: VaultWithId;
  stablecoin: StablecoinAsset;
}

function ManageVaultContextProvider ({ vault, stablecoin }: Props) {
  const borrowAssets = useBorrowAssets(stablecoin);

  const updateBorrowingVaultHandler = (payload: unknown) => {
    if (payload === vault.id) {
      borrowAssets.getBorrowingVault(vault.id);
    }
  };

  const updateBorrowingAllowanceHandler = (payload: unknown) => {
    const allowanceArg = payload as AllowanceArg;
    if (allowanceArg?.asset !== vault.colKey) return;

    if (allowanceArg?.borrowType === 'repay') {
      borrowAssets.getBorrowingAllowance({
        borrowType: 'repay',
        asset: vault.colKey as Asset
      });
    }

    if (allowanceArg?.borrowType === 'deposit') {
      borrowAssets.getBorrowingAllowance({
        borrowType: 'deposit',
        asset: vault.colKey as Asset,
      });
    }
  };

  useEffect(() => {
    borrowAssets.getBorrowingAllowance({
      borrowType: 'repay',
      asset: vault.colKey as Asset
    });
    borrowAssets.getBorrowingAllowance({
      borrowType: 'deposit',
      asset: vault.colKey as Asset,
    });
    borrowAssets.getBorrowingVault(vault.id);

    Bus.on(Bus.eventList.updateBorrowingVault, updateBorrowingVaultHandler);
    Bus.on(Bus.eventList.updateBorrowingAllowance, updateBorrowingAllowanceHandler);

    return () => {
      Bus.off(Bus.eventList.updateBorrowingVault, updateBorrowingVaultHandler);
      Bus.off(Bus.eventList.updateBorrowingAllowance, updateBorrowingAllowanceHandler);
    };
  }, []);

  return (
    <ManageVaultContext.Provider value={borrowAssets}>
      <ManageVaultTabs vault={vault} stablecoin={stablecoin} />
    </ManageVaultContext.Provider>
  );
}

export const useManageVaultContext = () => useContext(ManageVaultContext);

export default ManageVaultContextProvider;
