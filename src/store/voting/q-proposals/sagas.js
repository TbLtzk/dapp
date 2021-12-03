import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import {
  getProposalError,
  getOneProposalSuccess,
  setQProposalsCount,
  setQEndedProposalsError,
  setQEndedProposals,
  setQEndedProposalsLoading,
  setQActiveProposalsLoading,
  setQActiveProposals,
  setQActiveProposalsError
} from './action-creators'
import { creationQContractObj, creationQContractsObjArray } from 'contracts/helpers/voting-helpers/base-voting-helper'

import ErrorHandler from 'func/ErrorHandler'
import { getLatestBlockNumber, sortAndCountProposals } from 'func/useful'

function * getQProposalsCountGenerator () {
  try {
    const contracts = creationQContractsObjArray()
    const latestBlockNumber = yield getLatestBlockNumber()
    const proposals = yield Promise.all(contracts.map((contract) => contract.getProposalsCount(latestBlockNumber)))

    const [proposalsCount, activeProposalsIds, endedProposalsIds] = sortAndCountProposals(proposals)

    yield put(setQProposalsCount(proposalsCount))
    yield put(setQActiveProposals(activeProposalsIds))
    yield put(setQEndedProposals(endedProposalsIds))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getQProposalsGenerator ({ proposalStatusType = PROPOSAL_STATUS_TYPES.active, range }) {
  try {
    const contracts = creationQContractsObjArray()
    const latestBlockNumber = yield getLatestBlockNumber()
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active: {
        yield put(setQActiveProposalsLoading())
        const activeProposals = yield Promise.all(
          contracts.map((contract) => contract.getProposals(range, latestBlockNumber))
        )
        yield put(setQActiveProposals(activeProposals.flat()))
        break
      }
      case PROPOSAL_STATUS_TYPES.ended: {
        yield put(setQEndedProposalsLoading())
        const endedProposals = yield Promise.all(
          contracts.map((contract) => contract.getEndedProposals(range, latestBlockNumber))
        )
        yield put(setQEndedProposals(endedProposals.flat()))
        break
      }
      case PROPOSAL_STATUS_TYPES.reset: {
        yield put(setQActiveProposals({ reset: true }))
        yield put(setQEndedProposals({ reset: true }))
      }
    }
  } catch (error) {
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active: {
        yield put(setQActiveProposalsError(error))
        break
      }
      case PROPOSAL_STATUS_TYPES.ended: {
        yield put(setQEndedProposalsError(error))
        break
      }
    }
  }
}

function * getQProposalGenerator ({ contractName, id, activeProposal }) {
  try {
    const contract = creationQContractObj(contractName)
    if (contract) {
      let data = null
      if (activeProposal) {
        data = yield contract.getOneProposal(id)
      } else {
        data = yield contract.getProposalWithoutStatusChecked(id)
      }
      yield put(getOneProposalSuccess(data))
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getProposalError(id))
  }
}

export default [
  takeEvery(actionTypes.GET_Q_PROPOSALS, getQProposalsGenerator),
  takeEvery(actionTypes.GET_Q_PROPOSAL, getQProposalGenerator),
  takeEvery(actionTypes.GET_Q_PROPOSALS_COUNT, getQProposalsCountGenerator)
]
