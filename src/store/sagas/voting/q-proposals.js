import { put, select, takeEvery } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/voting/q-proposals'

import {
  getQEndedProposalsError, getQEndedProposalsSuccess,
  getProposalSuccess, getEmptyProposalSuccess, getProposalError,
  getQProposalsListError, getQProposalsListSuccess, getProposalEndedSuccess,
  getEmptyProposalEndedSuccess, getQProposalEnded, getProposalEndedError, getOneProposalSuccess
} from 'store/actions/action-creaters/voting/q-proposals'
import {
  creationQContractObj,
  creationQContractsObjArray
} from 'contracts/handler/VotingHandler'

function * getProposalsList () {
  try {
    const contracts = creationQContractsObjArray()
    let result = []
    if (Array.isArray(contracts)) {
      const data = yield Promise.all(contracts.map(item => item.getProposals()))
      result = [].concat.apply([], data)
    } else {
      result = yield contracts?.getProposals()
    }
    yield put(getQProposalsListSuccess(result))
  } catch (e) {
    console.error('e', e)
    yield put(getQProposalsListError(e))
  }
}

function * getQProposal ({
  contractName,
  id,
  activeProposal
}) {
  const { pageType } = yield select(state => state.proposals)
  try {
    if (pageType === 'ended') {
      yield put(getQProposalEnded())
    }
    const contract = creationQContractObj(contractName)
    if (contract) {
      let data = null
      if (activeProposal) {
        data = yield contract.getOneProposal(id)
      } else {
        data = yield contract.getProposalWithoutStatusChecked(id)
      }
      if (pageType === 'ended') {
        if (data) {
          yield put(getProposalEndedSuccess(data))
        } else {
          if (id) {
            yield put(getEmptyProposalEndedSuccess({
              id,
              contractName
            }))
          }
        }
      } else if (pageType === 'active') {
        if (data) {
          yield put(getProposalSuccess(data))
        } else {
          if (id) {
            yield put(getEmptyProposalSuccess({
              id,
              contractName
            }))
          }
        }
      } else {
        yield put(getOneProposalSuccess(data))
      }
    }
  } catch (err) {
    console.error('err', err)
    if (pageType === 'ended') {
      yield put(getProposalEndedError(id))
    } else {
      yield put(getProposalError(id))
    }
  }
}

function * getEndedProposals () {
  try {
    const contracts = creationQContractsObjArray()

    let result = []
    if (Array.isArray(contracts)) {
      const data = yield Promise.all(contracts.map(item => item.getEndedProposals()))
      result = [].concat.apply([], data)
    } else {
      result = yield contracts?.getEndedProposals()
    }

    yield put(getQEndedProposalsSuccess(result))
  } catch (err) {
    console.error('err', err.message)
    yield put(getQEndedProposalsError(err.message))
  }
}

export default [
  takeEvery(actionTypes.GET_Q_ENDED_PROPOSALS, getEndedProposals),
  takeEvery(actionTypes.GET_Q_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_Q_PROPOSAL, getQProposal)
]
