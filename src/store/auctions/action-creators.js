import * as actionTypes from './action-types'

export const getAuctionsList = (activeTab, activeAuction) => ({
  type: actionTypes.GET_AUCTIONS_LIST,
  activeTab,
  activeAuction
})

export const getAuctionsListSuccess = (result) => ({
  type: actionTypes.GET_AUCTIONS_LIST_SUCCESS,
  result
})

export const getAuctionsListError = (result) => ({
  type: actionTypes.GET_AUCTIONS_LIST_ERROR,
  result
})

export const getEndedAuctionsList = (activeTab, activeAuction) => ({
  type: actionTypes.GET_ENDED_AUCTIONS_LIST,
  activeTab,
  activeAuction
})

export const getEndedAuctionsListSuccess = (result) => ({
  type: actionTypes.GET_ENDED_AUCTIONS_LIST_SUCCESS,
  result
})

export const getEndedAuctionsListError = (result) => ({
  type: actionTypes.GET_ENDED_AUCTIONS_LIST_ERROR,
  result
})

export const bidForAuction = (data) => ({
  type: actionTypes.BID_FOR_AUCTION,
  data
})

export const bidForAuctionSuccess = (result) => ({
  type: actionTypes.BID_FOR_AUCTION_SUCCESS,
  result
})

export const bidForAuctionError = (result) => ({
  type: actionTypes.BID_FOR_AUCTION_ERROR,
  result
})

export const executeAuction = (data) => ({
  type: actionTypes.EXECUTE_AUCTION,
  data
})

export const executeAuctionSuccess = (result) => ({
  type: actionTypes.EXECUTE_AUCTION_SUCCESS,
  result
})

export const executeAuctionError = (result) => ({
  type: actionTypes.EXECUTE_AUCTION_ERROR,
  result
})

export const getAuctionSuccess = (result) => ({
  type: actionTypes.GET_AUCTION_SUCCESS,
  result
})

export const getEmptyAuctionSuccess = (result) => ({
  type: actionTypes.GET_EMPTY_AUCTION_SUCCESS,
  result
})

export const getAuctionError = (result) => ({
  type: actionTypes.GET_AUCTION_ERROR,
  result
})

export const createAuction = (data) => ({
  type: actionTypes.CREATE_AUCTION,
  data
})

export const createAuctionSuccess = (result) => ({
  type: actionTypes.CREATE_AUCTION_SUCCESS,
  result
})

export const createAuctionError = (result) => ({
  type: actionTypes.CREATE_AUCTION_ERROR,
  result
})

export const setApproveModalBtn = (result) => ({
  type: actionTypes.SET_APPROVE_MODAL_BTN,
  result
})
/// ////////////////////////
export const getAuctions = (auctionTypes) => ({
  type: actionTypes.GET_AUCTIONS,
  auctionTypes
})

export const setSystemDebtAuctionCount = (result) => ({
  type: actionTypes.SET_SYSTEM_DEBT_AUCTIONS_COUNT,
  result
})

export const setLiquidationAuctionCount = (result) => ({
  type: actionTypes.SET_LIQUIDATION_AUCTIONS_COUNT,
  result
})
export const setSystemSurplusAuctionCount = (result) => ({
  type: actionTypes.SET_SYSTEM_SURPLUS_AUCTIONS_COUNT,
  result
})

export const setSystemDebtAuctions = (result) => ({
  type: actionTypes.SET_SYSTEM_DEBT_AUCTIONS,
  result
})

export const setLiquidationAuctions = (result) => ({
  type: actionTypes.SET_LIQUIDATION_AUCTIONS,
  result
})
export const setSystemSurplusAuctions = (result) => ({
  type: actionTypes.SET_SYSTEM_SURPLUS_AUCTIONS,
  result
})

export const getOneAuction = (auctionType, auctionId, onePage) => ({
  type: actionTypes.GET_ONE_AUCTION,
  auctionType,
  auctionId,
  onePage
})

export const setOneAuction = (auctionType, auction) => ({
  type: actionTypes.SET_ONE_AUCTION,
  auctionType,
  auction
})
