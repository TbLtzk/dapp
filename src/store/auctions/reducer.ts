
import { isEqual, uniqWith } from 'lodash';
import { AuctionInfos, AuctionType } from 'typings/auctions';

import * as types from './types';

import { countActiveAuctions } from 'contracts/helpers/auction';

import { groupArrayByBlockNumber } from 'utils/useful';

interface AuctionItem {
  auctions: AuctionInfos[]
  isLoading: boolean
  lastBlock: number | string
  activeCount: number
}

function getDefaultAuctionState () {
  return { auctions: [], activeCount: 0, isLoading: true, lastBlock: 0 } as AuctionItem;
}

const initialState = {
  liquidation: getDefaultAuctionState(),
  systemDebt: getDefaultAuctionState(),
  systemSurplus: getDefaultAuctionState(),
} as Record<AuctionType, AuctionItem>;

export default function auctions (state = initialState, action: types.AuctionActions) {
  switch (action.type) {
    case 'SET_AUCTIONS': {
      const { auctionType, newAuctions, lastActiveBlock } = action;
      return {
        ...state,
        [auctionType]: {
          auctions: uniqWith(groupArrayByBlockNumber(newAuctions), isEqual),
          activeCount: countActiveAuctions(newAuctions),
          lastBlock: lastActiveBlock,
          isLoading: false,
        },
      };
    }
    default:
      return state;
  }
}
