import { ProposalEvent } from 'typings/contracts';

import { ProposalsAction } from './types';

import { ProposalType } from 'constants/statuses';
import { groupArrayByBlockNumber } from 'func/useful';

interface ProposalItem {
  proposals: ProposalEvent[]
  isLoading: boolean
}

const initialState = {
  voteDetails: { contract: '', proposalId: '' },
  constitutionHash: '...',
  baseVotingWeightInfo: {} as Record<string, unknown>,
  newParameter: false,
  proposalsMap: {
    q: { proposals: [], isLoading: true },
    rootNode: { proposals: [], isLoading: true },
    expert: { proposals: [], isLoading: true },
    slashing: { proposals: [], isLoading: true },
    contractUpdate: { proposals: [], isLoading: true }
  } as Record<ProposalType, ProposalItem>
};

export default function proposals (
  state = initialState,
  action: ProposalsAction
) {
  switch (action.type) {
    case 'SET_PROPOSALS':
      return {
        ...state,
        proposalsMap: {
          ...state.proposalsMap,
          [action.proposalType]: {
            proposals: groupArrayByBlockNumber(action.proposals) as ProposalEvent[],
            isLoading: false
          }
        }
      };
    case 'SET_VOTE_DETAILS':
      return {
        ...state,
        voteDetails: action.result
      };
    case 'GET_CONSTITUTION_HASH_SUCCESS':
      return {
        ...state,
        constitutionHash: action.result
      };
    case 'SET_BASE_VOTING_WEIGHT_INFO':
      return {
        ...state,
        baseVotingWeightInfo: action.payload
      };
    case 'SET_NEW_PARAMETER':
      return {
        ...state,
        newParameter: action.result,
      };
    default:
      return state;
  }
}
