import * as actionTypes from 'store/actions/action-types/voting/q-proposals';

export const getQEndedProposals = () => ({
  type: actionTypes.GET_ENDED_PROPOSALS,
});
export const getQEndedProposalsSuccess = (result) => ({
  type: actionTypes.GET_ENDED_PROPOSALS_SUCCESS,
  result
});
export const getQEndedProposalsError = (result) => ({
  type: actionTypes.GET_ENDED_PROPOSALS_ERROR,
  result
});

export const getOneProposal = (data) => ({
  type: actionTypes.GET_ONE_PROPOSAL,
  data
});

export const getQProposalsList = () => ({
  type: actionTypes.GET_PROPOSALS_LIST,
});

export const getQProposalsListSuccess = (result) => ({
  type: actionTypes.GET_PROPOSALS_LIST_SUCCESS,
  result
});

export const getQProposalsListError = (result) => ({
  type: actionTypes.GET_PROPOSALS_LIST_ERROR,
  result
});

export const getProposalQ = (contractName, id, activeProposal) => ({
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

