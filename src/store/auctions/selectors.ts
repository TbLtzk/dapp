import { AuctionType } from 'typings/auctions.d';

import { RootState } from 'store';

export const liquidationSelector = (state:RootState) => state.auctions.liquidation;
export const systemDebtSelector = (state:RootState) => state.auctions.systemDebt;
export const systemSurplusSelector = (state:RootState) => state.auctions.systemSurplus;

export const activeAuctionsCountSelector = (state:RootState) =>
  Object.values(state.auctions).reduce((count, auct) => (count += auct.activeCount), 0);

export const auctionsByTypeSelector = (type: AuctionType) => (state:RootState) => state.auctions[type];
