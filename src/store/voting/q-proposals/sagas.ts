import { call, put, select, takeEvery } from 'typed-redux-saga';

import { setQProposals } from './actions';
import { GetQProposals } from './types';

import { RootState } from 'store';

import { getQProposals } from 'contracts/helpers/voting/constitution';

import ErrorHandler from 'func/ErrorHandler';
import { getMinimalActiveBlockHeight } from 'func/useful';

let lastActiveBlock: number;

function* getQProposalsGenerator () {
  try {
    const { minimalActiveBlockHeight, lastBlockHeight } = yield* call(getMinimalActiveBlockHeight);

    const { proposals } = yield* select((state: RootState) => state.qProposals);
    const newProposals = yield* call(
      () => getQProposals(proposals, lastActiveBlock)
    );
    lastActiveBlock = Number(lastBlockHeight);

    yield* put(setQProposals(newProposals));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

export default [
  takeEvery<GetQProposals>('GET_Q_PROPOSALS', getQProposalsGenerator)
];
