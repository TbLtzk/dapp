import { networks } from 'constants/config'
import React from 'react'
import { useSelector } from 'react-redux'
import { networkSelector } from 'store/user-inf/selectors'
import { NetworkWrapper } from '../../styles'

function Network () {
  const network = useSelector(networkSelector)

  if (!networks[network]) {
    return null
  }
  return <NetworkWrapper network={network}>Network: {networks[network]}</NetworkWrapper>
}

export default Network
