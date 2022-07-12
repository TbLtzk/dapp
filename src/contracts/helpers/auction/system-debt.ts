import { AuctionStatus, SystemDebtAuctionInfo } from '@q-dev/q-js-sdk';
import { capitalize } from 'lodash';
import {
  AuctionBid,
  CreateAuction,
  SystemDebtAndSurplusInfo,
  SystemDebtCompletedInfo,
} from 'typings/auctions';

import { AUCTIONS_TYPES, ERROR_TYPES, getAllowance, getAuctionsEvents, getAuctionStatusState, getStatusTransformation } from '.';

import { getSystemDebtAuctionInstance } from 'contracts/contract-instance';

import { fromWei, toWei } from 'func/balance';
import { dateToTimestamp, getNowTimestamp } from 'func/convertDate';

function prepareSystemDebtAuctionInfo (
  info: SystemDebtAuctionInfo,
  auctionId: string | number,
  raisingBid: string | null
): SystemDebtCompletedInfo {
  const completedInfo = {} as SystemDebtCompletedInfo;
  const status = getStatusTransformation(info.status);

  completedInfo.auctionType = AUCTIONS_TYPES.systemDebt;
  completedInfo.auctionId = auctionId;
  completedInfo.bid = info.highestBid;
  completedInfo.bidder = info.bidder;
  completedInfo.endTime = dateToTimestamp(info.endTime);
  completedInfo.raisingBid = raisingBid ? fromWei(raisingBid) : 0;
  completedInfo.status = capitalize(status);
  completedInfo.asset = 'QUSD';
  completedInfo.state = getAuctionStatusState(status as keyof typeof AuctionStatus);
  completedInfo.highestBid = fromWei(info.highestBid);
  completedInfo.lot = fromWei(info.lot);
  completedInfo.lotAsset = 'Q';
  completedInfo.isBidTime = Number(dateToTimestamp(info.endTime)) >= Number(getNowTimestamp());
  completedInfo.isAuctionEnded = (info.status as AuctionStatus) === '2';

  return completedInfo;
}

const getSystemDebtAuctionData = async (auction: SystemDebtAndSurplusInfo) => {
  const instance = await getSystemDebtAuctionInstance();
  const auctionInfo = await instance.getAuctionInfo(auction.auctionId);
  const status = getStatusTransformation(auctionInfo.status);

  return {
    ...auction,
    auctionType: AUCTIONS_TYPES.systemDebt,
    status: capitalize(status),
    state: getAuctionStatusState(status as keyof typeof AuctionStatus),
    statusNumber: auctionInfo.status,
    endTime: dateToTimestamp(auctionInfo.endTime),
    slug: `auctionId=${auction.auctionId}`,
  };
};

export async function getSystemDebt (auctions: SystemDebtAndSurplusInfo[], lastBlock: string | number) {
  const instance = await getSystemDebtAuctionInstance();
  const auctionsEvents = await getAuctionsEvents(instance, 'systemDebt', lastBlock);
  const allAcutions = await Promise.all(
    [...auctions, ...auctionsEvents].map((auction) => getSystemDebtAuctionData(auction as SystemDebtAndSurplusInfo))
  );
  return allAcutions;
}

export async function getOneSystemDebtAuction (auctionId: string | number) {
  try {
    const instance = await getSystemDebtAuctionInstance();
    const info = await instance.getAuctionInfo(auctionId);
    if (!Number(info.endTime)) {
      return { error: ERROR_TYPES.notExist };
    } else {
      let raisingBid = null;
      if (info.status === '1') {
        raisingBid = await instance.getRaisingBid(auctionId);
      }
      return prepareSystemDebtAuctionInfo(info, auctionId, raisingBid);
    }
  } catch (error) {
    return { error: ERROR_TYPES.wrongLink };
  }
}

export async function createSystemDebtAuction (form: CreateAuction, userAddress: string) {
  const instance = await getSystemDebtAuctionInstance();
  await getAllowance(userAddress, instance.address, form.bid);
  return await instance.startAuction(toWei(form.bid), { from: userAddress });
}

export async function bidForSystemDebtAuction (form: AuctionBid, userAddress: string) {
  const instance = await getSystemDebtAuctionInstance();
  await getAllowance(userAddress, instance.address, form.bid);
  const result = await instance.bid(toWei(form.bid), { from: userAddress });
  return result;
}

export async function executeSystemDebtAuction (userAddress: string) {
  const instance = await getSystemDebtAuctionInstance();
  const result = await instance.execute({ from: userAddress });
  return result;
}
