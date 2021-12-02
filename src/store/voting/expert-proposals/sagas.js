import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import {
  getProposalError,
  getOneProposalSuccess,
  setExpertProposalsCount,
  setExpertEndedProposalsLoading,
  setExpertEndedProposals,
  setExpertEndedProposalsError,
  setExpertActiveProposalsLoading,
  setExpertActiveProposals,
  setExpertActiveProposalsError
} from './action-creators'
import {
  creationExpertContractObj,
  creationExpertContractsObjArray
} from 'contracts/helpers/voting-helpers/base-voting-helper'
import ErrorHandler from 'func/ErrorHandler'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import { getLatestBlockNumber } from 'func/useful'

function * getExpertProposalsCountGenerator () {
  try {
    const contracts = creationExpertContractsObjArray()

    const result = {
      active: 0,
      ended: 0
    }
    const latestBlockNumber = yield getLatestBlockNumber()

    const proposals = yield Promise.all(contracts.map((contract) => contract.getProposalsCount(latestBlockNumber)))

    proposals.forEach((proposal) => {
      if (proposal.ended) {
        result.ended += proposal.ended
      }
      if (proposal.active) {
        result.active += proposal.active
      }
    })

    const active = []
    const ended = []

    proposals.forEach((prop) => {
      const add = (_, id) => ({ contract: prop.contract, id })
      active.push(Array(prop.active).fill().map(add))
      ended.push(Array(prop.ended).fill().map(add))
    })
    yield put(setExpertActiveProposals(active.flat()))
    yield put(setExpertEndedProposals(ended.flat()))

    yield put(setExpertProposalsCount(result))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getExpertProposalsGenerator ({ proposalStatusType = PROPOSAL_STATUS_TYPES.active, range }) {
  try {
    const contracts = creationExpertContractsObjArray()
    const latestBlockNumber = yield getLatestBlockNumber()

    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active: {
        yield put(setExpertActiveProposalsLoading())
        const activeProposals = yield Promise.all(
          contracts.map((contract) => contract.getProposals(range, latestBlockNumber))
        )
        yield put(setExpertActiveProposals(activeProposals.flat()))
        break
      }
      case PROPOSAL_STATUS_TYPES.ended: {
        yield put(setExpertEndedProposalsLoading())
        const endedProposals = yield Promise.all(
          contracts.map((contract) => contract.getEndedProposals(range, latestBlockNumber))
        )
        yield put(setExpertEndedProposals(endedProposals.flat()))
        break
      }
      case PROPOSAL_STATUS_TYPES.reset: {
        yield put(setExpertActiveProposals({ reset: true }))
        yield put(setExpertEndedProposals({ reset: true }))
      }
    }
  } catch (error) {
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active: {
        yield put(setExpertActiveProposalsError(error))
        break
      }
      case PROPOSAL_STATUS_TYPES.ended: {
        yield put(setExpertEndedProposalsError(error))
        break
      }
    }
  }
}

function * getProposalGenerator ({ contractName, id, activeProposal }) {
  try {
    const contract = creationExpertContractObj(contractName)
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
  takeEvery(actionTypes.GET_EXPERT_PROPOSALS, getExpertProposalsGenerator),
  takeEvery(actionTypes.GET_EXPERT_PROPOSAL, getProposalGenerator),
  takeEvery(actionTypes.GET_EXPERT_PROPOSALS_COUNT, getExpertProposalsCountGenerator)
]
