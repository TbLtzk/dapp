import * as actionTypes from '../action-types/user-auth'

export const detectEthereumProvider = () => ({
  type: actionTypes.DETECT_ETHEREUM_PROVIDER
})

export const detectEthereumProviderSuccess = (payload) => ({
  type: actionTypes.DETECT_ETHEREUM_PROVIDER_SUCCESS,
  payload
})

export const detectEthereumProviderError = (payload) => ({
  type: actionTypes.DETECT_ETHEREUM_PROVIDER_ERROR,
  payload
})
