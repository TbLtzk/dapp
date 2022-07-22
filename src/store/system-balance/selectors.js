export const stableCoinTotalSupplySelector = (state) => state.systemBalance.stableCoinTotalSupply;

export const systemBalanceSelector = (state) => state.systemBalance.systemBalance;
export const systemBalanceDebtSelector = (state) => state.systemBalance.systemBalanceDebt;
export const systemBalanceSurplusSelector = (state) => state.systemBalance.systemBalanceSurplus;

export const systemReserveAvailableAmountSelector = (state) => state.systemBalance.systemReserveAvailableAmount;
export const systemReserveBalanceSelector = (state) => state.systemBalance.systemReserveBalance;
