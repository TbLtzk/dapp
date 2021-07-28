import { AUCTIONS_TYPES } from 'constants/statuses'

export const checkTabContract = (activeTab) => {
  switch (activeTab) {
    case AUCTIONS_TYPES.liquidation:
      return 'LiquidationAuction'
    case AUCTIONS_TYPES.systemDebt:
      return 'SystemDebtAuction'
    case AUCTIONS_TYPES.systemSurplus:
      return 'SystemSurplusAuction'
    default:
      return null
  }
}
