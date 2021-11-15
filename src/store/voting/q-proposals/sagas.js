import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import {
  getQEndedProposalsSuccess,
  getProposalError,
  getQProposalsListError,
  getQProposalsListSuccess,
  getOneProposalSuccess,
  getQEndedProposalsError,
  setQProposalsCount
} from './action-creators'
import { creationQContractObj, creationQContractsObjArray } from 'contracts/helpers/voting-helpers/base-voting-helper'

import ErrorHandler from 'func/ErrorHandler'

function * getQProposalsCountGenerator () {
  try {
    const contracts = creationQContractsObjArray()
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
    yield put(setQProposalsCount(result))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getProposalsListGenerator ({ proposalStatusType = PROPOSAL_STATUS_TYPES.active, range }) {
  try {
    const contracts = creationQContractsObjArray()

    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active: {
        const active = yield Promise.all(contracts.map((item) => item.getProposals()))
        yield put(getQProposalsListSuccess([].concat.apply([], active)))
        break
      }
      case PROPOSAL_STATUS_TYPES.ended: {
        yield put(getQEndedProposalsSuccess({ endedProposals: [], loading: true }))
        const result = yield Promise.all(contracts.map((item) => item.getEndedProposals(range)))
        const endedProposals = [...result].flat().sort((a, b) => Number(b.id) - Number(a.id))
        yield put(getQEndedProposalsSuccess({ endedProposals, loading: false }))
        break
      }
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
  takeEvery(actionTypes.GET_Q_PROPOSALS_LIST, getProposalsListGenerator),
  takeEvery(actionTypes.GET_Q_PROPOSAL, getQProposalGenerator),
  takeEvery(actionTypes.GET_Q_PROPOSALS_COUNT, getQProposalsCountGenerator)
]
