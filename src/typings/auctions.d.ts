import { TagState } from '@q-dev/q-ui-kit/dist/components/Tag';
import { StablecoinAsset } from 'typings/defi';

import { AUCTIONS_TYPES } from 'contracts/helpers/auction';

type AuctionType = keyof typeof AUCTIONS_TYPES;

interface AuctionCompletedInfo {
  lot: number | string;
  lotAsset: string;
  highestBid: string | number;
  raisingBid: string | number;
  bid: string | number;
  bidAsset: string;
  bidder: string;
  status: string;
  state: TagState;
  endTime: string;
  isBidTime: boolean;
  isAuctionEnded: boolean;
}

interface LiquidationCompletedInfo extends AuctionCompletedInfo {
  colKey: string;
  colAsset: string;
  vaultOwner: string;
  vaultId: string | number;
  auctionType: 'liquidation';
}

interface SystemDebtCompletedInfo extends AuctionCompletedInfo {
  auctionId: string | number;
  auctionType: 'systemDebt';
}

interface SystemSurplusCompletedInfo extends AuctionCompletedInfo {
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
  bid: string;
  auctionId: string | number;
  blockNumber: string | number;
}

interface AuctionInfo {
  status: string;
  endTime: string;
  slug: string;
  state: TagState;
  statusNumber: string | number;
  blockNumber: string | number;
  auctionType: AuctionType;
};

interface CreateAuction {
  bid: string;
  asset: StablecoinAsset;
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

type LiquidationAuctionInfo = AuctionInfo & LiquidationAuctionEvent;
type SystemDebtAndSurplusInfo = AuctionInfo & SystemDebtAndSurplusEvent;
type AuctionInfos = LiquidationAuctionInfo | SystemDebtAndSurplusInfo;

type ExecuteAuctionForm = LiquidationAuctionExecute | AuctionExecute;
type BidForAuctionForm = LiquidationAuctionBid | AuctionBid;
type CreateAuctionForm = CreateLiquidationAuction | CreateAuctionForm;

type AuctionCompletedInfos = SystemDebtCompletedInfo | SystemSurplusCompletedInfo | LiquidationCompletedInfo;
