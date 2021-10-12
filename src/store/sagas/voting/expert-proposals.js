import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/voting/expert-proposals'

import {
  getExpertEndedProposalsError,
  getExpertEndedProposalsSuccess,
  getExpertProposalsListError,
  getExpertProposalsListSuccess,
  getProposalError,
  getOneProposalSuccess
} from 'store/actions/action-creaters/voting/expert-proposals'
import { creationExpertContractObj, creationExpertContractsObjArray } from 'contracts/handler/VotingHandler'
import ErrorHandler from 'func/ErrorHandler'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'

function * getProposalsList ({ proposalStatusType = PROPOSAL_STATUS_TYPES.active }) {
  try {
    const contracts = creationExpertContractsObjArray()
    let data = null
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active:
        data = yield Promise.all(contracts.map((item) => item.getProposals()))
        yield put(getExpertProposalsListSuccess([].concat.apply([], data)))
        break
      case PROPOSAL_STATUS_TYPES.ended:
        data = yield Promise.all(contracts.map((item) => item.getEndedProposals()))
        yield put(getExpertEndedProposalsSuccess([].concat.apply([], data)))
        break
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active:
        yield put(getExpertProposalsListError(error))
        break
      case PROPOSAL_STATUS_TYPES.ended:
        yield put(getExpertEndedProposalsError(error.message))
        break
    }
  }
}

function * getProposal ({ contractName, id, activeProposal }) {
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
  takeEvery(actionTypes.GET_EXPERT_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_EXPERT_PROPOSAL, getProposal)
]
