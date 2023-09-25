import { AuctionStatus, SystemSurplusAuctionInfo } from '@q-dev/q-js-sdk';
import {
  AuctionBid,
  AuctionExecute,
  AuctionInfos,
  CreateAuction,
  SystemDebtAndSurplusEvent,
  SystemDebtAndSurplusInfo,
  SystemSurplusCompletedInfo,
} from 'typings/auctions';
import { StablecoinAsset } from 'typings/defi';

import { AUCTIONS_TYPES, ERROR_TYPES, getAuctionsEvents, getAuctionStatusState, getStatusTransformation } from '.';

import { getSystemSurplusAuctionInstance } from 'contracts/contract-instance';

import { dateToUnix } from 'utils/date';
import { fromWei } from 'utils/web3';

export function prepareAuctionData (
  asset: StablecoinAsset,
  info: SystemSurplusAuctionInfo,
  event: SystemDebtAndSurplusEvent | undefined,
  raisingBid: string | null
): SystemSurplusCompletedInfo {
  const completedInfo = {} as SystemSurplusCompletedInfo;
  if (!event) return completedInfo;
  const status = getStatusTransformation(info.status);

  completedInfo.auctionType = AUCTIONS_TYPES.systemSurplus;

  completedInfo.auctionId = event.auctionId;
  completedInfo.bidder = event.bidder;
  completedInfo.bid = fromWei(event.bid);

  completedInfo.lot = fromWei(info.lot);

  completedInfo.bidAsset = 'Q';
  completedInfo.lotAsset = asset;

  completedInfo.endTime = String(dateToUnix(info.endTime));
  completedInfo.raisingBid = raisingBid ? fromWei(raisingBid) : 0;
  completedInfo.status = status;
  completedInfo.state = getAuctionStatusState(status as keyof typeof AuctionStatus);

  completedInfo.highestBid = fromWei(info.highestBid);

  completedInfo.isBidTime = dateToUnix(info.endTime) >= dateToUnix();
  completedInfo.isAuctionEnded = (info.status as AuctionStatus) === '2';

  return completedInfo;
}

const getSystemSurplusAuctionData = async (asset: StablecoinAsset, auction: SystemDebtAndSurplusInfo) => {
  const instance = await getSystemSurplusAuctionInstance(asset);
  const auctionInfo = await instance.getAuctionInfo(auction.auctionId);
  const status = getStatusTransformation(auctionInfo.status);

  return {
    ...auction,
    auctionType: AUCTIONS_TYPES.systemSurplus,
    status: status,
    state: getAuctionStatusState(status as keyof typeof AuctionStatus),
    statusNumber: auctionInfo.status,
    endTime: String(dateToUnix(auctionInfo.endTime)),
    slug: `auctionId=${auction.auctionId}`,
  };
};

export async function getSystemSurplus (asset: StablecoinAsset, auctions: AuctionInfos[], lastBlock: string | number) {
  const instance = await getSystemSurplusAuctionInstance(asset);
  const auctionsEvents = await getAuctionsEvents(instance, 'systemSurplus', lastBlock);
  const allAcutions = await Promise.all(
    [...auctions, ...auctionsEvents].map((auction) =>
      getSystemSurplusAuctionData(asset, auction as SystemDebtAndSurplusInfo))
  );
  return allAcutions;
}

export async function getOneSystemSurplusAuction (asset: StablecoinAsset, id: string | number) {
  try {
    const instance = await getSystemSurplusAuctionInstance(asset);
    const info = await instance.getAuctionInfo(id);
    if (!Number(info.endTime)) {
      return { error: ERROR_TYPES.notExist };
    } else {
      const pastEvents = (await getAuctionsEvents(instance, 'systemDebt')) as SystemDebtAndSurplusEvent[];
      const event = pastEvents.find((event) => event.auctionId === id);
      let raisingBid = null;
      if (info.status === '1') {
        raisingBid = await instance.getRaisingBid(id);
      }
      return prepareAuctionData(asset, info, event, raisingBid);
    }
  } catch (error) {
    return { error: ERROR_TYPES.wrongLink };
  }
}

export async function createSystemSurplusAuction (form: CreateAuction) {
  const instance = await getSystemSurplusAuctionInstance(form.asset);
  return await instance.startAuction({ qAmount: form.bid });
}

export async function bidForSystemSurplusAction (asset: StablecoinAsset, form: AuctionBid, userAddress: string) {
  const instance = await getSystemSurplusAuctionInstance(asset);
  const result = await instance.bid(form.auctionId, {
    from: userAddress,
    qAmount: form.bid,
  });
  return result;
}

export async function executeSystemSurplusAuction (asset: StablecoinAsset, form: AuctionExecute, userAddress: string) {
  const instance = await getSystemSurplusAuctionInstance(asset);
  const result = await instance.execute(form.auctionId, { from: userAddress });
  return result;
}
