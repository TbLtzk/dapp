import { call, put, takeEvery, select, delay, all } from 'redux-saga/effects'

import * as actionTypes from './action-types'
import { setErrorMessage, setTransactionLoading } from 'store/transaction-handler/action-creators'

import {
  getAuctionSuccess,
  getAuctionError,
  getEmptyAuctionSuccess,
  setLiquidationAuctionCount,
  setSystemDebtAuctionCount,
  setSystemSurplusAuctionCount,
  setSystemDebtAuctions,
  setSystemSurplusAuctions,
  setLiquidationAuctions
} from './action-creators'
import {
  creationLiquidationContractObj,
  creationSystemDebtContractObj,
  creationSystemSurplusContractObj
} from 'contracts/helpers/auctions-helpers/auction-helper'
import { AUCTIONS_TYPES } from 'constants/statuses'
import { CONTRACTS_NAMES, CONTRACT_TYPES } from 'constants/contracts'
import ErrorHandler from 'func/ErrorHandler'

function * getAuctionsGenerator ({ auctionTypes = '' }) {
  try {
    const liquidationAuctionInstance = creationLiquidationContractObj()
    const systemSurplusAuctionInstance = creationSystemDebtContractObj()
    const systemDebtAuctionInstance = creationSystemSurplusContractObj()

    switch (auctionTypes) {
      case AUCTIONS_TYPES.liquidation: {
        const auctions = yield liquidationAuctionInstance.getAuctions()
        yield put(
          setLiquidationAuctionCount({
            endedAuctions: auctions.endedAuctions.length,
            activeAuctions: auctions.activeAuctions.length
          })
        )
        yield put(setLiquidationAuctions(auctions))
        break
      }
      case AUCTIONS_TYPES.systemDebt: {
        const auctions = yield systemSurplusAuctionInstance.getAuctions()
        yield put(
          setSystemDebtAuctionCount({
            endedAuctions: auctions.endedAuctions.length,
            activeAuctions: auctions.activeAuctions.length
          })
        )
        yield put(setSystemDebtAuctions(auctions))
        break
      }
      case AUCTIONS_TYPES.systemSurplus: {
        const auctions = yield systemDebtAuctionInstance.getAuctions()
        yield put(
          setSystemSurplusAuctionCount({
            endedAuctions: auctions.endedAuctions.length,
            activeAuctions: auctions.activeAuctions.length
          })
        )
        yield put(setSystemSurplusAuctions(auctions))
        break
      }
      default: {
        const contracts = [liquidationAuctionInstance, systemSurplusAuctionInstance, systemDebtAuctionInstance]
        const auctions = yield all(contracts.map((contract) => contract.getAuctions()))
        const auctionCount = {}
        auctions.forEach((auction) => {
          auctionCount[auction.contract] = {
            activeAuctions: auction.activeAuctions.length,
            endedAuctions: auction.endedAuctions.length
          }
        })
        yield put(setSystemSurplusAuctionCount(auctionCount.systemSurplusAuction))
        yield put(setSystemDebtAuctionCount(auctionCount.systemDebtAuction))
        yield put(setLiquidationAuctionCount(auctionCount.liquidationAuction))

        yield put(
          setSystemSurplusAuctions(auctions.find((auction) => auction.contract === CONTRACT_TYPES.systemSurplusAuction))
        )
        yield put(
          setSystemDebtAuctions(auctions.find((auction) => auction.contract === CONTRACT_TYPES.systemDebtAuction))
        )
        yield put(
          setLiquidationAuctions(auctions.find((auction) => auction.contract === CONTRACT_TYPES.liquidationAuction))
        )
      }
    }

    yield delay(800000)
    yield call(getAuctionsGenerator)
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * createAuction ({ data }) {
  try {
    yield put(setTransactionLoading(1))
    const { userAddress } = yield select((state) => state.userInf)
    let contract
    switch (data.contract) {
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
    yield contract.createAuction(data, userAddress)
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionLoading(-1))
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

function * bidForAuctionHandler ({ data }) {
  try {
    yield put(setTransactionLoading(1))
    const { userAddress } = yield select((state) => state.userInf)
    switch (data.contract) {
      case CONTRACTS_NAMES.liquidationAuction: {
        const contract = creationLiquidationContractObj()
        yield contract.bid(data.user, data.vaultId, data.bid, userAddress)
        break
      }
      case CONTRACTS_NAMES.systemDebtAuction: {
        const contract = creationSystemDebtContractObj()
        yield contract.bid(data.bid, userAddress)
        break
      }
      case CONTRACTS_NAMES.systemSurplusAuction: {
        const contract = creationSystemSurplusContractObj()
        yield contract.bid(data.id, data.bid, userAddress)
        break
      }
      default:
        return null
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionLoading(-1))
  }
}

function * executeAuctionHandler ({ data }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)
    switch (data.contract) {
      case CONTRACTS_NAMES.liquidationAuction: {
        const contract = creationLiquidationContractObj()
        yield contract.execute(data.user, data.vaultId, userAddress)
        break
      }
      case CONTRACTS_NAMES.systemDebtAuction: {
        const contract = creationSystemDebtContractObj()
        yield contract.execute(userAddress)
        break
      }
      case CONTRACTS_NAMES.systemSurplusAuction: {
        const contract = creationSystemSurplusContractObj()
        yield contract.execute(data.id, userAddress)
        break
      }
      default:
        return null
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionLoading(-1))
  }
}

export default [
  takeEvery(actionTypes.GET_AUCTIONS, getAuctionsGenerator),
  takeEvery(actionTypes.GET_AUCTION, getOneAuction),

  takeEvery(actionTypes.CREATE_AUCTION, createAuction),
  takeEvery(actionTypes.BID_FOR_AUCTION, bidForAuctionHandler),
  takeEvery(actionTypes.EXECUTE_AUCTION, executeAuctionHandler)
]
