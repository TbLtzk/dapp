import * as actionTypes from 'store/actions/action-types/voting/proposals'

const initialState = {
  createProposalLoading: true,
  createProposalResult: null,

  formObjectCreateProposal: {},
  createdStepsLimit: 4,
  stepCounter: 1,
  disabledContinueBtn: true,

  formObjectVoteProposal: {},
  stepVoteCounter: 1,

  numberOfAllProposals: 0,
  loadingNumberAll: true,
  constitutionHash: '...'
}

export default function proposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CREATED_PROPOSAL_OBJECT:
      return {
        ...state,
        formObjectCreateProposal: action.result
      }
    case actionTypes.SET_CREATED_STEPS_LIMIT:
      return {
        ...state,
        createdStepsLimit: action.result
      }
    case actionTypes.SET_STEP_COUNTER:
      return {
        ...state,
        stepCounter: action.result
      }
    case actionTypes.SET_DISABLED_CREATED_PROPOSAL_BTN:
      return {
        ...state,
        disabledContinueBtn: action.result
      }
    case actionTypes.SET_VOTE_PROPOSAL_OBJECT:
      return {
        ...state,
        formObjectVoteProposal: action.result
      }
    case actionTypes.SET_STEP_VOTE_COUNTER:
      return {
        ...state,
        stepVoteCounter: action.result
      }
    case actionTypes.GET_NUMBER_ALL_PROPOSALS:
      return {
        ...state,
        loadingNumberAll: true
      }
    case actionTypes.GET_NUMBER_ALL_PROPOSALS_SUCCESS:
      return {
        ...state,
        numberOfAllProposals: action.result,
        loadingNumberAll: false
      }
    case actionTypes.GET_CONSTITUTION_HASH_SUCCESS:
      return {
        ...state,
        constitutionHash: action.result
      }
    case actionTypes.ON_CHANGE_PROPOSAL_TAB:
      return {
        ...state,
        proposalsArr: []
      }
    default:
      return state
  }
}
