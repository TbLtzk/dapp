import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import { setExpertProposalsCount, setExpertEndedProposals, setExpertActiveProposals } from './action-creators'
import { creationExpertContractsObjArray } from 'contracts/helpers/voting-helpers/base-voting-helper'
import ErrorHandler from 'func/ErrorHandler'
import { getLatestBlockNumber, sortAndCountProposals } from 'func/useful'

let block = 300000

function * getExpertProposalsCountGenerator () {
  try {
    const contracts = creationExpertContractsObjArray()
    const latestBlockNumber = yield getLatestBlockNumber()
    const proposals = yield Promise.all(
      contracts.map((contract) => contract.getProposalsCount(latestBlockNumber - block))
    )

    const [proposalsCount, activeProposalsIds, endedProposalsIds] = sortAndCountProposals(proposals)

    yield put(setExpertProposalsCount(proposalsCount))
    yield put(setExpertActiveProposals(activeProposalsIds))
    yield put(setExpertEndedProposals(endedProposalsIds))
    block = 20000
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [takeEvery(actionTypes.GET_EXPERT_PROPOSALS_COUNT, getExpertProposalsCountGenerator)]
