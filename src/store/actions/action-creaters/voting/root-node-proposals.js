import * as actionTypes from 'store/actions/action-types/voting/root-node-proposals';

export const getRootNodeEndedProposals = () => ({
  type: actionTypes.GET_ROOT_NODE_ENDED_PROPOSALS,
});
export const getRootNodeEndedProposalsSuccess = (result) => ({
  type: actionTypes.GET_ROOT_NODE_ENDED_PROPOSALS_SUCCESS,
  result
});
export const getRootNodeEndedProposalsError = (result) => ({
  type: actionTypes.GET_ROOT_NODE_ENDED_PROPOSALS_ERROR,
  result
});

export const getRootNodeProposalsList = () => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSALS_LIST,
});

export const getRootNodeProposalsListSuccess = (result) => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSALS_LIST_SUCCESS,
  result
});

export const getRootNodeProposalsListError = (result) => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSALS_LIST_ERROR,
  result
});

export const getProposalRootNode = (contractName, id, activeProposal) => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSAL,
  contractName,
  id,
  activeProposal
});

export const getProposalSuccess = (result) => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSAL_SUCCESS,
  result,
});
export const getEmptyProposalSuccess = (result) => ({
  type: actionTypes.GET_ROOT_NODE_EMPTY_PROPOSAL_SUCCESS,
  result,
});

export const getProposalError = (result) => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSAL_ERROR,
  result,
});

export const getRootNodeProposalEnded = (result) => ({
  type: actionTypes.GET_ROOT_NODE_ENDED_PROPOSAL,
  result,
});
export const getProposalEndedSuccess = (result) => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSAL_ENDED_SUCCESS,
  result,
});
export const getEmptyProposalEndedSuccess = (result) => ({
  type: actionTypes.GET_ROOT_NODE_EMPTY_PROPOSAL_ENDED_SUCCESS,
  result,
});

export const getProposalEndedError = (result) => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSAL_ENDED_ERROR,
  result,
});

export const getOneProposalSuccess = (result) => ({
  type: actionTypes.GET_ONE_ROOT_NODE_PROPOSAL_SUCCESS,
  result,
});
