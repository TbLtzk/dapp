import { AuctionInfos, AuctionType, BidForAuctionForm, CreateAuctionForm, ExecuteAuctionForm } from 'typings/auctions';

import * as types from './types';

export const bidForAuction = (
  auctionType: AuctionType,
  form: BidForAuctionForm,
  label: string
): types.BidForAuction => ({
  type: 'BID_FOR_AUCTION',
  auctionType,
  form,
  label,
});

export const executeAuction = (
  auctionType: AuctionType,
  form: ExecuteAuctionForm,
  label: string
): types.ExecuteAuction => ({
  type: 'EXECUTE_AUCTION',
  auctionType,
  form,
  label,
});

export const createAuction = (
  auctionType: AuctionType,
  form: CreateAuctionForm,
  label: string
): types.CreateAuction => ({
  type: 'CREATE_AUCTION',
  form,
  auctionType,
  label,
});

export const getAuctions = (auctionType: AuctionType): types.GetAuctions => ({
  type: 'GET_AUCTIONS',
  auctionType,
});

export const setAuctions = (
  auctionType: AuctionType,
  newAuctions: AuctionInfos[],
  lastActiveBlock: number | string
): types.SetAuctions => ({
  type: 'SET_AUCTIONS',
  auctionType,
  newAuctions,
  lastActiveBlock,
});

export const getAllAuctions = (): types.GetAllAuctions => ({
  type: 'GET_ALL_AUCTIONS',
});
