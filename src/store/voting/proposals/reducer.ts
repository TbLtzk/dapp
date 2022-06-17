import { ProposalsAction } from './types';

export interface ProposalsState {
  voteDetails: { contract: string, proposalId: string }
  constitutionHash: string
  baseVotingWeightInfo: Record<string, unknown>
  newParameter: boolean
}

const initialState = {
  voteDetails: { contract: '', proposalId: '' },
  constitutionHash: '...',
  baseVotingWeightInfo: {},
  newParameter: false
};

export default function proposals (
  state = initialState,
  action: ProposalsAction
) {
  switch (action.type) {
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
        newParameter: action.result
      };
    default:
      return state;
  }
}
