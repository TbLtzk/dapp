import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import {
  getRootNodeProposalsListError,
  getRootNodeProposalsListSuccess,
  getRootNodeEndedProposalsSuccess,
  getProposalError,
  getOneProposalSuccess,
  getRootNodeEndedProposalsError,
  setRootProposalsCount
} from './action-creators'
import { creationRootContractObj } from 'contracts/helpers/voting-helpers/base-voting-helper'
import ErrorHandler from 'func/ErrorHandler'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import { sortByVotingEndTime } from 'func/useful'

function * getRootProposalsCountGenerator () {
  try {
    const contract = creationRootContractObj()
    const result = yield contract.getProposalsCount()
    yield put(setRootProposalsCount(result))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getProposalsListGenerator ({ proposalStatusType = PROPOSAL_STATUS_TYPES.active, range = [0, 3] }) {
  try {
    const contracts = creationRootContractObj()
    const newRange = [range[0] * 3, range[1] * 3]
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active: {
        yield put(getRootNodeProposalsListSuccess({ proposalsArr: [], loading: true }))
        const active = yield contracts?.getProposals()
        yield put(getRootNodeProposalsListSuccess({ proposalsArr: sortByVotingEndTime(active), loading: false, reset: true }))
        break
      }
      case PROPOSAL_STATUS_TYPES.ended: {
        yield put(
          getRootNodeEndedProposalsSuccess({ endedProposals: [], loading: true, reset: !range[0] })
        )
        const ended = yield contracts?.getEndedProposals(newRange)
        yield put(getRootNodeEndedProposalsSuccess({ endedProposals: sortByVotingEndTime(ended), loading: false }))
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
  takeEvery(actionTypes.GET_ROOT_NODE_PROPOSALS_LIST, getProposalsListGenerator),
  takeEvery(actionTypes.GET_ROOT_NODE_PROPOSAL, getRootNodeProposalGenerator),
  takeEvery(actionTypes.GET_ROOT_PROPOSALS_COUNT, getRootProposalsCountGenerator)
]
