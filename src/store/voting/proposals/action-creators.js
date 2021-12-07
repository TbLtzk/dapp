import * as actionTypes from './action-types'

/* create proposal staff */
export const setCreateProposalObj = (result) => ({
  type: actionTypes.SET_CREATED_PROPOSAL_OBJECT,
  result
})

export const setCreatedStepsLimit = (result) => ({
  type: actionTypes.SET_CREATED_STEPS_LIMIT,
  result
})

export const setStepCounter = (result) => ({
  type: actionTypes.SET_STEP_COUNTER,
  result
})

export const setDisabledCreatedProposalBtn = (result) => ({
  type: actionTypes.SET_DISABLED_CREATED_PROPOSAL_BTN,
  result
})

export const createProposal = (data) => ({
  type: actionTypes.CREATE_PROPOSAL,
  data
})

export const createProposalSuccess = (result) => ({
  type: actionTypes.CREATE_PROPOSAL_SUCCESS,
  result
})

/* vote proposal staff */
export const setVoteProposalObj = (result) => ({
  type: actionTypes.SET_VOTE_PROPOSAL_OBJECT,
  result
})

export const setStepVoteCounter = (result) => ({
  type: actionTypes.SET_STEP_VOTE_COUNTER,
  result
})

export const voteForProposal = (data) => ({
  type: actionTypes.VOTE_FOR_PROPOSAL,
  data
})
export const voteForProposalSuccess = (result) => ({
  type: actionTypes.VOTE_FOR_PROPOSAL_SUCCESS,
  result
})

export const executeProposal = (data) => ({
  type: actionTypes.EXECUTE_PROPOSAL,
  data
})
export const executeProposalSuccess = (result) => ({
  type: actionTypes.EXECUTE_PROPOSAL_SUCCESS,
  result
})
export const executeProposalError = (result) => ({
  type: actionTypes.EXECUTE_PROPOSAL_ERROR,
  result
})

export const updateProposal = (data) => ({
  type: actionTypes.UPDATE_PROPOSAL,
  data
})

export const getOneProposal = (data) => ({
  type: actionTypes.GET_ONE_PROPOSAL,
  data
})

export const getProposalsList = (proposalType, proposalStatusType, range) => ({
  type: actionTypes.GET_PROPOSALS_LIST,
  proposalType,
  proposalStatusType,
  range
})

// dashboard
export const getNumberAllProposals = () => ({
  type: actionTypes.GET_NUMBER_ALL_PROPOSALS
})

export const getConstitutionHash = () => ({
  type: actionTypes.GET_CONSTITUTION_HASH
})

export const getConstitutionHashSuccess = (result) => ({
  type: actionTypes.GET_CONSTITUTION_HASH_SUCCESS,
  result
})

export const onChangeProposalTab = () => ({
  type: actionTypes.ON_CHANGE_PROPOSAL_TAB
})

export const onSetActiveTab = (activeTab) => ({
  type: actionTypes.ACTIVE_TAB,
  activeTab
})

export const getBaseVotingWeightInfo = () => ({
  type: actionTypes.GET_BASE_VOTING_WEIGHT_INFO
})

export const setBaseVotingWeightInfo = (data) => ({
  type: actionTypes.SET_BASE_VOTING_WEIGHT_INFO,
  payload: data
})

// one proposal
export const getProposal = (contractName, id) => ({
  type: actionTypes.GET_PROPOSAL,
  contractName,
  id
})

export const setProposal = (result) => ({
  type: actionTypes.SET_PROPOSAL,
  result
})

// executed
export const setExecutedProposal = result => ({
  type: actionTypes.SET_EXECUTED_PROPOSAL,
  result
})
