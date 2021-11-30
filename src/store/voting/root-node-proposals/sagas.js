import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import {
  getProposalError,
  getOneProposalSuccess,
  setRootProposalsCount,
  setRootEndedProposalsLoading,
  setRootEndedProposalsError,
  setRootEndedProposals,
  setRootActiveProposalsLoading,
  setRootActiveProposals,
  setRootActiveProposalsError
} from './action-creators'
import { creationRootContractObj } from 'contracts/helpers/voting-helpers/base-voting-helper'
import ErrorHandler from 'func/ErrorHandler'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'

function * getRootProposalsCountGenerator () {
  try {
    const contract = creationRootContractObj()
    const result = yield contract.getProposalsCount()
    yield put(setRootProposalsCount(result))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getRootProposalsGenerator ({ proposalStatusType = PROPOSAL_STATUS_TYPES.active, range }) {
  try {
    range = [range[0] + 6, range[1] + 6]
    const contract = creationRootContractObj()
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active: {
        yield put(setRootActiveProposalsLoading())
        const activeProposals = yield contract.getProposals(range)
        yield put(setRootActiveProposals(activeProposals))
        break
      }
      case PROPOSAL_STATUS_TYPES.ended: {
        yield put(setRootEndedProposalsLoading())
        const endedProposals = yield contract.getEndedProposals(range)
        yield put(setRootEndedProposals(endedProposals))
        break
      }
      case PROPOSAL_STATUS_TYPES.reset: {
        yield put(setRootActiveProposals({ reset: true }))
        yield put(setRootEndedProposals({ reset: true }))
      }
    }
  } catch (error) {
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active: {
        yield put(setRootActiveProposalsError(error))
        break
      }
      case PROPOSAL_STATUS_TYPES.ended: {
        yield put(setRootEndedProposalsError(error))
        break
      }
    }
  }
}

function * getRootNodeProposalGenerator ({ id, activeProposal }) {
  try {
    const contract = creationRootContractObj()

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
  takeEvery(actionTypes.GET_ROOT_PROPOSALS, getRootProposalsGenerator),

  takeEvery(actionTypes.GET_ROOT_NODE_PROPOSAL, getRootNodeProposalGenerator),
  takeEvery(actionTypes.GET_ROOT_PROPOSALS_COUNT, getRootProposalsCountGenerator)
]
