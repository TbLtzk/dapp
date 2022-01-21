import { put, takeEvery, select } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import { setRootProposals } from './action-creators'
import { creationRootContractObj } from 'contracts/helpers/voting-helpers/base-voting-helper'
import ErrorHandler from 'func/ErrorHandler'
import { getMinimalActiveBlockHeight, sortAndCountProposalsByType } from 'func/useful'

let lastActiveBlock

function * getRootProposalsGenerator () {
  try {
    const contract = creationRootContractObj()
    const { minimalActiveBlockHeight, lastBlockHeight } = yield getMinimalActiveBlockHeight()

    let proposalsCounter
    let activeProposalsArray
    let endedProposalsArray

    if (lastActiveBlock) {
      const { activeProposals, endedProposals, rootEndedProposalsCount } = yield select(
        (state) => state.rootNodeProposals
      )

      const proposals = yield contract.getNewProposalsAndCheckActive(activeProposals, lastActiveBlock)

      const [newProposalsCount, newActiveProposals, newEndedProposalsIds] = sortAndCountProposalsByType([proposals])
      proposalsCounter = {
        active: newProposalsCount.active,
        ended: rootEndedProposalsCount + newProposalsCount.ended
      }
      activeProposalsArray = newActiveProposals
      endedProposalsArray = [...endedProposals, ...newEndedProposalsIds]
      lastActiveBlock = lastBlockHeight
    } else {
      const proposals = yield contract.getProposalsCount(minimalActiveBlockHeight)
      const [proposalsCount, activeProposalsIds, endedProposalsIds] = sortAndCountProposalsByType([proposals])

      proposalsCounter = proposalsCount
      activeProposalsArray = activeProposalsIds
      endedProposalsArray = endedProposalsIds
      lastActiveBlock = lastBlockHeight
    }

    yield put(setRootProposals(activeProposalsArray, endedProposalsArray, proposalsCounter))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [takeEvery(actionTypes.GET_ROOT_PROPOSALS, getRootProposalsGenerator)]
