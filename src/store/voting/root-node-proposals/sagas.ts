import { call, put, select, takeEvery } from 'typed-redux-saga';

import { setRootProposals } from './actions';
import { GetRootProposals } from './types';

import { creationRootContractObj } from 'contracts/helpers/voting-helpers/base-voting-helper';

import ErrorHandler from 'func/ErrorHandler';
import { getMinimalActiveBlockHeight, sortAndCountProposalsByType } from 'func/useful';

let lastActiveBlock: string | number;

function* getRootProposalsGenerator () {
  try {
    const contract = creationRootContractObj();
    const { minimalActiveBlockHeight, lastBlockHeight } = yield* call(getMinimalActiveBlockHeight);

    let proposalsCounter;
    let activeProposalsArray;
    let endedProposalsArray;

    if (lastActiveBlock) {
      const { activeProposals, endedProposals, rootEndedProposalsCount } = yield* select(
        (state) => state.rootNodeProposals
      );

      const proposals = yield* call(contract.getNewProposalsAndCheckActive, activeProposals, lastActiveBlock);

      const [newProposalsCount, newActiveProposals, newEndedProposalsIds] = sortAndCountProposalsByType([proposals]);
      proposalsCounter = {
        active: newProposalsCount.active,
        ended: rootEndedProposalsCount + newProposalsCount.ended
      };
      activeProposalsArray = newActiveProposals;
      endedProposalsArray = [...endedProposals, ...newEndedProposalsIds];
      lastActiveBlock = lastBlockHeight;
    } else {
      const proposals = yield* call(contract.getProposalsCount, minimalActiveBlockHeight);
      const [proposalsCount, activeProposalsIds, endedProposalsIds] = sortAndCountProposalsByType([proposals]);

      proposalsCounter = proposalsCount;
      activeProposalsArray = activeProposalsIds;
      endedProposalsArray = endedProposalsIds;
      lastActiveBlock = lastBlockHeight;
    }

    yield* put(setRootProposals(activeProposalsArray, endedProposalsArray, proposalsCounter));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

export default [
  takeEvery<GetRootProposals>('GET_ROOT_PROPOSALS', getRootProposalsGenerator)
];
