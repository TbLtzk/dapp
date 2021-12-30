export const approveModalBtn = (state) => state.auctions.approveModalBtn

export const liquidationAuctionsSelector = (state) => state.auctions.liquidationAuctions
export const systemDebtAuctionsSelector = (state) => state.auctions.systemDebtAuctions
export const systemSurplusAuctionsSelector = (state) => state.auctions.systemSurplusAuctions

export const systemSurplusAuctionsCountSelector = (state) => state.auctions.systemSurplusAuctionsCount
export const systemDebtAuctionsCountSelector = (state) => state.auctions.systemDebtAuctionsCount
export const liquidationAuctionsCountSelector = (state) => state.auctions.liquidationAuctionsCount

export const oneAuctionSelector = (state) => state.auctions.oneAuction
