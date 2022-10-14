
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import isEqual from 'lodash/isEqual';
import orderBy from 'lodash/orderBy';
import uniqWith from 'lodash/uniqWith';
import { AuctionInfos, AuctionType } from 'typings/auctions';

import { countActiveAuctions } from 'contracts/helpers/auction';

interface AuctionItem {
  list: AuctionInfos[];
  isLoading: boolean;
  lastBlock: number | string;
  activeCount: number;
}

function getDefaultAuctionState (): AuctionItem {
  return {
    list: [],
    activeCount: 0,
    isLoading: true,
    lastBlock: 0
  };
}

const initialState: Record<AuctionType, AuctionItem> = {
  liquidation: getDefaultAuctionState(),
  systemDebt: getDefaultAuctionState(),
  systemSurplus: getDefaultAuctionState(),
};

const auctionsSlice = createSlice({
  name: 'auctions',
  initialState,
  reducers: {
    setAuctions (state, { payload }: PayloadAction<{
      type: AuctionType;
      list: AuctionInfos[];
      lastActiveBlock: number | string;
    }>) {
      state[payload.type] = {
        list: uniqWith(orderBy(payload.list, 'blockNumber', 'desc'), isEqual),
        activeCount: countActiveAuctions(payload.list),
        lastBlock: payload.lastActiveBlock,
        isLoading: false,
      };
    }
  }
});

export const { setAuctions } = auctionsSlice.actions;
export default auctionsSlice.reducer;
