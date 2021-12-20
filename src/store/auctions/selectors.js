/* get list of auctions */
export const auctionsArr = (state) => state.auctions.auctionsArr
export const loadingAuctions = (state) => state.auctions.loadingAuctions
export const errorM = (state) => state.auctions.errorM

export const liquidationAuctions = (state) => state.auctions.liquidationAuctions
export const systemDebtAuctions = (state) => state.auctions.systemDebtAuctions
export const systemSurplusAuctions = (state) => state.auctions.systemSurplusAuctions

export const endedAuctionsArr = (state) => state.auctions.endedAuctionsArr
export const endedLoadingAuctions = (state) => state.auctions.endedLoadingAuctions
export const endedErrorM = (state) => state.auctions.endedErrorM

export const approveModalBtn = (state) => state.auctions.approveModalBtn
export const lastAuctionModification = (state) => state.auctions.lastAuctionModification

export const systemSurplusAuctionsCountSelector = (state) => state.auctions.systemSurplusAuctionsCount
export const systemDebtAuctionsCountSelector = (state) => state.auctions.systemDebtAuctionsCount
export const liquidationAuctionsCountSelector = (state) => state.auctions.liquidationAuctionsCount
