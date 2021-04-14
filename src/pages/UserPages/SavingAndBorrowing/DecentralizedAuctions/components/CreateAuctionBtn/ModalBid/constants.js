export const checkTabContract = (activeTab) => {
  switch (activeTab) {
    case 'liquidation':
      return 'LiquidationAuction';
    case 'system-debt':
      return 'SystemDebtAuction';
    case 'system-surplus':
      return 'SystemSurplusAuction';
    default: return null;
  }
};
