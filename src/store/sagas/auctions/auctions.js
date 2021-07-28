import { call, put, takeEvery, select } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/auctions/auctions'
import {
  setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess
} from 'store/actions/action-creaters/transaction-handler'

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
} from 'store/actions/action-creaters/auctions/auctions'
import {
  creationLiquidationContractObj,
  creationSystemDebtContractObj,
  creationSystemSurplusContractObj
} from 'contracts/handler/AuctionHandler'
import { AUCTIONS_TYPES } from 'constants/statuses'

function * createAuction ({ data }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select(state => state.userInf)

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
  } catch (err) {
    console.log('err', err.message)
    yield put(setTransactionLoadingError(err.message))
  }
}

function * getAuctionDependsOnType (contractName, inf, activeAuction) {
  try {
    switch (contractName) {
      case 'LiquidationAuction':
        yield put(getAuction(contractName, inf, AUCTIONS_TYPES.liquidation, activeAuction))
        break
      case 'SystemDebtAuction':
        yield put(getAuction(contractName, inf, AUCTIONS_TYPES.systemDebt, activeAuction))
        break
      case 'SystemSurplusAuction':
        yield put(getAuction(contractName, inf, AUCTIONS_TYPES.systemSurplus, activeAuction))
        break
      default:
        return null
    }
  } catch (e) {
    console.log('e', e)
  }
}

function * getOneAuction ({
  contractName,
  inf,
  activeTab,
  activeAuction
}) {
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
  } catch (err) {
    console.log('err', err)
    yield put(getAuctionError())
  }
}

function * getAuctionsList ({
  activeTab,
  activeAuction
}) {
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

    yield put(getAuctionsListSuccess({
      result,
      activeTab: activeTab
    }))
  } catch (e) {
    console.log('e', e)
    yield put(getAuctionsListError(e))
  }
}

function * getEndedAuctionsList ({
  activeTab,
  activeAuction
}) {
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
  } catch (e) {
    console.log('e', e)
    yield put(getEndedAuctionsListError(e))
  }
}

function * bidForAuctionHandler ({ data }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select(state => state.userInf)
    let contract = null
    let result = null
    switch (data?.contract) {
      case 'LiquidationAuction':
        contract = creationLiquidationContractObj()
        result = yield contract.bid(data.user, data.vaultId, data.bid, userAddress)
        break
      case 'SystemDebtAuction':
        contract = creationSystemDebtContractObj()
        result = yield contract.bid(data.bid, userAddress)
        break
      case 'SystemSurplusAuction':
        contract = creationSystemSurplusContractObj()
        result = yield contract.bid(data.id, data.bid, userAddress)
        break
      default:
        return null
    }

    yield call(getAuctionDependsOnType, data?.contract, data, true)
    yield put(bidForAuctionSuccess(result))
    yield put(setTransactionLoadingSuccess())
  } catch (err) {
    console.log('err', err.message)
    yield put(setTransactionLoadingError(err.message))
  }
}

function * executeAuctionHandler ({ data }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select(state => state.userInf)
    let contract = null
    let result = null
    switch (data?.contract) {
      case 'LiquidationAuction':
        contract = creationLiquidationContractObj()
        result = yield contract.execute(data.user, data.vaultId, userAddress)
        break
      case 'SystemDebtAuction':
        contract = creationSystemDebtContractObj()
        result = yield contract.execute(userAddress)
        break
      case 'SystemSurplusAuction':
        contract = creationSystemSurplusContractObj()
        result = yield contract.execute(data.id, userAddress)
        break
      default:
        return null
    }

    yield call(getAuctionDependsOnType, data?.contract, data, true)
    yield put(executeAuctionSuccess(result))
    yield put(setTransactionLoadingSuccess())
  } catch (err) {
    console.log('err', err.message)
    yield put(setTransactionLoadingError(err.message))
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
