import { put, takeEvery, all, select } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import { setExpertProposalsCount, setExpertEndedProposals, setExpertActiveProposals } from './action-creators'
import { creationExpertContractsObjArray } from 'contracts/helpers/voting-helpers/base-voting-helper'
import ErrorHandler from 'func/ErrorHandler'
import { getMinimalActiveBlockHeight, sortAndCountProposalsByType } from 'func/useful'

let lastActiveBlock

function * getExpertProposalsCountGenerator () {
  try {
    const contracts = creationExpertContractsObjArray()
    const { minimalActiveBlockHeight, lastBlockHeight } = yield getMinimalActiveBlockHeight()

    let proposalsCounter
    let activeProposalsArray
    let endedProposalsArray

    if (lastActiveBlock) {
      const { activeProposals, endedProposals, expertEndedProposalsCount } = yield select(
        (state) => state.expertProposals
      )
      const proposals = yield all(
        contracts.map((contract) => contract.getNewProposalsAndCheckActive(activeProposals, lastActiveBlock))
      )
      const [newProposalsCount, newActiveProposals, newEndedProposalsIds] = sortAndCountProposalsByType(proposals)

      proposalsCounter = {
        active: newProposalsCount.active,
        ended: expertEndedProposalsCount + newProposalsCount.ended
      }
      activeProposalsArray = newActiveProposals
      endedProposalsArray = [...endedProposals, ...newEndedProposalsIds]
      lastActiveBlock = lastBlockHeight
    } else {
      const proposals = yield all(contracts.map((contract) => contract.getProposalsCount(minimalActiveBlockHeight)))
      const [proposalsCount, activeProposalsIds, endedProposalsIds] = sortAndCountProposalsByType(proposals)
      proposalsCounter = proposalsCount
      activeProposalsArray = activeProposalsIds
      endedProposalsArray = endedProposalsIds
      lastActiveBlock = lastBlockHeight
    }

    yield put(setExpertProposalsCount(proposalsCounter))
    yield put(setExpertActiveProposals(activeProposalsArray))
    yield put(setExpertEndedProposals(endedProposalsArray))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [takeEvery(actionTypes.GET_EXPERT_PROPOSALS_COUNT, getExpertProposalsCountGenerator)]
