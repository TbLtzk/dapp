import { put, takeEvery } from 'redux-saga/effects'
import * as actionTypes from 'store/actions/action-types/stable-coin'
import { getAllowanceSuccess, getSymbolSuccess } from 'store/actions/action-creaters/stable-coin'

import { StableCoinQUSD } from 'contracts/src/StableCoin'
import ErrorHandler from 'func/ErrorHandler'

let contractInstance = null

function getContractInstance () {
  if (contractInstance === null) {
    contractInstance = new StableCoinQUSD()
  }
  return contractInstance
}

function * getAllowance ({ userAddress, contractAddress }) {
  try {
    const contract = getContractInstance()
    const data = yield contract.allowance(userAddress, contractAddress)
    yield put(getAllowanceSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getSymbol () {
  try {
    const contract = getContractInstance()
    const data = yield contract.symbol()
    yield put(getSymbolSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [takeEvery(actionTypes.GET_ALLOWANCE, getAllowance), takeEvery(actionTypes.GET_SYMBOL, getSymbol)]
