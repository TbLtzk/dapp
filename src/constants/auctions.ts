import { AUCTIONS_TYPES } from 'contracts/helpers/auction';

export const AUCTION_HEADERS = {
  [AUCTIONS_TYPES.liquidation]: 'LIQUIDATION_AUCTION',
  [AUCTIONS_TYPES.systemDebt]: 'SYSTEM_DEBT_AUCTION',
  [AUCTIONS_TYPES.systemSurplus]: 'SYSTEM_SURPLUS_AUCTION',
};
