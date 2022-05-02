import React, { useState } from 'react'
import Button from 'components/Base/Buttons/Button'
import { LOAD_TYPES } from 'constants/statuses'
import { chainIds, networkParameters } from 'constants/config'

import { useSelector } from 'react-redux'
import { loadTypeSelector, networkSelector } from 'store/user-inf/selectors'
import { ethereum } from 'components/Custom/LoadingMetaMask/LoadingMetaMask'
import InstallMetamask from './InstallMetamask'
import ErrorHandler from 'func/ErrorHandler'

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
        ErrorHandler.processWithoutFeedback(error)
      }
    }
    ErrorHandler.processWithoutFeedback(error)
  }
}

async function requestLogin () {
  try {
    await ethereum.request({ method: 'eth_requestAccounts' })
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

const ConnectButton = ({ handleButton, title }) => (
    <Button alwaysEnabled handleButton={handleButton} title={title} margin="0 0 0 20px" />
)

function ConnectButtons () {
  const loadType = useSelector(loadTypeSelector)
  const network = useSelector(networkSelector)

  const [modalShow, setModalShow] = useState(false)

  function handleModalShow () {
    setModalShow(!modalShow)
  }

  function handleRequest (chainId, networkParam) {
    network === chainId ? requestLogin() : requestConnect(networkParam)
  }

  switch (loadType) {
    case LOAD_TYPES.loaded:
      return null
    case LOAD_TYPES.wrongNetwork:
    case LOAD_TYPES.notLogged:
      return (
                <>
                    <ConnectButton
                        title="Connect to Q Mainnet"
                        handleButton={() => handleRequest(chainIds.mainnet, networkParameters.mainnet)}
                    />
                    <ConnectButton
                        title="Connect to Q Testnet"
                        handleButton={() => handleRequest(chainIds.testnet, networkParameters.testnet)}
                    />
                </>
      )
    default:
      return (
                <>
                    <ConnectButton title="Install Metamask" handleButton={handleModalShow} />
                    <InstallMetamask modalShow={modalShow} setModalShow={handleModalShow} />
                </>
      )
  }
}

export default ConnectButtons
