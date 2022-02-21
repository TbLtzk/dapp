import * as actionTypes from './action-types'

const initialState = {
  contractRegistryKV: [],
  contractRegistryKVLoading: false,
  contractRegistryKVError: null,

  constitutionParametersKV: [],
  constitutionParametersKVLoading: false,
  constitutionParametersKVError: null,

  feesIncentivesExpertPanelParametersKV: [],
  feesIncentivesExpertPanelParametersKVLoading: false,
  feesIncentivesExpertPanelParametersKVError: null,

  ePDRParametersKV: [],
  ePDRParametersKVLoading: false,
  ePDRParametersKVError: null,

  ePRSParametersKV: [],
  ePRSParametersKVLoading: false,
  ePRSParametersKVError: null
}

export default function membership (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CONTRACT_REGISTRY_KV:
      return {
        ...state,
        contractRegistryKVLoading: true
      }
    case actionTypes.GET_CONTRACT_REGISTRY_KV_SUCCESS:
      return {
        ...state,
        contractRegistryKVLoading: false,
        contractRegistryKV: action.result
      }
    case actionTypes.GET_CONTRACT_REGISTRY_KV_ERROR:
      return {
        ...state,
        contractRegistryKVLoading: false,
        contractRegistryKV: [],
        contractRegistryKVError: action.result
      }

    case actionTypes.GET_CONSTITUTION_PARAMETERS_KV:
      return {
        ...state,
        constitutionParametersKVLoading: true
      }
    case actionTypes.GET_CONSTITUTION_PARAMETERS_KV_SUCCESS:
      return {
        ...state,
        constitutionParametersKVLoading: false,
        constitutionParametersKV: action.result
      }
    case actionTypes.GET_CONSTITUTION_PARAMETERS_KV_ERROR:
      return {
        ...state,
        constitutionParametersKVLoading: false,
        constitutionParametersKV: [],
        constitutionParametersKVError: action.result
      }

    case actionTypes.GET_FEES_INCENTIVES_EXPERT_PANEL_PARAMETERS_KV:
      return {
        ...state,
        feesIncentivesExpertPanelParametersKVLoading: true
      }
    case actionTypes.GET_FEES_INCENTIVES_EXPERT_PANEL_PARAMETERS_KV_SUCCESS:
      return {
        ...state,
        feesIncentivesExpertPanelParametersKVLoading: false,
        feesIncentivesExpertPanelParametersKV: action.result
      }
    case actionTypes.GET_FEES_INCENTIVES_EXPERT_PANEL_PARAMETERS_KV_ERROR:
      return {
        ...state,
        feesIncentivesExpertPanelParametersKVLoading: false,
        feesIncentivesExpertPanelParametersKV: [],
        feesIncentivesExpertPanelParametersKVError: action.result
      }

    case actionTypes.GET_EPDR_PARAMETERS_KV:
      return {
        ...state,
        ePDRParametersKVLoading: true
      }
    case actionTypes.GET_EPDR_PARAMETERS_KV_SUCCESS:
      return {
        ...state,
        ePDRParametersKVLoading: false,
        ePDRParametersKV: action.result
      }
    case actionTypes.GET_EPDR_PARAMETERS_KV_ERROR:
      return {
        ...state,
        ePDRParametersKVLoading: false,
        ePDRParametersKV: [],
        ePDRParametersKVError: action.result
      }
    case actionTypes.GET_EPRS_PARAMETERS_KV:
      return {
        ...state,
        ePRSParametersKVLoading: true
      }
    case actionTypes.GET_EPRS_PARAMETERS_KV_SUCCESS:
      return {
        ...state,
        ePRSParametersKVLoading: false,
        ePRSParametersKV: action.result
      }
    case actionTypes.GET_EPRS_PARAMETERS_KV_ERROR:
      return {
        ...state,
        ePRSParametersKVLoading: false,
        ePRSParametersKV: [],
        ePRSParametersKVError: action.result
      }
    default:
      return state
  }
}
