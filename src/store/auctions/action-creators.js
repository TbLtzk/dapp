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

export const getAuction = (contractName, inf, activeTab, activeAuction) => ({
  type: actionTypes.GET_AUCTION,
  contractName,
  inf,
  activeTab,
  activeAuction
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
export const getAuctionsCount = () => ({
  type: actionTypes.GET_AUCTIONS_COUNT
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
