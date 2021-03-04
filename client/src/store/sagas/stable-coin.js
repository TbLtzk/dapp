import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from 'store/actions/action-types/stable-coin';
import { getAllowanceSuccess, getSymbolSuccess } from 'store/actions/action-creaters/stable-coin';

import { StableCoinQUSD } from 'contracts/src/StableCoin';

let contractInstance = null;

function getContractInstance() {
  if (contractInstance === null) {
    contractInstance = new StableCoinQUSD();
  }
  return contractInstance;
}

function* getAllowance({ userAddress, contractAddress }) {
  try {
    const contract = getContractInstance();
    const data = yield contract.allowance(userAddress, contractAddress);
    yield put(getAllowanceSuccess(data));
  } catch (err) {
    console.error('getAllowance.Error', err);
  }
}

function* getSymbol() {
  try {
    const contract = getContractInstance();
    const data = yield contract.symbol();
    yield put(getSymbolSuccess(data));
  } catch (err) {
    console.error('getSymbol.Error', err);
  }
}

export default [
  takeEvery(actionTypes.GET_ALLOWANCE, getAllowance),
  takeEvery(actionTypes.GET_SYMBOL, getSymbol),
];
