import { ProposalEvent } from 'typings/contracts';

import { QProposalsAction } from './types';

import { groupArrayByBlockNumber } from 'func/useful';

const initialState = {
  proposals: [] as ProposalEvent[],
  isLoading: true
};

export default function qProposals (state = initialState, action: QProposalsAction) {
  switch (action.type) {
    case 'SET_Q_PROPOSALS':
      return {
        ...state,
        proposals: groupArrayByBlockNumber(action.proposals) as ProposalEvent[],
        isLoading: false
      };
    default:
      return state;
  }
}
