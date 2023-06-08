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

  async function getAuctions (auctionType: AuctionType) {
    try {
      const { lastBlockHeight } = await getMinimalActiveBlockHeight();
      const { list, lastBlock } = auctions[auctionType];

      let newAuctions: AuctionInfos[] = [];
      switch (auctionType) {
        case 'liquidation': {
          newAuctions = await getLiquidation(list, lastBlock) as AuctionInfos[];
          break;
        }
        case 'systemDebt': {
          newAuctions = await getSystemDebt(list, lastBlock) as AuctionInfos[];
          break;
        }
        case 'systemSurplus': {
          newAuctions = await getSystemSurplus(list, lastBlock) as AuctionInfos[];
          break;
        }
      }

      dispatch(setAuctions({
        type: auctionType,
        list: newAuctions,
        lastActiveBlock: lastBlockHeight,
      }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  function getAllAuctions () {
    getAuctions('liquidation');
    getAuctions('systemDebt');
    getAuctions('systemSurplus');

    setTimeout(getAllAuctions, 240_000);
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
        getAuctions(auctionType);
      }
    };
  }

  async function bidForAuction ({ form, auctionType }: {
    form: BidForAuctionForm;
    auctionType: AuctionType;
  }) {
    const userAddress = getUserAddress();

    let tx: ContractTransaction;
    switch (auctionType) {
      case 'liquidation':
        tx = await bidForLiquidationAuction(form as LiquidationAuctionBid, userAddress);
        break;
      case 'systemDebt':
        tx = await bidForSystemDebtAuction(form as AuctionBid, userAddress);
        break;
      case 'systemSurplus':
        tx = await bidForSystemSurplusAction(form as AuctionBid, userAddress);
        break;
    }

    return {
      tx,
      onSuccess: () => {
        getAuctions(auctionType);
      }
    };
  }

  async function executeAuction ({ form, auctionType }: { form: ExecuteAuctionForm; auctionType: AuctionType }) {
    const userAddress = getUserAddress();

    let tx: ContractTransaction;
    switch (auctionType) {
      case 'liquidation': {
        tx = await executeLiquidationAuction(form as LiquidationAuctionExecute, userAddress);
        break;
      }
      case 'systemDebt': {
        tx = await executeSystemDebtAuction(userAddress);
        break;
      }
      case 'systemSurplus': {
        tx = await executeSystemSurplusAuction(form as AuctionExecute, userAddress);
        break;
      }
    }

    return {
      tx,
      onSuccess: () => {
        getAuctions(auctionType);
      }
    };
  }

  const activeAuctionsCount = useMemo(() => {
    return Object.values(auctions)
      .reduce((count, auct) => (count += auct.activeCount), 0);
  }, [auctions]);

  return {
    auctions,
    activeAuctionsCount,

    getAuctions: useCallback(getAuctions, []),
    getAllAuctions: useCallback(getAllAuctions, []),
    createAuction: useCallback(createAuction, []),
    bidForAuction: useCallback(bidForAuction, []),
    executeAuction: useCallback(executeAuction, []),
  };
}
