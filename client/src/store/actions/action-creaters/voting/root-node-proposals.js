import * as actionTypes from 'store/actions/action-types/voting/root-node-proposals';

export const getRootNodeEndedProposals = () => ({
  type: actionTypes.GET_ENDED_PROPOSALS,
});
export const getRootNodeEndedProposalsSuccess = (result) => ({
  type: actionTypes.GET_ENDED_PROPOSALS_SUCCESS,
  result
});
export const getRootNodeEndedProposalsError = (result) => ({
  type: actionTypes.GET_ENDED_PROPOSALS_ERROR,
  result
});


export const getRootNodeProposalsList = () => ({
  type: actionTypes.GET_PROPOSALS_LIST,
});

export const getRootNodeProposalsListSuccess = (result) => ({
  type: actionTypes.GET_PROPOSALS_LIST_SUCCESS,
  result
});

export const getRootNodeProposalsListError = (result) => ({
  type: actionTypes.GET_PROPOSALS_LIST_ERROR,
  result
});

export const getProposalRootNode = (contractName, id, activeProposal) => ({
  type: actionTypes.GET_PROPOSAL,
  contractName,
  id,
  activeProposal
});

export const getProposalSuccess = (result) => ({
  type: actionTypes.GET_PROPOSAL_SUCCESS,
  result,
});
export const getEmptyProposalSuccess = (result) => ({
  type: actionTypes.GET_EMPTY_PROPOSAL_SUCCESS,
  result,
});

export const getProposalError = (result) => ({
  type: actionTypes.GET_PROPOSAL_ERROR,
  result,
});

