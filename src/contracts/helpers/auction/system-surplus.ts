import { AuctionStatus, SystemSurplusAuctionInfo } from '@q-dev/q-js-sdk';
import { capitalize } from 'lodash';
import { AuctionBid, AuctionExecute, CreateAuction, SystemDebtAndSurplusEvent, SystemDebtAndSurplusInfo, SystemSurplusCompletedInfo } from 'typings/auctions';

import { AUCTIONS_TYPES, ERROR_TYPES, getAuctionsEvents, getAuctionStatusState, getStatusTransformation } from '.';

import { getSystemSurplusAuctionInstance } from 'contracts/contract-instance';

import { fromWei } from 'func/balance';
import { dateToTimestamp, getNowTimestamp } from 'func/convertDate';

export function prepareAuctionData (
  info: SystemSurplusAuctionInfo,
  event: SystemDebtAndSurplusEvent,
  raisingBid: string | null
): SystemSurplusCompletedInfo {
  const completedInfo = {} as SystemSurplusCompletedInfo;
  const status = getStatusTransformation(info.status);

  completedInfo.auctionType = AUCTIONS_TYPES.systemSurplus;

  completedInfo.auctionId = event.auctionId;
  completedInfo.bidder = event.bidder;
  completedInfo.bid = fromWei(event.bid);

  completedInfo.lot = fromWei(info.lot);
  completedInfo.endTime = dateToTimestamp(info.endTime);
  completedInfo.raisingBid = raisingBid ? fromWei(raisingBid) : 0;
  completedInfo.status = getAuctionStatusState(status as keyof typeof AuctionStatus);
  completedInfo.highestBid = fromWei(info.highestBid);

  completedInfo.isBidTime = Number(dateToTimestamp(info.endTime)) >= Number(getNowTimestamp());
  completedInfo.isAuctionEnded = (info.status as AuctionStatus) === '2';

  return completedInfo;
}

const getSystemSurplusAuctionData = async (auction: SystemDebtAndSurplusInfo) => {
  const instance = await getSystemSurplusAuctionInstance();
  const auctionInfo = await instance.getAuctionInfo(auction.auctionId);
  const status = getStatusTransformation(auctionInfo.status);

  return {
    ...auction,
    auctionType: AUCTIONS_TYPES.systemSurplus,
    status: capitalize(status),
    state: getAuctionStatusState(status as keyof typeof AuctionStatus),
    statusNumber: auctionInfo.status,
    endTime: dateToTimestamp(auctionInfo.endTime),
    slug: `auctionId=${auction.auctionId}`,
  };
};

export async function getSystemSurplus (auctions: SystemDebtAndSurplusInfo[], lastBlock: string | number) {
  const instance = await getSystemSurplusAuctionInstance();
  const auctionsEvents = await getAuctionsEvents(instance, 'systemSurplus', lastBlock);
  const allAcutions = await Promise.all(
    [...auctions, ...auctionsEvents].map((auction) => getSystemSurplusAuctionData(auction as SystemDebtAndSurplusInfo))
  );
  return allAcutions;
}

export async function getOneSystemSurplusAuction (id: string | number) {
  try {
    const instance = await getSystemSurplusAuctionInstance();
    const info = await instance.getAuctionInfo(id);
    if (!Number(info.endTime)) {
      return { error: ERROR_TYPES.notExist };
    } else {
      const pastEvents = await getAuctionsEvents(instance, 'systemDebt');
      // @ts-ignore
      const event = pastEvents.find((event) => event.id === id);
      let raisingBid = null;
      if (info.status === '1') {
        raisingBid = await instance.getRaisingBid(id);
      }
      return prepareAuctionData(info, event, raisingBid);
    }
  } catch (error) {
    return { error: ERROR_TYPES.wrongLink };
  }
}

export async function createSystemSurplusAuction (form: CreateAuction) {
  const instance = await getSystemSurplusAuctionInstance();
  return await instance.startAuction({ qAmount: form.bid });
}

export async function bidForSystemSurplusAction (form: AuctionBid, userAddress: string) {
  const instance = await getSystemSurplusAuctionInstance();
  const result = await instance.bid(form.auctionId, {
    from: userAddress,
    qAmount: form.bid,
  });
  return result;
}

export async function executeSystemSurplusAuction (form: AuctionExecute, userAddress: string) {
  const instance = await getSystemSurplusAuctionInstance();
  const result = await instance.execute(form.auctionId, { from: userAddress });
  return result;
}
