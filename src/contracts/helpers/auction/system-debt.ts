import { AuctionStatus, SystemDebtAuctionInfo } from '@q-dev/q-js-sdk';
import {
  AuctionBid,
  AuctionInfos,
  CreateAuction,
  SystemDebtAndSurplusInfo,
  SystemDebtCompletedInfo,
} from 'typings/auctions';
import { StablecoinAsset } from 'typings/defi';

import { AUCTIONS_TYPES, ERROR_TYPES, getAllowance, getAuctionsEvents, getAuctionStatusState, getStatusTransformation } from '.';

import { getSystemDebtAuctionInstance } from 'contracts/contract-instance';

import { dateToUnix } from 'utils/date';
import { fromWei, toWei } from 'utils/web3';

function prepareSystemDebtAuctionInfo (
  asset: StablecoinAsset,
  info: SystemDebtAuctionInfo,
  auctionId: string | number,
  raisingBid: string | null
): SystemDebtCompletedInfo {
  const completedInfo = {} as SystemDebtCompletedInfo;
  const status = getStatusTransformation(info.status);

  completedInfo.bidAsset = asset;
  completedInfo.lotAsset = 'Q';

  completedInfo.auctionType = AUCTIONS_TYPES.systemDebt;
  completedInfo.auctionId = auctionId;
  completedInfo.bid = info.highestBid;
  completedInfo.bidder = info.bidder;
  completedInfo.endTime = String(dateToUnix(info.endTime));
  completedInfo.raisingBid = raisingBid ? fromWei(raisingBid) : '0';
  completedInfo.status = status;
  completedInfo.state = getAuctionStatusState(status as keyof typeof AuctionStatus);
  completedInfo.highestBid = fromWei(info.highestBid);
  completedInfo.lot = fromWei(info.lot);
  completedInfo.isBidTime = dateToUnix(info.endTime) >= dateToUnix();
  completedInfo.isAuctionEnded = (info.status as AuctionStatus) === '2';

  return completedInfo;
}

const getSystemDebtAuctionData = async (asset: StablecoinAsset, auction: SystemDebtAndSurplusInfo) => {
  const instance = await getSystemDebtAuctionInstance(asset);
  const auctionInfo = await instance.getAuctionInfo(auction.auctionId);
  const status = getStatusTransformation(auctionInfo.status);

  return {
    ...auction,
    auctionType: AUCTIONS_TYPES.systemDebt,
    status: (status),
    state: getAuctionStatusState(status as keyof typeof AuctionStatus),
    statusNumber: auctionInfo.status,
    endTime: String(dateToUnix(auctionInfo.endTime)),
    slug: `auctionId=${auction.auctionId}`,
  };
};

export async function getSystemDebt (asset: StablecoinAsset, auctions: AuctionInfos[], lastBlock: string | number) {
  const instance = await getSystemDebtAuctionInstance(asset);
  const auctionsEvents = await getAuctionsEvents(instance, 'systemDebt', lastBlock);
  const allAcutions = await Promise.all(
    [...auctions, ...auctionsEvents].map((auction) =>
      getSystemDebtAuctionData(asset, auction as SystemDebtAndSurplusInfo))
  );
  return allAcutions;
}

export async function getOneSystemDebtAuction (asset: StablecoinAsset, auctionId: string | number) {
  try {
    const instance = await getSystemDebtAuctionInstance(asset);
    const info = await instance.getAuctionInfo(auctionId);
    if (!Number(info.endTime)) {
      return { error: ERROR_TYPES.notExist };
    } else {
      let raisingBid = null;
      if (info.status === '1') {
        raisingBid = await instance.getRaisingBid(auctionId);
      }
      return prepareSystemDebtAuctionInfo(asset, info, auctionId, raisingBid);
    }
  } catch (error) {
    return { error: ERROR_TYPES.wrongLink };
  }
}

export async function createSystemDebtAuction (form: CreateAuction, userAddress: string) {
  const instance = await getSystemDebtAuctionInstance(form.asset);
  await getAllowance(form.asset, userAddress, instance.address, form.bid);
  return instance.startAuction(toWei(form.bid), { from: userAddress });
}

export async function bidForSystemDebtAuction (asset: StablecoinAsset, form: AuctionBid, userAddress: string) {
  const instance = await getSystemDebtAuctionInstance(asset);
  await getAllowance(asset, userAddress, instance.address, form.bid);
  return instance.bid(toWei(String(form.bid)), { from: userAddress });
}

export async function executeSystemDebtAuction (asset: StablecoinAsset, userAddress: string) {
  const instance = await getSystemDebtAuctionInstance(asset);
  return instance.execute({ from: userAddress });
}
