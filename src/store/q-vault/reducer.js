import * as actionTypes from './action-types'

const initialState = {
  lastUpdate: 0,
  isLoading: false,
  error: '',
  userBalance: 0,
  accountBalance: 0,
  votingWeight: 0,
  votingLockingEnd: 0,
  deposit: 0,
  lastClaim: 0,
  updateCompoundRate: false,

  delegationList: [],
  loadingDelegationList: false,
  errorDelegationList: null,
  receivedWeight: 0,
  votingAgent: '0x0000000000000000000000000000000000000000',
  isPendingDelegation: false,
  votingAgentPassOverTime: 0,

  qvBalance: 0,
  outstandingDelegationRewards: 0,

  qVaultMinimumTimeLock: 0,
  qVaultTimeLocks: []
}

export default function qVault (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_QV_DATA_IS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.SET_QV_ERROR:
      return {
        ...state,
        lastUpdate: Date.now(),
        isLoading: false,
        error: action.error
      }
    default:
      const newState = {
        ...state,
        lastUpdate: Date.now(),
        isLoading: false,
        error: ''
      }
      switch (action.type) {
        case actionTypes.SET_UPDATE_COMPOUND_RATE:
          return {
            ...newState,
            updateCompoundRate: action.payload
          }
        case actionTypes.SET_ACCOUNT_BALANCE:
          return {
            ...newState,
            accountBalance: action.payload
          }
        case actionTypes.SET_QV_USER_BALANCE:
          return {
            ...newState,
            userBalance: action.payload
          }
        case actionTypes.SET_QV_LOCKED_ASSETS:
          return {
            ...newState,
            votingWeight: action.votingWeight,
            votingLockingEnd: action.votingLockingEnd
          }
        case actionTypes.GET_DELEGATIONS_LIST:
          return {
            ...state,
            loadingDelegationList: true
          }
        case actionTypes.GET_DELEGATIONS_LIST_SUCCESS:
          return {
            ...state,
            loadingDelegationList: false,
            delegationList: action.result,
            errorDelegationList: null
          }
        case actionTypes.GET_DELEGATIONS_LIST_ERROR:
          return {
            ...state,
            loadingDelegationList: false,
            delegationList: [],
            errorDelegationList: action.result
          }
        case actionTypes.GET_QV_BALANCE_SUCCESS:
          return {
            ...state,
            qvBalance: action.result
          }
        case actionTypes.GET_OUTSTANDING_DELEGATION_REWARDS_SUCCESS:
          return {
            ...state,
            outstandingDelegationRewards: action.result,
            lastClaim: +new Date()
          }
        case actionTypes.GET_OUTSTANDING_DELEGATION_REWARDS_ERROR:
          return {
            ...state,
            outstandingDelegationRewards: 0
          }
        case actionTypes.SET_QVAULT_MINIMUM_TIME_LOCK:
          return {
            ...state,
            qVaultMinimumTimeLock: action.payload
          }
        case actionTypes.SET_QVAULT_TIME_LOCKS:
          return {
            ...state,
            qVaultTimeLocks: action.payload
          }
        case actionTypes.SET_DELEGATION_INFO:
          return {
            ...state,
            receivedWeight: action.result.receivedWeight,
            votingAgent: action.result.votingAgent,
            isPendingDelegation: action.result.isPending,
            votingAgentPassOverTime: action.result.votingAgentPassOverTime
          }
        default:
          return state
      }
  }
}
