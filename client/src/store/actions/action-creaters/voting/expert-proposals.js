import * as actionTypes from 'store/actions/action-types/voting/expert-proposals';

export const getExpertEndedProposals = () => ({
  type: actionTypes.GET_ENDED_PROPOSALS,
});
export const getExpertEndedProposalsSuccess = (result) => ({
  type: actionTypes.GET_ENDED_PROPOSALS_SUCCESS,
  result
});
export const getExpertEndedProposalsError = (result) => ({
  type: actionTypes.GET_ENDED_PROPOSALS_ERROR,
  result
});

export const getOneProposal = (data) => ({
  type: actionTypes.GET_ONE_PROPOSAL,
  data
});

export const getExpertProposalsList = () => ({
  type: actionTypes.GET_PROPOSALS_LIST,
});

export const getExpertProposalsListSuccess = (result) => ({
  type: actionTypes.GET_PROPOSALS_LIST_SUCCESS,
  result
});

export const getExpertProposalsListError = (result) => ({
  type: actionTypes.GET_PROPOSALS_LIST_ERROR,
  result
});

export const getProposalExpert = (contractName, id, activeProposal) => ({
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

