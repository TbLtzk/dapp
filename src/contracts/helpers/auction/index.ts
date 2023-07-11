import { AuctionStatus } from '@q-dev/q-js-sdk';
import { AuctionInfos, AuctionType, LiquidationAuctionEvent, SystemDebtAndSurplusEvent } from 'typings/auctions';
import { AuctionInstance } from 'typings/contracts';

import { getOneLiquidationAuction } from './liquidation';
import { getOneSystemDebtAuction } from './system-debt';
import { getOneSystemSurplusAuction } from './system-surplus';

import {
  getLiquidationAuctionInstance,
  getStableCoinInstance,
  getSystemDebtAuctionInstance,
  getSystemSurplusAuctionInstance,
} from 'contracts/contract-instance';

import { MAX_APPROVE_AMOUNT } from 'constants/boundaries';

export enum AUCTIONS_TYPES {
  liquidation = 'liquidation',
  systemDebt = 'systemDebt',
  systemSurplus = 'systemSurplus',
}

export async function getAuctionsEvents (
  { instance }: AuctionInstance,
  auctionType: AuctionType,
  lastBlock = 0 as number | string
) {
  const pastEvents = await instance.queryFilter(
    instance.filters.AuctionStarted(),
    lastBlock,
    'latest'
  );
  if (auctionType === 'liquidation') {
    return pastEvents.map((event) => ({
      vaultOwner: event.args._user,
      vaultId: event.args._vaultId.toString(),
      blockNumber: event.blockNumber,
    })) as LiquidationAuctionEvent[];
  }
  return pastEvents.map((event) => ({
    bidder: event.args._bidder,
    bid: event.args._bid.toString(),
    // TODO: fix types
    // @ts-ignore-next-line
    auctionId: event.args?._auctionId?.toString(),
    blockNumber: event.blockNumber,
  })) as SystemDebtAndSurplusEvent[];
}

export const getAuction = async (auctionType: AuctionType, params: { slug: string }) => {
  switch (auctionType) {
    case 'liquidation': {
      const searchParams = Object.fromEntries(new URLSearchParams(params.slug));
      return await getOneLiquidationAuction(searchParams.vaultId, searchParams.vaultOwner);
    }
    case 'systemDebt': {
      const searchParams = Object.fromEntries(new URLSearchParams(params.slug));
      return await getOneSystemDebtAuction(searchParams.auctionId);
    }
    case 'systemSurplus': {
      const searchParams = Object.fromEntries(new URLSearchParams(params.slug));
      return await getOneSystemSurplusAuction(searchParams.auctionId);
    }
    default: {
      return { error: ERROR_TYPES.notExist };
    }
  }
};
export const countActiveAuctions = (auctions: AuctionInfos[]) => {
  return auctions.filter((auct: AuctionInfos) => auct.statusNumber === '1').length;
};

export const ERROR_TYPES = {
  notExist: 'Auction not found',
  wrongLink: 'Wrong link',
};

export const getStatusTransformation = (statusId: number | string) => {
  const statuses = Object.keys(AuctionStatus);
  return statuses[Number(statusId)];
};

export const getAuctionStatusState = (status: keyof typeof AuctionStatus) => {
  switch (status) {
    case 'ACTIVE':
      return 'pending';
    case 'NONE':
      return 'rejected';
    default:
      return 'approved';
  }
};

export async function getAllowance (userAddress: string, contractAddress: string, value: string | number) {
  const stableCoin = await getStableCoinInstance('QUSD');
  const allowance = await stableCoin.allowance(userAddress, contractAddress);
  if (value && Number(allowance) < Number(value)) {
    await stableCoin.approve(contractAddress, MAX_APPROVE_AMOUNT, { from: userAddress });
  }
}

export async function getAuctionInstance (auctionType: AuctionType) {
  switch (auctionType) {
    case 'liquidation': {
      return await getLiquidationAuctionInstance();
    }
    case 'systemDebt': {
      return await getSystemDebtAuctionInstance();
    }
    case 'systemSurplus': {
      return await getSystemSurplusAuctionInstance();
    }
  }
}
