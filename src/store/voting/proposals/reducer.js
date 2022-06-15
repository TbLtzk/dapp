import * as actionTypes from './action-types';

const initialState = {
  voteDetails: { contract: '', proposalId: '' },
  constitutionHash: '...',
  baseVotingWeightInfo: {},
  newParameter: false
};

export default function proposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_VOTE_DETAILS:
      return {
        ...state,
        voteDetails: action.result
      };
    case actionTypes.GET_CONSTITUTION_HASH_SUCCESS:
      return {
        ...state,
        constitutionHash: action.result
      };
    case actionTypes.SET_BASE_VOTING_WEIGHT_INFO:
      return {
        ...state,
        baseVotingWeightInfo: action.payload
      };
    case actionTypes.SET_NEW_PARAMETER:
      return {
        ...state,
        newParameter: action.result
      };
    default:
      return state;
  }
}
