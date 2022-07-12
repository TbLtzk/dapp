import { TagState } from 'ui/Tag';

import { AUCTIONS_TYPES } from 'contracts/helpers/auction';

type AuctionType = keyof typeof AUCTIONS_TYPES;

interface AuctionCompletedInfo {
  lot: number | string;
  highestBid: string | number;
  raisingBid: string | number;
  bid: string | number;
  bidder: string;
  status: string;
  state: TagState;
  endTime: string;
  isBidTime: boolean;
  isAuctionEnded: boolean;
  asset: string;
}

interface LiquidationCompletedInfo extends AuctionCompletedInfo {
  colKey: string;
  colAsset: string;
  vaultOwner: string;
  vaultId: string | number;
  auctionType: 'liquidation'
}

interface SystemDebtCompletedInfo extends AuctionCompletedInfo {
  auctionId: string | number;
  lotAsset: string;
  auctionType: 'systemDebt';
}

interface SystemSurplusCompletedInfo extends AuctionCompletedInfo {
  lotAsset: string;
  auctionId: string | number;
  auctionType: 'systemSurplus';
}

interface LiquidationAuctionEvent {
  vaultOwner: string;
  vaultId: string | number;
  blockNumber: string | number;
}

interface SystemDebtAndSurplusEvent {
  bidder: string;
  bid: string | number;
  auctionId: string | number;
  blockNumber: string | number;
}

interface AuctionInfo {
  status: string;
  endTime: string;
  slug: string;
  state: TagState;
  statusNumber: string | number
  blockNumber: string | number
  auctionType: AuctionType
};

interface CreateAuction {
  bid: string
}
interface AuctionExecute {
  auctionId: string;
}
interface AuctionBid {
  bid: string | number;
  auctionId: string;
}
interface CreateLiquidationAuction extends CreateAuction {
  vaultOwner: string;
  vaultId: string | number;
}

interface LiquidationAuctionExecute {
  vaultOwner: string;
  vaultId: string | number;
}
interface LiquidationAuctionBid {
  vaultOwner: string;
  vaultId: string | number;
  bid: string | number;
}

type LiquidationAuctionInfo = AuctionInfo & LiquidationAuctionEvent
type SystemDebtAndSurplusInfo = AuctionInfo & SystemDebtAndSurplusEvent
type AuctionInfos = LiquidationAuctionInfo | SystemDebtAndSurplusInfo

type ExecuteAuctionForm = LiquidationAuctionExecute | AuctionExecute
type BidForAuctionForm = LiquidationAuctionBid | AuctionBid
type CreateAuctionForm = CreateLiquidationAuction | CreateAuctionForm

type AuctionCompletedInfos = SystemDebtCompletedInfo | SystemSurplusCompletedInfo | LiquidationCompletedInfo;
