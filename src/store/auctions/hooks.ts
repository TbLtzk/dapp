import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { ContractTransaction } from 'ethers';
import { ErrorHandler } from 'helpers';
import {
  AuctionBid,
  AuctionExecute,
  AuctionInfos,
  AuctionType,
  BidForAuctionForm,
  CreateAuction,
  CreateLiquidationAuction,
  ExecuteAuctionForm,
  LiquidationAuctionBid,
  LiquidationAuctionExecute
} from 'typings/auctions';
import { StablecoinAsset } from 'typings/defi';

import { setAuctions } from './reducer';

import { getUserAddress, useAppSelector } from 'store';

import {
  bidForLiquidationAuction,
  createLiquidationAuction,
  executeLiquidationAuction,
  getLiquidation,
} from 'contracts/helpers/auction/liquidation';
import {
  bidForSystemDebtAuction,
  createSystemDebtAuction,
  executeSystemDebtAuction,
  getSystemDebt,
} from 'contracts/helpers/auction/system-debt';
import {
  bidForSystemSurplusAction,
  createSystemSurplusAuction,
  executeSystemSurplusAuction,
  getSystemSurplus,
} from 'contracts/helpers/auction/system-surplus';
import { getMinimalActiveBlockHeight } from 'contracts/helpers/block-number';

export function useAuctions () {
  const dispatch = useDispatch();
  const auctions = useAppSelector(({ auctions }) => auctions);

  async function getAuctions (auctionType: AuctionType, asset: StablecoinAsset) {
    try {
      const { lastBlockHeight } = await getMinimalActiveBlockHeight();
      const { list, lastBlock } = auctions[asset][auctionType];

      let newAuctions: AuctionInfos[] = [];
      switch (auctionType) {
        case 'liquidation': {
          newAuctions = await getLiquidation(asset, list, lastBlock) as AuctionInfos[];
          break;
        }
        case 'systemDebt': {
          newAuctions = await getSystemDebt(asset, list, lastBlock) as AuctionInfos[];
          break;
        }
        case 'systemSurplus': {
          newAuctions = await getSystemSurplus(asset, list, lastBlock) as AuctionInfos[];
          break;
        }
      }

      dispatch(setAuctions({
        type: auctionType,
        list: newAuctions,
        lastActiveBlock: lastBlockHeight,
        stablecoin: asset,
      }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function createAuction ({ form, auctionType }: {
    form: CreateAuction;
    auctionType: AuctionType;
  }) {
    const userAddress = getUserAddress();
    let tx: ContractTransaction;
    switch (auctionType) {
      case 'liquidation': {
        tx = await createLiquidationAuction(form as CreateLiquidationAuction, userAddress);
        break;
      }
      case 'systemDebt': {
        tx = await createSystemDebtAuction(form as CreateAuction, userAddress);
        break;
      }
      case 'systemSurplus': {
        tx = await createSystemSurplusAuction(form as CreateAuction);
        break;
      }
    }

    return {
      tx,
      onSuccess: () => {
        getAuctions(auctionType, form.asset);
      }
    };
  }

  async function bidForAuction ({ form, auctionType, asset }: {
    form: BidForAuctionForm;
    auctionType: AuctionType;
    asset: StablecoinAsset;
  }) {
    const userAddress = getUserAddress();

    let tx: ContractTransaction;
    switch (auctionType) {
      case 'liquidation':
        tx = await bidForLiquidationAuction(asset, form as LiquidationAuctionBid, userAddress);
        break;
      case 'systemDebt':
        tx = await bidForSystemDebtAuction(asset, form as AuctionBid, userAddress);
        break;
      case 'systemSurplus':
        tx = await bidForSystemSurplusAction(asset, form as AuctionBid, userAddress);
        break;
    }

    return {
      tx,
      onSuccess: () => {
        getAuctions(auctionType, asset);
      }
    };
  }

  async function executeAuction ({ form, auctionType, asset }: {
    form: ExecuteAuctionForm;
    auctionType: AuctionType;
    asset: StablecoinAsset;
  }) {
    const userAddress = getUserAddress();

    let tx: ContractTransaction;
    switch (auctionType) {
      case 'liquidation': {
        tx = await executeLiquidationAuction(asset, form as LiquidationAuctionExecute, userAddress);
        break;
      }
      case 'systemDebt': {
        tx = await executeSystemDebtAuction(asset, userAddress);
        break;
      }
      case 'systemSurplus': {
        tx = await executeSystemSurplusAuction(asset, form as AuctionExecute, userAddress);
        break;
      }
    }

    return {
      tx,
      onSuccess: () => {
        getAuctions(auctionType, asset);
      }
    };
  }

  const activeAuctionsCount = useMemo(() => {
    return Object.values(auctions)
      .map(item => Object.values(item))
      .flat()
      .reduce((count, auct) => (count += auct.activeCount), 0);
  }, [auctions]);

  const getActiveAuctionsCountByAsset = (asset: StablecoinAsset) => {
    return Object.values(auctions[asset])
      .reduce((count, auct) => (count += auct.activeCount), 0);
  };

  return {
    auctions,
    activeAuctionsCount,

    getActiveAuctionsCountByAsset,
    getAuctions: useCallback(getAuctions, []),
    createAuction: useCallback(createAuction, []),
    bidForAuction: useCallback(bidForAuction, []),
    executeAuction: useCallback(executeAuction, []),
  };
}
