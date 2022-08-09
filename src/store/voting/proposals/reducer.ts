import { BaseVotingWeightInfo } from '@q-dev/q-js-sdk';
import { orderBy } from 'lodash';
import { ProposalEvent } from 'typings/contracts';
import { ProposalType } from 'typings/proposals';

import { ProposalsAction } from './types';

interface ProposalItem {
  proposals: ProposalEvent[]
  isLoading: boolean
  lastBlock: number
}

function getDefaultProposalItem () {
  return { proposals: [], isLoading: true, lastBlock: 0 };
}

const initialState = {
  constitutionHash: '...',
  baseVotingWeightInfo: {} as BaseVotingWeightInfo,
  newParameter: false,

  minimalActiveBlock: 0,
  proposalsMap: {
    q: getDefaultProposalItem(),
    rootNode: getDefaultProposalItem(),
    expert: getDefaultProposalItem(),
    slashing: getDefaultProposalItem(),
    contractUpdate: getDefaultProposalItem(),
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
            proposals: orderBy(action.proposals, 'blockNumber', 'desc') as ProposalEvent[],
            isLoading: false,
            lastBlock: action.lastBlock
          }
        }
      };
    case 'SET_MINIMAL_ACTIVE_BLOCK':
      return {
        ...state,
        minimalActiveBlock: action.block
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
