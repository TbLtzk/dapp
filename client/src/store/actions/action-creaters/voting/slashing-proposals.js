import * as actionTypes from 'store/actions/action-types/voting/slashing-proposals';

export const createProposal = (data) => ({
  type: actionTypes.CREATE_PROPOSAL,
  data
});

export const createProposalSuccess = (result) => ({
  type: actionTypes.CREATE_PROPOSAL_SUCCESS,
  result
});
/*vote proposal staff*/
export const setVoteProposalObj = (result) => ({
  type: actionTypes.SET_VOTE_PROPOSAL_OBJECT,
  result
});

export const setStepVoteCounter = (result) => ({
  type: actionTypes.SET_STEP_VOTE_COUNTER,
  result
});

export const voteForProposal = (data) => ({
  type: actionTypes.VOTE_FOR_PROPOSAL,
  data
});
export const voteForProposalSuccess = (result) => ({
  type: actionTypes.VOTE_FOR_PROPOSAL_SUCCESS,
  result
});

export const executeProposal = (data) => ({
  type: actionTypes.EXECUTE_PROPOSAL,
  data
});
export const executeProposalSuccess = (result) => ({
  type: actionTypes.EXECUTE_PROPOSAL_SUCCESS,
  result
});
export const executeProposalError = (result) => ({
  type: actionTypes.EXECUTE_PROPOSAL_ERROR,
  result
});

export const updateProposal = (data) => ({
  type: actionTypes.UPDATE_PROPOSAL,
  data
});

export const getOneProposal = (data) => ({
  type: actionTypes.GET_ONE_PROPOSAL,
  data
});

export const getProposalsList = (activeTab) => ({
  type: actionTypes.GET_PROPOSALS_LIST,
  activeTab
});

export const getSlashingProposalsListSuccess = (result) => ({
  type: actionTypes.GET_PROPOSALS_LIST_SUCCESS,
  result
});

export const getSlashingProposalsListError = (result) => ({
  type: actionTypes.GET_PROPOSALS_LIST_ERROR,
  result
});

export const getProposalSlashing = (contractName, id, activeTab, activeProposal) => ({
  type: actionTypes.GET_PROPOSAL,
  contractName,
  id,
  activeTab,
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

//escrow
export const onEscrowCastObjection = (data, contractName, proposalId) => ({
  type: actionTypes.ESCROW_CAST_OBJECTION,
  data,
  contractName,
  proposalId
});
export const onEscrowCastObjectionSuccess = (result) => ({
  type: actionTypes.ESCROW_CAST_OBJECTION_SUCCESS,
  result,
});

export const onEscrowCastObjectionError = (result) => ({
  type: actionTypes.ESCROW_CAST_OBJECTION_ERROR,
  result,
});

export const onEscrowProposeDecision = (data, contractName, proposalId) => ({
  type: actionTypes.ESCROW_PROPOSE_DECISION,
  data,
  contractName,
  proposalId
});

export const onEscrowRecallProposeDecision = (contractName, proposalId) => ({
  type: actionTypes.ESCROW_RECALL_PROPOSE_DECISION,
  contractName,
  proposalId
});
export const onEscrowConfirmDecision = (contractName, proposalId) => ({
  type: actionTypes.ESCROW_CONFIRM_DECISION,
  contractName,
  proposalId
});

export const getEndedProposals = (activeTab) => ({
  type: actionTypes.GET_ENDED_PROPOSALS,
  activeTab
});
export const getSlashingEndedProposalsSuccess = (result) => ({
  type: actionTypes.GET_ENDED_PROPOSALS_SUCCESS,
  result
});
export const getSlashingEndedProposalsError = (result) => ({
  type: actionTypes.GET_ENDED_PROPOSALS_ERROR,
  result
});
