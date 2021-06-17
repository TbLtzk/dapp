import * as actionTypes from 'store/actions/action-types/voting/q-proposals';

export const getQEndedProposals = () => ({
  type: actionTypes.GET_Q_ENDED_PROPOSALS,
});
export const getQEndedProposalsSuccess = (result) => ({
  type: actionTypes.GET_Q_ENDED_PROPOSALS_SUCCESS,
  result
});
export const getQEndedProposalsError = (result) => ({
  type: actionTypes.GET_Q_ENDED_PROPOSALS_ERROR,
  result
});

export const getQProposalsList = () => ({
  type: actionTypes.GET_Q_PROPOSALS_LIST,
});

export const getQProposalsListSuccess = (result) => ({
  type: actionTypes.GET_Q_PROPOSALS_LIST_SUCCESS,
  result
});

export const getQProposalsListError = (result) => ({
  type: actionTypes.GET_Q_PROPOSALS_LIST_ERROR,
  result
});

export const getProposalQ = (contractName, id, activeProposal) => ({
  type: actionTypes.GET_Q_PROPOSAL,
  contractName,
  id,
  activeProposal
});

export const getProposalSuccess = (result) => ({
  type: actionTypes.GET_Q_PROPOSAL_SUCCESS,
  result,
});
export const getOneProposalSuccess = (result) => ({
  type: actionTypes.GET_Q_ONE_PROPOSAL_SUCCESS,
  result,
});
export const getEmptyProposalSuccess = (result) => ({
  type: actionTypes.GET_Q_EMPTY_PROPOSAL_SUCCESS,
  result,
});

export const getProposalError = (result) => ({
  type: actionTypes.GET_Q_PROPOSAL_ERROR,
  result,
});

export const getQProposalEnded = () => ({
  type: actionTypes.GET_Q_PROPOSAL_ENDED,
});
export const getProposalEndedSuccess = (result) => ({
  type: actionTypes.GET_Q_PROPOSAL_ENDED_SUCCESS,
  result,
});
export const getEmptyProposalEndedSuccess = (result) => ({
  type: actionTypes.GET_Q_EMPTY_PROPOSAL_ENDED_SUCCESS,
  result,
});

export const getProposalEndedError = (result) => ({
  type: actionTypes.GET_Q_PROPOSAL_ENDED_ERROR,
  result,
});
