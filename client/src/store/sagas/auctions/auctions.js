import { call, put, takeEvery, select } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/auctions/auctions';
import {
  setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess
} from 'store/actions/action-creaters/transaction-handler';

import {
  getAuctionsListError, getAuctionsListSuccess,
  getAuction, getAuctionSuccess, getAuctionError, getEmptyAuctionSuccess,
  createAuctionSuccess, createAuctionError, bidForAuctionSuccess
} from 'store/actions/action-creaters/auctions/auctions';
import {
  creationLiquidationContractObj,
  creationSystemDebtContractObj,
  creationSystemSurplusContractObj
} from 'contracts/handler/AuctionHandler';
import AuctionService from '../../../contracts/src/auction/AuctionService';

function* createAuction({ data }) {
  console.log('data', data);
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);

    let result = null;
    if (data) {
      let contract = null;
      switch (data?.first) {
        case 'liquidation':
          contract = creationLiquidationContractObj();
          break;
        case 'system-debt':
          contract = creationSystemDebtContractObj();
          break;
        case 'system-surplus':
          contract = creationSystemSurplusContractObj();
          break;
        default:
          return null;
      }
      result = yield contract.createAuction(data, userAddress);
      if (result) {
        const inf = {
          'user': result?.events?.AuctionStarted?.returnValues?._user,
          'vaultId': result?.events?.AuctionStarted?.returnValues?._vaultId
        };
        yield call(getAuctionDependsOnType, contract?.contractName, inf, true);
      }
    }

    yield put(createAuctionSuccess(result));
    yield put(setTransactionLoadingSuccess());

  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

function* getAuctionDependsOnType(contractName, inf, activeAuction) {
  try {
    switch (contractName) {
      case 'LiquidationAuction':
        yield put(getAuction(contractName, inf, 'liquidation', activeAuction));
        break;
      case 'SystemDebtAuction':
        yield put(getAuction(contractName, inf, 'system-debt', activeAuction));
        break;
      case 'SystemSurplusAuction':
        yield put(getAuction(contractName, inf, 'system-surplus', activeAuction));
        break;
      default:
        return null;
    }
  } catch (e) {
    console.log('e', e);
  }
}

function* getOneAuction({ contractName, inf, activeTab, activeAuction }) {
  try {
    let contract = null;
    switch (activeTab) {
      case 'liquidation':
        contract = creationLiquidationContractObj(contractName);
        break;
      case 'system-debt':
        contract = creationSystemDebtContractObj();
        break;
      case 'system-surplus':
        contract = creationSystemSurplusContractObj(contractName);
        break;
    }
    if (contract) {
      let data = null;
      data = yield contract.getOneAuction(inf);
      console.log("data", data);
      if (data) {
        yield put(getAuctionSuccess(data));
      } else {
        yield put(getEmptyAuctionSuccess(inf));
      }
    }
  } catch (err) {
    console.log('err', err);
    yield put(getAuctionError(id));
  }
}

function* getAuctionsList({ activeTab, activeAuction }) {
  try {
    let contract = null;
    switch (activeTab) {
      case 'liquidation':
        contract = creationLiquidationContractObj();
        break;
      case 'system-debt':
        contract = creationSystemDebtContractObj();
        break;
      case 'system-surplus':
        contract = creationSystemSurplusContractObj();
        break;
    }
    let result = [];
    result = yield contract?.getAuctions(activeAuction);

    yield put(getAuctionsListSuccess(result));
  } catch (e) {
    console.log('e', e);
    yield put(getAuctionsListError(e));
  }
}

function* bidForAuctionHandler({ data }) {
  console.log('data', data);
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);
    let contract = null;
    let result = null;
    switch (data?.contract) {
      case 'LiquidationAuction':
        contract = creationLiquidationContractObj();
        result = yield contract.bid(data.user, data.vaultId, data.bid, userAddress);
        break;
      case 'SystemDebtAuction':
        contract = creationSystemDebtContractObj();
        break;
      case 'SystemSurplusAuction':
        contract = creationSystemSurplusContractObj();
        result = yield contract.bid(data.id, data.bid, userAddress);
        break;
      default:
        return null;
    }


    // if (data?.user && data?.vaultId && data?.bid) {
    //   const contract = new AuctionService(data?.contract);
    //   result = yield contract.bid(data.user, data.vaultId, data.bid, userAddress);
    // }
    yield call(getAuctionDependsOnType, data?.contract, data, true);
    yield put(bidForAuctionSuccess(result));
    yield put(setTransactionLoadingSuccess());

  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

function* executeAuctionHandler({ data }) {
  console.log('data', data);
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);
    let contract = null;
    let result = null;
    switch (data?.contract) {
      case 'LiquidationAuction':
        contract = creationLiquidationContractObj();
        result = yield contract.execute(data.user, data.vaultId, userAddress);
        break;
      case 'SystemDebtAuction':
        contract = creationSystemDebtContractObj();
        break;
      case 'SystemSurplusAuction':
        contract = creationSystemSurplusContractObj();
        result = yield contract.execute(data.id, userAddress);
        break;
      default:
        return null;
    }

    yield call(getAuctionDependsOnType, data?.contract, data, true);
    yield put(setTransactionLoadingSuccess());

  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

export default [
  takeEvery(actionTypes.CREATE_AUCTION, createAuction),
  takeEvery(actionTypes.GET_AUCTIONS_LIST, getAuctionsList),
  takeEvery(actionTypes.GET_AUCTION, getOneAuction),
  takeEvery(actionTypes.BID_FOR_AUCTION, bidForAuctionHandler),
  takeEvery(actionTypes.EXECUTE_AUCTION, executeAuctionHandler),
];
