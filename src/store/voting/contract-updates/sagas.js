import { all, put, select, takeEvery } from 'redux-saga/effects';

import { setContractUpdatesProposals } from './action-creators';
import * as actionTypes from './action-types';

import { creationUpdatesContractObjArray } from 'contracts/helpers/voting-helpers/base-voting-helper';

import ErrorHandler from 'func/ErrorHandler';
import { getMinimalActiveBlockHeight, sortAndCountProposalsByType } from 'func/useful';

let lastActiveBlock;

function* getContractUpdatesProposalsGenerator () {
  try {
    const contracts = creationUpdatesContractObjArray();
    const { minimalActiveBlockHeight, lastBlockHeight } = yield getMinimalActiveBlockHeight();
    let proposalsCounter;
    let activeProposalsArray;
    let endedProposalsArray;

    if (lastActiveBlock) {
      const { activeProposals, endedProposals, contractUpdatesEndedProposalsCount } = yield select(
        (state) => state.contractUpdatesProposals
      );

      const proposals = yield all(
        contracts.map((contract) => contract.getNewProposalsAndCheckActive(activeProposals, lastActiveBlock))
      );
      const [newProposalsCount, newActiveProposals, newEndedProposalsIds] = sortAndCountProposalsByType(proposals);
      proposalsCounter = {
        active: newProposalsCount.active,
        ended: contractUpdatesEndedProposalsCount + newProposalsCount.ended
      };
      activeProposalsArray = newActiveProposals;
      endedProposalsArray = [...endedProposals, ...newEndedProposalsIds];
      lastActiveBlock = lastBlockHeight;
    } else {
      const proposals = yield all(contracts.map((contract) => contract.getProposalsCount(minimalActiveBlockHeight)));
      const [proposalsCount, activeProposalsIds, endedProposalsIds] = sortAndCountProposalsByType(proposals);
      proposalsCounter = proposalsCount;
      activeProposalsArray = activeProposalsIds;
      endedProposalsArray = endedProposalsIds;
      lastActiveBlock = lastBlockHeight;
    }

    yield put(setContractUpdatesProposals(activeProposalsArray, endedProposalsArray, proposalsCounter));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

export default [takeEvery(actionTypes.GET_CONTRACT_UPDATES_PROPOSALS, getContractUpdatesProposalsGenerator)];
