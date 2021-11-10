import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/voting/root-node-proposals'

import {
  getRootNodeProposalsListError,
  getRootNodeProposalsListSuccess,
  getRootNodeEndedProposalsSuccess,
  getProposalError,
  getOneProposalSuccess,
  getRootNodeEndedProposalsError
} from 'store/actions/action-creaters/voting/root-node-proposals'
import { creationRootContractObj } from 'contracts/handler/VotingHandler'
import ErrorHandler from 'func/ErrorHandler'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'

function * getProposalsList ({ proposalStatusType = PROPOSAL_STATUS_TYPES.active }) {
  try {
    const contracts = creationRootContractObj()

    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active: {
        const pending = yield contracts?.getProposals()
        yield put(getRootNodeProposalsListSuccess(pending))
        break
      }
      case PROPOSAL_STATUS_TYPES.ended: {
        const ended = yield contracts?.getEndedProposals()
        yield put(getRootNodeEndedProposalsSuccess(ended))
        break
      }
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active:
        yield put(getRootNodeProposalsListError(error))
        break
      case PROPOSAL_STATUS_TYPES.ended:
        yield put(getRootNodeEndedProposalsError(error.message))
        break
    }
  }
}

function * getRootNodeProposal ({ id, activeProposal }) {
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
  takeEvery(actionTypes.GET_ROOT_NODE_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_ROOT_NODE_PROPOSAL, getRootNodeProposal)
]
