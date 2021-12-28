import { put, takeEvery, select, all } from 'redux-saga/effects'

import * as actionTypes from './action-types'
import { setErrorMessage, setTransactionLoading } from 'store/transaction-handler/action-creators'

import {
  getAuctionError,
  setLiquidationAuctionCount,
  setSystemDebtAuctionCount,
  setSystemSurplusAuctionCount,
  setSystemDebtAuctions,
  setSystemSurplusAuctions,
  setLiquidationAuctions,
  getAuctions,
  setOneAuction
} from './action-creators'

import { AUCTIONS_TYPES } from 'constants/statuses'
import { CONTRACT_TYPES } from 'constants/contracts'
import ErrorHandler from 'func/ErrorHandler'
import { creationLiquidationContractObj } from 'contracts/helpers/auctions-helpers/liquidation-auction-helper'
import { creationSystemDebtContractObj } from 'contracts/helpers/auctions-helpers/system-debt-auction-helper'
import { creationSystemSurplusContractObj } from 'contracts/helpers/auctions-helpers/system-surplus-auction-helper'
import { transformAuctionNameToAuctionType } from 'contracts/helpers/auctions-helpers/auction-service-helper'
import { getDebt, getSurplus, getSystemBalance } from 'store/system-balance/action-creators'
import { getAvailableAmount } from 'store/system-reserve/action-creators'
import { getSavingAviableToDeposit } from 'store/saving-assets/action-creators'

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
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * createAuction ({ data }) {
  try {
    yield put(setTransactionLoading(1))
    const { userAddress } = yield select((state) => state.userInf)
    let contract
    let auctionType
    switch (data.contract) {
      case AUCTIONS_TYPES.liquidation: {
        contract = creationLiquidationContractObj()
        auctionType = AUCTIONS_TYPES.liquidation
        break
      }
      case AUCTIONS_TYPES.systemDebt: {
        contract = creationSystemDebtContractObj()
        auctionType = AUCTIONS_TYPES.systemDebt
        break
      }
      case AUCTIONS_TYPES.systemSurplus: {
        contract = creationSystemSurplusContractObj()
        auctionType = AUCTIONS_TYPES.systemSurplus
        break
      }
      default: {
        return null
      }
    }
    yield contract.createAuction(data, userAddress)
    yield put(getAuctions(auctionType))
    yield put(getSurplus())
    yield put(getDebt())
    yield put(getSystemBalance())
    yield put(getAvailableAmount())
    yield put(getSavingAviableToDeposit())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionLoading(-1))
  }
}

function * getOneAuctionGenerator ({ auctionType, auctionId }) {
  try {
    let contract
    switch (auctionType) {
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
    const auction = yield contract.getOneAuction(auctionId)
    yield put(setOneAuction(auctionType, auction))
    yield put(getSurplus())
    yield put(getDebt())
    yield put(getSystemBalance())
    yield put(getAvailableAmount())
    yield put(getSavingAviableToDeposit())
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getAuctionError())
  }
}

function * bidForAuctionGenerator ({ data }) {
  try {
    yield put(setTransactionLoading(1))
    const { userAddress } = yield select((state) => state.userInf)
    const contractType = transformAuctionNameToAuctionType(data.contract)
    switch (contractType) {
      case AUCTIONS_TYPES.liquidation: {
        const contract = creationLiquidationContractObj()
        yield contract.bid(data.user, data.id, data.bid, userAddress)
        yield put(getAuctions(contractType))
        break
      }
      case AUCTIONS_TYPES.systemDebt: {
        const contract = creationSystemDebtContractObj()
        yield contract.bid(data.bid, userAddress)
        yield put(getAuctions(contractType))
        break
      }
      case AUCTIONS_TYPES.systemSurplus: {
        const contract = creationSystemSurplusContractObj()
        yield contract.bid(data.id, data.bid, userAddress)
        yield put(getAuctions(contractType))
        break
      }
      default:
        return null
    }
    yield put(getSurplus())
    yield put(getDebt())
    yield put(getSystemBalance())
    yield put(getAvailableAmount())
    yield put(getSavingAviableToDeposit())
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
    const contractType = transformAuctionNameToAuctionType(data.contract)

    switch (contractType) {
      case AUCTIONS_TYPES.liquidation: {
        const contract = creationLiquidationContractObj()
        yield contract.execute(data.user, data.id, userAddress)
        yield put(getAuctions(contractType))
        break
      }
      case AUCTIONS_TYPES.systemDebt: {
        const contract = creationSystemDebtContractObj()
        yield contract.execute(userAddress)
        yield put(getAuctions(contractType))
        break
      }
      case AUCTIONS_TYPES.systemSurplus: {
        const contract = creationSystemSurplusContractObj()
        yield contract.execute(data.id, userAddress)
        yield put(getAuctions(contractType))
        break
      }
      default:
        return null
    }
    yield put(getSurplus())
    yield put(getDebt())
    yield put(getSystemBalance())
    yield put(getAvailableAmount())
    yield put(getSavingAviableToDeposit())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionLoading(-1))
  }
}

export default [
  takeEvery(actionTypes.GET_AUCTIONS, getAuctionsGenerator),
  takeEvery(actionTypes.GET_ONE_AUCTION, getOneAuctionGenerator),

  takeEvery(actionTypes.CREATE_AUCTION, createAuction),
  takeEvery(actionTypes.BID_FOR_AUCTION, bidForAuctionGenerator),
  takeEvery(actionTypes.EXECUTE_AUCTION, executeAuctionHandler)
]
