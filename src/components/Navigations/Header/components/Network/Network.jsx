import { networks } from 'constants/config'
import { getParametersDependsOnUrl } from 'func/useful'
import React from 'react'
import { useSelector } from 'react-redux'
import { networkSelector } from 'store/user-inf/selectors'
import { NetworkWrapper } from '../../styles'

function Network () {
  const network = useSelector(networkSelector)
  const parameters = getParametersDependsOnUrl()

  return <NetworkWrapper network={network}>Network: {networks[network || parameters.chainId]}</NetworkWrapper>
}

export default Network
