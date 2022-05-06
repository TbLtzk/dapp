import * as actionTypes from './action-types';

export const bidForAuction = (data) => ({
  type: actionTypes.BID_FOR_AUCTION,
  data
});

export const executeAuction = (data) => ({
  type: actionTypes.EXECUTE_AUCTION,
  data
});

export const createAuction = (data) => ({
  type: actionTypes.CREATE_AUCTION,
  data
});

export const setApproveModalBtn = (result) => ({
  type: actionTypes.SET_APPROVE_MODAL_BTN,
  result
});

export const getAuctions = (auctionTypes) => ({
  type: actionTypes.GET_AUCTIONS,
  auctionTypes
});

export const setSystemDebtAuctions = (result) => ({
  type: actionTypes.SET_SYSTEM_DEBT_AUCTIONS,
  result
});

export const setLiquidationAuctions = (result) => ({
  type: actionTypes.SET_LIQUIDATION_AUCTIONS,
  result
});
export const setSystemSurplusAuctions = (result) => ({
  type: actionTypes.SET_SYSTEM_SURPLUS_AUCTIONS,
  result
});

export const getOneAuction = (auctionType, auctionId, address) => ({
  type: actionTypes.GET_ONE_AUCTION,
  auctionType,
  auctionId,
  address
});

export const setOneAuction = (auction) => ({
  type: actionTypes.SET_ONE_AUCTION,
  auction
});
