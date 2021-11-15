import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import {
  getExpertEndedProposalsError,
  getExpertEndedProposalsSuccess,
  getExpertProposalsListError,
  getExpertProposalsListSuccess,
  getProposalError,
  getOneProposalSuccess,
  setExpertProposalsCount
} from './action-creators'
import {
  creationExpertContractObj,
  creationExpertContractsObjArray
} from 'contracts/helpers/voting-helpers/base-voting-helper'
import ErrorHandler from 'func/ErrorHandler'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import { sortByTime } from 'func/useful'

function * getExpertProposalsCountGenerator () {
  try {
    const contracts = creationExpertContractsObjArray()

    const result = {
      active: 0,
      ended: 0
    }

    const proposals = yield Promise.all(contracts.map((contract) => contract.getProposalsCount()))

    proposals.forEach((proposal) => {
      if (proposal.ended) {
        result.ended += proposal.ended
      }
      if (proposal.active) {
        result.active += proposal.active
      }
    })
    yield put(setExpertProposalsCount(result))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getProposalsListGenerator ({ proposalStatusType = PROPOSAL_STATUS_TYPES.active, range = [0, 3] }) {
  try {
    const contracts = creationExpertContractsObjArray()

    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active: {
        yield put(getExpertProposalsListSuccess({ proposalsArr: [], loading: true }))
        const active = yield Promise.all(contracts.map((contract) => contract.getProposals()))
        yield put(getExpertProposalsListSuccess({ proposalsArr: sortByTime(active), loading: false }))
        break
      }
      case PROPOSAL_STATUS_TYPES.ended: {
        yield put(getExpertEndedProposalsSuccess({ endedProposals: [], loading: true, reset: !range[0] }))
        const endedProposals = yield Promise.all(contracts.map((contract) => contract.getEndedProposals(range)))
        yield put(getExpertEndedProposalsSuccess({ endedProposals: sortByTime(endedProposals), loading: false }))
        break
      }
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
  takeEvery(actionTypes.GET_EXPERT_PROPOSALS_LIST, getProposalsListGenerator),
  takeEvery(actionTypes.GET_EXPERT_PROPOSAL, getProposalGenerator),
  takeEvery(actionTypes.GET_EXPERT_PROPOSALS_COUNT, getExpertProposalsCountGenerator)
]
