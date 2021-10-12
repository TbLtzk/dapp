import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/voting/q-proposals'

import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import {
  getQEndedProposalsSuccess,
  getProposalError,
  getQProposalsListError,
  getQProposalsListSuccess,
  getOneProposalSuccess,
  getQEndedProposalsError
} from 'store/actions/action-creaters/voting/q-proposals'
import {
  creationQContractObj,
  creationQContractsObjArray
} from 'contracts/handler/VotingHandler'

import ErrorHandler from 'func/ErrorHandler'

function * getProposalsList ({ proposalStatusType = PROPOSAL_STATUS_TYPES.active }) {
  try {
    const contracts = creationQContractsObjArray()
    let data = null
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active:
        data = yield Promise.all(contracts.map(item => item.getProposals()))
        yield put(getQProposalsListSuccess([].concat.apply([], data)))
        break
      case PROPOSAL_STATUS_TYPES.ended:
        data = yield Promise.all(contracts.map(item => item.getEndedProposals()))
        yield put(getQEndedProposalsSuccess([].concat.apply([], data)))
        break
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active:
        yield put(getQProposalsListError(error))
        break
      case PROPOSAL_STATUS_TYPES.ended:
        yield put(getQEndedProposalsError(error.message))
        break
    }
  }
}

function * getQProposal ({
  contractName,
  id,
  activeProposal
}) {
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
  takeEvery(actionTypes.GET_Q_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_Q_PROPOSAL, getQProposal)
]
