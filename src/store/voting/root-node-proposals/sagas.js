import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import { setRootProposalsCount, setRootEndedProposals, setRootActiveProposals } from './action-creators'
import { creationRootContractObj } from 'contracts/helpers/voting-helpers/base-voting-helper'
import ErrorHandler from 'func/ErrorHandler'
import { getLatestBlockNumber, sortAndCountProposals } from 'func/useful'
let block = 50000

function * getRootProposalsCountGenerator () {
  try {
    const contract = creationRootContractObj()
    const latestBlockNumber = yield getLatestBlockNumber()
    const proposals = yield contract.getProposalsCount(latestBlockNumber - block)
    const [proposalsCount, activeProposalsIds, endedProposalsIds] = sortAndCountProposals([proposals])
    yield put(setRootProposalsCount(proposalsCount))
    yield put(setRootActiveProposals(activeProposalsIds))
    yield put(setRootEndedProposals(endedProposalsIds))
    block = 2000
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [takeEvery(actionTypes.GET_ROOT_PROPOSALS_COUNT, getRootProposalsCountGenerator)]
