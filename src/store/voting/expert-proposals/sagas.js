import { put, takeEvery, all } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import { setExpertProposalsCount, setExpertEndedProposals, setExpertActiveProposals } from './action-creators'
import { creationExpertContractsObjArray } from 'contracts/helpers/voting-helpers/base-voting-helper'
import ErrorHandler from 'func/ErrorHandler'
import { getMinimalActiveBlockHeight, sortAndCountProposals } from 'func/useful'

function * getExpertProposalsCountGenerator () {
  try {
    const contracts = creationExpertContractsObjArray()
    const minimalActiveBlockHeight = yield getMinimalActiveBlockHeight()
    const proposals = yield all(contracts.map((contract) => contract.getProposalsCount(minimalActiveBlockHeight)))
    const [proposalsCount, activeProposalsIds, endedProposalsIds] = sortAndCountProposals(proposals)
    yield put(setExpertProposalsCount(proposalsCount))
    yield put(setExpertActiveProposals(activeProposalsIds))
    yield put(setExpertEndedProposals(endedProposalsIds))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [takeEvery(actionTypes.GET_EXPERT_PROPOSALS_COUNT, getExpertProposalsCountGenerator)]
