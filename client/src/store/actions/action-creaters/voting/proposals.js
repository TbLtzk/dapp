import * as actionTypes from 'store/actions/action-types/voting/proposals';

/* create proposal staff */
export const setCreateProposalObj = (result) => ({
  type: actionTypes.SET_CREATED_PROPOSAL_OBJECT,
  result
});

export const setCreatedStepsLimit = (result) => ({
  type: actionTypes.SET_CREATED_STEPS_LIMIT,
  result
});

export const setStepCounter = (result) => ({
  type: actionTypes.SET_STEP_COUNTER,
  result
});

export const setDisabledCreatedProposalBtn = (result) => ({
  type: actionTypes.SET_DISABLED_CREATED_PROPOSAL_BTN,
  result
});

export const createProposal = (drizzle, data) => ({
  type: actionTypes.CREATE_PROPOSAL,
  drizzle,
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

export const voteForProposal = (drizzle, data) => ({
  type: actionTypes.VOTE_FOR_PROPOSAL,
  drizzle,
  data
});
export const voteForProposalSuccess = (result) => ({
  type: actionTypes.VOTE_FOR_PROPOSAL_SUCCESS,
  result
});

export const getEndedProposals = (drizzle, activeTab) => ({
  type: actionTypes.GET_ENDED_PROPOSALS,
  drizzle,
  activeTab
});
export const getEndedProposalsSuccess = (result) => ({
  type: actionTypes.GET_ENDED_PROPOSALS_SUCCESS,
  result
});
export const getEndedProposalsError = (result) => ({
  type: actionTypes.GET_ENDED_PROPOSALS_ERROR,
  result
});

export const executeProposal = (drizzle, data) => ({
  type: actionTypes.EXECUTE_PROPOSAL,
  drizzle,
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


export const updateProposal = (drizzle, data) => ({
  type: actionTypes.UPDATE_PROPOSAL,
  drizzle,
  data
});

export const getOneProposal = (drizzle, data) => ({
  type: actionTypes.GET_ONE_PROPOSAL,
  drizzle,
  data
});

export const getProposalsList = (drizzle, activeTab) => ({
  type: actionTypes.GET_PROPOSALS_LIST,
  drizzle,
  activeTab
});

export const getProposalsListSuccess = (result) => ({
  type: actionTypes.GET_PROPOSALS_LIST_SUCCESS,
  result
});

export const getProposalsListError = (result) => ({
  type: actionTypes.GET_PROPOSALS_LIST_ERROR,
  result
});

export const getProposalVote = (contractName, id, drizzle, activeTab, activeProposal) => ({
  type: actionTypes.GET_PROPOSAL,
  contractName,
  id,
  drizzle,
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
