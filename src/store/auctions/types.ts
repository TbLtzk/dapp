import {
  AuctionInfos,
  AuctionType,
  BidForAuctionForm,
  CreateAuction as CreateAuctionForm,
  ExecuteAuctionForm,
} from 'typings/auctions';

export interface GetAuctions {
  type: 'GET_AUCTIONS';
  auctionType: AuctionType;
}

export interface GetAllAuctions {
  type: 'GET_ALL_AUCTIONS';
}

export interface SetAuctions {
  type: 'SET_AUCTIONS';
  auctionType: AuctionType;
  newAuctions: AuctionInfos[];
  lastActiveBlock: number | string;
}

export interface CreateAuction {
  type: 'CREATE_AUCTION';
  auctionType: AuctionType;
  form: CreateAuctionForm;
}

export interface ExecuteAuction {
  type: 'EXECUTE_AUCTION';
  auctionType: AuctionType;
  form: ExecuteAuctionForm;
}

export interface BidForAuction {
  type: 'BID_FOR_AUCTION';
  auctionType: AuctionType;
  form: BidForAuctionForm;
}

export type AuctionActions = SetAuctions | CreateAuction | ExecuteAuction | BidForAuction;
