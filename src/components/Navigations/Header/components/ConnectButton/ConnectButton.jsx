import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'components/Base/Buttons/Button'
import { LOAD_TYPES } from 'constants/statuses'
import { networkParameters } from 'constants/config'

import { getParametersDependsOnUrl } from 'func/useful'
import { useSelector } from 'react-redux'
import { loadTypeSelector } from 'store/user-inf/selectors'
import { ethereum } from 'components/Custom/LoadingMetaMask/LoadingMetaMask'

async function requestConnect (params) {
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: params.chainId }]
    })
  } catch (error) {
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [params]
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}

function ConnectButton () {
  const history = useHistory()
  const loadType = useSelector(loadTypeSelector)
  const parameters = getParametersDependsOnUrl()
  const params = networkParameters[parameters.name]

  async function handleLoginToMetamask () {
    await ethereum.request({ method: 'eth_requestAccounts' })
  }

  switch (loadType) {
    case LOAD_TYPES.notInstalled: {
      return (
                <Button
                    handleButton={() => history.push('/start-configurations')}
                    title={'Install Metamask'}
                    margin="0 20px 0 0"
                />
      )
    }

    case LOAD_TYPES.wrongNetwork: {
      return (
                <Button
                    handleButton={async () => await requestConnect(params)}
                    title={`Connect to ${parameters.name}`}
                    margin="0 20px 0 0"
                />
      )
    }
    case LOAD_TYPES.notLogged: {
      return (
                <>
                    <Button
                        handleButton={() => requestConnect(params)}
                        title={`Connect to ${parameters.name}`}
                        margin="0 20px 0 0"
                    />
                    <Button handleButton={handleLoginToMetamask} title="Login in" margin="0 20px 0 0" />
                </>
      )
    }
    default:
      return null
  }
}

export default ConnectButton
