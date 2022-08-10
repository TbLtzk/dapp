import { AuctionStatus, LiquidationAuctionInfo as SdkLiquidationAuctionInfo } from '@q-dev/q-js-sdk';
import {
  CreateLiquidationAuction,
  LiquidationAuctionBid,
  LiquidationAuctionEvent,
  LiquidationAuctionExecute,
  LiquidationAuctionInfo,
  LiquidationCompletedInfo,
} from 'typings/auctions';
import { fromWei, toWei } from 'web3-utils';

import { getAuctionStatusState } from './index';
import { AUCTIONS_TYPES, ERROR_TYPES, getAllowance, getAuctionsEvents, getStatusTransformation } from '.';

import { getBorrowingCoreInstance, getLiquidationAuctionInstance } from 'contracts/contract-instance';

import { dateToUnix } from 'utils/date';
import { toBigNumber } from 'utils/numbers';

async function prepareLiquidationAuctionInfo (
  info: SdkLiquidationAuctionInfo,
  auctionEvent: LiquidationAuctionEvent | undefined,
  raisingBid: string | null
) {
  const completedInfo = {} as LiquidationCompletedInfo;
  if (!auctionEvent) return completedInfo;

  const borrowingCoreInstance = await getBorrowingCoreInstance();
  const vault = await borrowingCoreInstance.userVaults(auctionEvent.vaultOwner, auctionEvent.vaultId);
  const status = getStatusTransformation(info.status);

  completedInfo.lotAsset = 'QUSD';
  completedInfo.bidAsset = 'QUSD';

  completedInfo.auctionType = AUCTIONS_TYPES.liquidation;
  completedInfo.bidder = info.bidder;
  completedInfo.vaultOwner = auctionEvent.vaultOwner;
  completedInfo.vaultId = auctionEvent.vaultId;
  completedInfo.colKey = vault.colKey;
  completedInfo.endTime = info.endTime.toString();
  completedInfo.raisingBid = raisingBid ? fromWei(raisingBid) : 0;
  completedInfo.highestBid = fromWei(info.highestBid);
  completedInfo.colAsset = toBigNumber(vault.colAsset).dividedBy(1e8).toFixed();
  completedInfo.state = getAuctionStatusState(status as keyof typeof AuctionStatus);
  completedInfo.status = (status);

  completedInfo.isBidTime = Number(info.endTime) >= dateToUnix();
  completedInfo.isAuctionEnded = (info.status as AuctionStatus) === '2';

  return completedInfo;
}

export async function getOneLiquidationAuction (vaultId: string | number, vaultOwner: string) {
  try {
    const instance = await getLiquidationAuctionInstance();
    const info = await instance.getAuctionInfo(vaultOwner, vaultId);
    if (!Number(info.endTime)) {
      return { error: ERROR_TYPES.notExist };
    } else {
      const pastEvents = await getAuctionsEvents(instance, 'liquidation') as LiquidationAuctionEvent[];
      const auction = pastEvents.find((event) => event.vaultId === vaultId && event.vaultOwner === vaultOwner);
      let raisingBid = null;
      if (info.status === '1') {
        raisingBid = await instance.getRaisingBid(vaultOwner, vaultId);
      }
      return prepareLiquidationAuctionInfo(info, auction, raisingBid);
    }
  } catch (error) {
    return { error: ERROR_TYPES.wrongLink };
  }
}

const getLiquidationAuctionData = async (auction: LiquidationAuctionInfo) => {
  const instance = await getLiquidationAuctionInstance();
  const autionInfo = await instance.getAuctionInfo(auction.vaultOwner, auction.vaultId);
  const status = getStatusTransformation(autionInfo.status);
  return {
    ...auction,
    auctionType: AUCTIONS_TYPES.liquidation,
    status: (status),
    statusNumber: autionInfo.status,
    state: getAuctionStatusState(status as keyof typeof AuctionStatus),
    endTime: autionInfo.endTime.toString(),
    slug: `vaultId=${auction.vaultId}&vaultOwner=${auction.vaultOwner}`,
  };
};

export async function getLiquidation (auctions: LiquidationAuctionInfo[], lastBlock: number | string) {
  const instance = await getLiquidationAuctionInstance();
  const auctionsEvents = await getAuctionsEvents(instance, 'liquidation', lastBlock);
  const allAcutions = await Promise.all(
    [...auctions, ...auctionsEvents].map((auction) => getLiquidationAuctionData(auction as LiquidationAuctionInfo))
  );
  return allAcutions;
}

export async function createLiquidationAuction (form: CreateLiquidationAuction, userAddress: string) {
  const instance = await getLiquidationAuctionInstance();
  await getAllowance(userAddress, instance.address, form.bid);
  return await instance.startAuction(form.vaultOwner, form.vaultId, toWei(form.bid), { from: userAddress });
}

export async function bidForLiquidationAuction (form: LiquidationAuctionBid, userAddress: string) {
  const instance = await getLiquidationAuctionInstance();
  await getAllowance(userAddress, instance.address, form.bid);
  const result = await instance.bid(form.vaultOwner, form.vaultId, toWei(String(form.bid)), { from: userAddress });
  return result;
}

export async function executeLiquidationAuction (form: LiquidationAuctionExecute, userAddress: string) {
  const instance = await getLiquidationAuctionInstance();
  const result = await instance.execute(form.vaultOwner, form.vaultId, { from: userAddress });
  return result;
}
