
export const outstandingDebtSelector = (state) => state.borrowingCore.outstandingDebt
export const totalSavingBalanceSelector = (state) => state.borrowingCore.totalSavingBalance
export const totalCollateralLockedSelector = (state) => state.borrowingCore.totalCollateralLocked

export const savingAssetsSelector = (state) => state.borrowingCore.savingAssets

export const borrowingVaultsSelector = (state) => state.borrowingCore.borrowingVaults
export const loadingBorrowingVaultsSelector = (state) => state.borrowingCore.loadingBorrowingVaults

export const totalSupplySelector = (state) => state.borrowingCore.totalSupply

export const savingRateSelector = (state) => state.borrowingCore.savingRate
export const interestRateSelector = (state) => state.borrowingCore.interestRate
