import * as actionTypes from './action-types'

export const getContractRegistryKV = () => ({
  type: actionTypes.GET_CONTRACT_REGISTRY_KV
})

export const getContractRegistryKVSuccess = (result) => ({
  type: actionTypes.GET_CONTRACT_REGISTRY_KV_SUCCESS,
  result
})
export const getContractRegistryKVError = (result) => ({
  type: actionTypes.GET_CONTRACT_REGISTRY_KV_ERROR,
  result
})

export const getConstitutionParametersKV = () => ({
  type: actionTypes.GET_CONSTITUTION_PARAMETERS_KV
})

export const getConstitutionParametersKVSuccess = (result) => ({
  type: actionTypes.GET_CONSTITUTION_PARAMETERS_KV_SUCCESS,
  result
})
export const getConstitutionParametersKVError = (result) => ({
  type: actionTypes.GET_CONSTITUTION_PARAMETERS_KV_ERROR,
  result
})

export const getFeesIncentivesExpertPanelParametersKV = () => ({
  type: actionTypes.GET_FEES_INCENTIVES_EXPERT_PANEL_PARAMETERS_KV
})

export const getFeesIncentivesExpertPanelParametersKVSuccess = (result) => ({
  type: actionTypes.GET_FEES_INCENTIVES_EXPERT_PANEL_PARAMETERS_KV_SUCCESS,
  result
})
export const getFeesIncentivesExpertPanelParametersKVError = (result) => ({
  type: actionTypes.GET_FEES_INCENTIVES_EXPERT_PANEL_PARAMETERS_KV_ERROR,
  result
})

export const getEPDRParametersKV = () => ({
  type: actionTypes.GET_EPDR_PARAMETERS_KV
})

export const getEPDRParametersKVSuccess = (result) => ({
  type: actionTypes.GET_EPDR_PARAMETERS_KV_SUCCESS,
  result
})
export const getEPDRParametersKVError = (result) => ({
  type: actionTypes.GET_EPDR_PARAMETERS_KV_ERROR,
  result
})

export const getEPRSParametersKV = () => ({
  type: actionTypes.GET_EPRS_PARAMETERS_KV
})

export const getEPRSParametersKVSuccess = (result) => ({
  type: actionTypes.GET_EPRS_PARAMETERS_KV_SUCCESS,
  result
})
export const getEPRSParametersKVError = (result) => ({
  type: actionTypes.GET_EPRS_PARAMETERS_KV_ERROR,
  result
})
