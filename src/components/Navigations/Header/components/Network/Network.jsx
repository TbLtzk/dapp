import React from 'react'
import { useSelector } from 'react-redux'
import { networkSelector } from 'store/user-inf/selectors'
import { NetworkWrapper } from '../../styles'

const networks = {
  35443: 'Testnet',
  35442: 'Devnet',
  35441: 'Mainnet'
}

function Network () {
  const network = useSelector(networkSelector)
  return <NetworkWrapper network={network}>Network: {networks[network]}</NetworkWrapper>
}

export default Network
