import { call, put, takeEvery, select } from 'redux-saga/effects'

import * as actionTypes from './action-types'
import {
  setErrorMessage,
  setTransactionLoading,
  setTransactionLoadingSuccess
} from 'store/transaction-handler/action-creators'

import {
  getEndedAuctionsListSuccess,
  getEndedAuctionsListError,
  getAuctionsListError,
  getAuctionsListSuccess,
  getAuction,
  getAuctionSuccess,
  getAuctionError,
  getEmptyAuctionSuccess,
  createAuctionSuccess,
  bidForAuctionSuccess,
  executeAuctionSuccess
} from './action-creators'
import {
  creationLiquidationContractObj,
  creationSystemDebtContractObj,
  creationSystemSurplusContractObj
} from 'contracts/helpers/auction-helper'
import { AUCTIONS_TYPES } from 'constants/statuses'
import { CONTRACT_TYPES } from 'constants/contracts'
import ErrorHandler from 'func/ErrorHandler'

function * createAuction ({ data }) {
  try {
    yield put(setTransactionLoading(1))
    const { userAddress } = yield select((state) => state.userInf)
    let result = null
    if (data) {
      let contract = null
      switch (data?.first) {
        case AUCTIONS_TYPES.liquidation:
          contract = creationLiquidationContractObj()
          break
        case AUCTIONS_TYPES.systemDebt:
          contract = creationSystemDebtContractObj()
          break
        case AUCTIONS_TYPES.systemSurplus:
          contract = creationSystemSurplusContractObj()
          break
        default:
          return null
      }
      result = yield contract.createAuction(data, userAddress)
      if (result) {
        const inf = {
          user: result?.events?.AuctionStarted?.returnValues?._user,
          vaultId: result?.events?.AuctionStarted?.returnValues?._vaultId,
          id: result?.events?.AuctionStarted?.returnValues?._auctionId
        }
        yield call(getAuctionDependsOnType, contract?.contractName, inf, true)
      }
    }
    yield put(createAuctionSuccess(result))
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  }
}

function * getAuctionDependsOnType (contractName, inf, activeAuction) {
  try {
    switch (contractName) {
      case CONTRACT_TYPES.liquidationAuction:
        yield put(getAuction(contractName, inf, AUCTIONS_TYPES.liquidation, activeAuction))
        break
      case CONTRACT_TYPES.systemDebtAuction:
        yield put(getAuction(contractName, inf, AUCTIONS_TYPES.systemDebt, activeAuction))
        break
      case CONTRACT_TYPES.systemSurplusAuction:
        yield put(getAuction(contractName, inf, AUCTIONS_TYPES.systemSurplus, activeAuction))
        break
      default:
        return null
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getOneAuction ({ contractName, inf, activeTab, activeAuction }) {
  try {
    let contract = null
    switch (activeTab) {
      case AUCTIONS_TYPES.liquidation:
        contract = creationLiquidationContractObj(contractName)
        break
      case AUCTIONS_TYPES.systemDebt:
        contract = creationSystemDebtContractObj()

        break
      case AUCTIONS_TYPES.systemSurplus:
        contract = creationSystemSurplusContractObj(contractName)
        break
    }
    if (contract) {
      let data = null
      data = yield contract.getOneAuction(inf)
      if (data) {
        yield put(getAuctionSuccess(data))
      } else {
        yield put(getEmptyAuctionSuccess(inf))
      }
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getAuctionError())
  }
}

function * getAuctionsList ({ activeTab, activeAuction }) {
  try {
    let contract = null
    switch (activeTab) {
      case AUCTIONS_TYPES.liquidation:
        contract = creationLiquidationContractObj()
        break
      case AUCTIONS_TYPES.systemDebt:
        contract = creationSystemDebtContractObj()
        break
      case AUCTIONS_TYPES.systemSurplus:
        contract = creationSystemSurplusContractObj()
        break
    }
    let result = []
    result = yield contract?.getAuctions(activeAuction)

    yield put(
      getAuctionsListSuccess({
        result,
        activeTab: activeTab
      })
    )
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getAuctionsListError(error))
  }
}

function * getEndedAuctionsList ({ activeTab, activeAuction }) {
  try {
    let contract = null
    switch (activeTab) {
      case AUCTIONS_TYPES.liquidation:
        contract = creationLiquidationContractObj()
        break
      case AUCTIONS_TYPES.systemDebt:
        contract = creationSystemDebtContractObj()
        break
      case AUCTIONS_TYPES.systemSurplus:
        contract = creationSystemSurplusContractObj()
        break
    }
    let result = []
    result = yield contract?.getAuctions(activeAuction)

    yield put(getEndedAuctionsListSuccess(result))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getEndedAuctionsListError(error))
  }
}

function * bidForAuctionHandler ({ data }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)
    let contract = null
    let result = null
    switch (data?.contract) {
      case CONTRACT_TYPES.liquidationAuction:
        contract = creationLiquidationContractObj()
        result = yield contract.bid(data.user, data.vaultId, data.bid, userAddress)
        break
      case CONTRACT_TYPES.systemDebtAuction:
        contract = creationSystemDebtContractObj()
        result = yield contract.bid(data.bid, userAddress)
        break
      case CONTRACT_TYPES.systemSurplusAuction:
        contract = creationSystemSurplusContractObj()
        result = yield contract.bid(data.id, data.bid, userAddress)
        break
      default:
        return null
    }

    yield call(getAuctionDependsOnType, data?.contract, data, true)
    yield put(bidForAuctionSuccess(result))
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  }
}

function * executeAuctionHandler ({ data }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)
    let contract = null
    let result = null
    switch (data?.contract) {
      case CONTRACT_TYPES.liquidationAuction:
        contract = creationLiquidationContractObj()
        result = yield contract.execute(data.user, data.vaultId, userAddress)
        break
      case CONTRACT_TYPES.systemDebtAuction:
        contract = creationSystemDebtContractObj()
        result = yield contract.execute(userAddress)
        break
      case CONTRACT_TYPES.systemSurplusAuction:
        contract = creationSystemSurplusContractObj()
        result = yield contract.execute(data.id, userAddress)
        break
      default:
        return null
    }

    yield call(getAuctionDependsOnType, data?.contract, data, true)
    yield put(executeAuctionSuccess(result))
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  }
}

export default [
  takeEvery(actionTypes.CREATE_AUCTION, createAuction),
  takeEvery(actionTypes.GET_AUCTIONS_LIST, getAuctionsList),
  takeEvery(actionTypes.GET_ENDED_AUCTIONS_LIST, getEndedAuctionsList),
  takeEvery(actionTypes.GET_AUCTION, getOneAuction),
  takeEvery(actionTypes.BID_FOR_AUCTION, bidForAuctionHandler),
  takeEvery(actionTypes.EXECUTE_AUCTION, executeAuctionHandler)
]
