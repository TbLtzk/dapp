import { call, delay, put, select, takeEvery } from 'typed-redux-saga';
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
  LiquidationAuctionExecute,
} from 'typings/auctions';

import { getAllAuctions, getAuctions, setAuctions } from './actions';
import * as types from './types';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/actions';

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

import formTypes from 'constants/form-types';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';

function* getAuctionsGenerator ({ auctionType }: types.GetAuctions) {
  try {
    const { lastBlockHeight } = yield* call(getMinimalActiveBlockHeight);
    const { auctions, lastBlock } = yield* select((state) => state.auctions[auctionType]);
    switch (auctionType) {
      case 'liquidation': {
        const newAuctions = yield* call(getLiquidation, auctions, lastBlock);
        yield* put(setAuctions(auctionType, newAuctions as AuctionInfos[], lastBlockHeight));
        break;
      }
      case 'systemDebt': {
        const newAuctions = yield* call(getSystemDebt, auctions, lastBlock);
        yield* put(setAuctions(auctionType, newAuctions as AuctionInfos[], lastBlockHeight));
        break;
      }
      case 'systemSurplus': {
        const newAuctions = yield* call(getSystemSurplus, auctions, lastBlock);
        yield* put(setAuctions(auctionType, newAuctions as AuctionInfos[], lastBlockHeight));
        break;
      }
    }
  } catch (error) {
    captureError(error);
  }
}

function* getAllAuctionsGenerator () {
  yield* put(getAuctions('liquidation'));
  yield* put(getAuctions('systemDebt'));
  yield* put(getAuctions('systemSurplus'));
  yield* delay(240000);
  yield* put(getAllAuctions());
}

function* createAuction ({
  form,
  auctionType,
  label,
}: {
  form: CreateAuction;
  auctionType: AuctionType;
  label: string;
}) {
  try {
    yield* put(setTransactionLoading());
    const { userAddress } = yield* select((state) => state.userInf);
    let transaction;
    switch (auctionType) {
      case 'liquidation': {
        transaction = yield* call(createLiquidationAuction, form as CreateLiquidationAuction, userAddress);
        break;
      }
      case 'systemDebt': {
        transaction = yield* call(createSystemDebtAuction, form as CreateAuction, userAddress);
        break;
      }
      case 'systemSurplus': {
        transaction = yield* call(createSystemSurplusAuction, form as CreateAuction, userAddress);
        break;
      }
    }
    yield* put(getAuctions(auctionType));
    yield* put(setTransactionLoadingSuccess(getSuccessMessage(auctionType, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* bidForAuctionGenerator ({
  form,
  auctionType,
  label
}: {
  form: BidForAuctionForm;
  auctionType: AuctionType;
  label: string;
}) {
  try {
    yield* put(setTransactionLoading());
    const { userAddress } = yield* select((state) => state.userInf);
    let transaction;

    switch (auctionType) {
      case 'liquidation': {
        transaction = yield* call(bidForLiquidationAuction, form as LiquidationAuctionBid, userAddress);
        break;
      }
      case 'systemDebt': {
        transaction = yield* call(bidForSystemDebtAuction, form as AuctionBid, userAddress);
        break;
      }
      case 'systemSurplus': {
        transaction = yield* call(bidForSystemSurplusAction, form as AuctionBid, userAddress);
        break;
      }
    }
    yield* put(getAuctions(auctionType));
    yield* put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.bidForAuction, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* executeAuctionGenerator ({
  form,
  auctionType,
  label
}: {
  form: ExecuteAuctionForm;
  auctionType: AuctionType;
  label: string;
}) {
  try {
    yield* put(setTransactionLoading());

    const { userAddress } = yield* select((state) => state.userInf);
    let transaction;
    switch (auctionType) {
      case 'liquidation': {
        transaction = yield* call(executeLiquidationAuction, form as LiquidationAuctionExecute, userAddress);
        break;
      }
      case 'systemDebt': {
        transaction = yield* call(executeSystemDebtAuction, userAddress);
        break;
      }
      case 'systemSurplus': {
        transaction = yield* call(executeSystemSurplusAuction, form as AuctionExecute, userAddress);
        break;
      }
    }
    yield* put(getAuctions(auctionType));
    yield* put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.executeAuction, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

export default [
  takeEvery<types.GetAuctions>('GET_AUCTIONS', getAuctionsGenerator),
  takeEvery<types.GetAllAuctions>('GET_ALL_AUCTIONS', getAllAuctionsGenerator),

  takeEvery<types.CreateAuction>('CREATE_AUCTION', createAuction),
  takeEvery<types.BidForAuction>('BID_FOR_AUCTION', bidForAuctionGenerator),
  takeEvery<types.ExecuteAuction>('EXECUTE_AUCTION', executeAuctionGenerator),
];
