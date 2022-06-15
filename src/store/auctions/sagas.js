import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import {
  getAuctions,
  setLiquidationAuctions,
  setOneAuction,
  setSystemDebtAuctions,
  setSystemSurplusAuctions,
} from './action-creators';
import * as actionTypes from './action-types';

import { getSavingAviableToDeposit } from 'store/saving-assets/action-creators';
import { getDebt, getSurplus, getSystemBalance } from 'store/system-balance/action-creators';
import { getAvailableAmount } from 'store/system-reserve/action-creators';
import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/action-creators';

import { transformAuctionNameToAuctionType } from 'contracts/helpers/auctions-helpers/auction-service-helper';
import { creationLiquidationContractObj } from 'contracts/helpers/auctions-helpers/liquidation-auction-helper';
import { creationSystemDebtContractObj } from 'contracts/helpers/auctions-helpers/system-debt-auction-helper';
import { creationSystemSurplusContractObj } from 'contracts/helpers/auctions-helpers/system-surplus-auction-helper';

import { CONTRACT_TYPES } from 'constants/contracts';
import formTypes from 'constants/form-types';
import { AUCTIONS_TYPES, TRANSACTION_TYPES } from 'constants/statuses';
import ErrorHandler from 'func/ErrorHandler';

function * updateValuesGenerator () {
  yield put(getSurplus());
  yield put(getDebt());
  yield put(getSystemBalance());
  yield put(getAvailableAmount());
  yield put(getSavingAviableToDeposit());
}

function * getAuctionsGenerator ({ auctionTypes = '' }) {
  try {
    const liquidationAuctionInstance = creationLiquidationContractObj();
    const systemSurplusAuctionInstance = creationSystemDebtContractObj();
    const systemDebtAuctionInstance = creationSystemSurplusContractObj();

    switch (auctionTypes) {
      case AUCTIONS_TYPES.liquidation: {
        const auctions = yield liquidationAuctionInstance.getAuctions();
        yield put(setLiquidationAuctions(auctions));
        break;
      }
      case AUCTIONS_TYPES.systemDebt: {
        const auctions = yield systemSurplusAuctionInstance.getAuctions();
        yield put(setSystemDebtAuctions(auctions));
        break;
      }
      case AUCTIONS_TYPES.systemSurplus: {
        const auctions = yield systemDebtAuctionInstance.getAuctions();
        yield put(setSystemSurplusAuctions(auctions));
        break;
      }
      default: {
        const contracts = [liquidationAuctionInstance, systemSurplusAuctionInstance, systemDebtAuctionInstance];
        const auctions = yield all(contracts.map((contract) => contract.getAuctions()));
        yield put(
          setSystemSurplusAuctions(auctions.find((auction) => auction.contract === CONTRACT_TYPES.systemSurplusAuction))
        );
        yield put(
          setSystemDebtAuctions(auctions.find((auction) => auction.contract === CONTRACT_TYPES.systemDebtAuction))
        );
        yield put(
          setLiquidationAuctions(auctions.find((auction) => auction.contract === CONTRACT_TYPES.liquidationAuction))
        );
      }
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * createAuction ({ data }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select((state) => state.userInf);
    let contract;
    let auctionType;
    let formType = '';
    switch (data.contract) {
      case AUCTIONS_TYPES.liquidation: {
        contract = creationLiquidationContractObj();
        auctionType = AUCTIONS_TYPES.liquidation;
        formType = formTypes.liquidationAuction;
        break;
      }
      case AUCTIONS_TYPES.systemDebt: {
        contract = creationSystemDebtContractObj();
        auctionType = AUCTIONS_TYPES.systemDebt;
        formType = formTypes.debtAuction;
        break;
      }
      case AUCTIONS_TYPES.systemSurplus: {
        contract = creationSystemSurplusContractObj();
        auctionType = AUCTIONS_TYPES.systemSurplus;
        formType = formTypes.surplusAuction;
        break;
      }
      default: {
        return null;
      }
    }
    yield contract.createAuction(data, userAddress);
    yield put(getAuctions(auctionType));
    yield call(updateValuesGenerator);

    yield put(setTransactionLoadingSuccess({ type: formType }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * getOneAuctionGenerator ({ auctionType, auctionId, address }) {
  try {
    let contract;
    switch (auctionType) {
      case AUCTIONS_TYPES.liquidation:
        contract = creationLiquidationContractObj();
        break;
      case AUCTIONS_TYPES.systemDebt:
        contract = creationSystemDebtContractObj();
        break;
      case AUCTIONS_TYPES.systemSurplus:
        contract = creationSystemSurplusContractObj();
        break;
    }
    const auction = yield contract.getOneAuction(auctionId, address);
    yield put(setOneAuction(auction));
    yield call(updateValuesGenerator);
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * bidForAuctionGenerator ({ data }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select((state) => state.userInf);
    const contractType = transformAuctionNameToAuctionType(data.contract);
    switch (contractType) {
      case AUCTIONS_TYPES.liquidation: {
        const contract = creationLiquidationContractObj();
        yield contract.bid(data.user, data.id, data.bid, userAddress);
        break;
      }
      case AUCTIONS_TYPES.systemDebt: {
        const contract = creationSystemDebtContractObj();
        yield contract.bid(data.bid, userAddress);
        break;
      }
      case AUCTIONS_TYPES.systemSurplus: {
        const contract = creationSystemSurplusContractObj();
        yield contract.bid(data.id, data.bid, userAddress);
        break;
      }
      default:
        return null;
    }
    yield put(getAuctions(contractType));
    yield call(updateValuesGenerator);

    yield put(setTransactionLoadingSuccess({ type: formTypes.bid }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * executeAuctionHandler ({ data }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select((state) => state.userInf);
    const contractType = transformAuctionNameToAuctionType(data.contract);

    switch (contractType) {
      case AUCTIONS_TYPES.liquidation: {
        const contract = creationLiquidationContractObj();
        yield contract.execute(data.user, data.id, userAddress);
        break;
      }
      case AUCTIONS_TYPES.systemDebt: {
        const contract = creationSystemDebtContractObj();
        yield contract.execute(userAddress);
        break;
      }
      case AUCTIONS_TYPES.systemSurplus: {
        const contract = creationSystemSurplusContractObj();
        yield contract.execute(data.id, userAddress);
        break;
      }
      default:
        return null;
    }
    yield put(getAuctions(contractType));
    yield call(updateValuesGenerator);
    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

export default [
  takeEvery(actionTypes.GET_AUCTIONS, getAuctionsGenerator),
  takeEvery(actionTypes.GET_ONE_AUCTION, getOneAuctionGenerator),

  takeEvery(actionTypes.CREATE_AUCTION, createAuction),
  takeEvery(actionTypes.BID_FOR_AUCTION, bidForAuctionGenerator),
  takeEvery(actionTypes.EXECUTE_AUCTION, executeAuctionHandler),
];
