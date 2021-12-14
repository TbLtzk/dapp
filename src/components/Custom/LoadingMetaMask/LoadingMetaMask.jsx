import React, { useEffect, useState } from 'react'
import Web3 from 'web3'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import StartConfigurations from 'pages/StartConfigurations'

import { WrapContainer } from './styles'

import { getContractRegistryInstance } from 'contracts/contract-instance'
import { useDispatch } from 'react-redux'
import App from 'components/Base/App'
import { setUserAddress } from 'store/user-inf/action-creators'
import { LOAD_TYPES } from 'constants/statuses'
import { getNumberAllProposals } from 'store/voting/proposals/action-creators'
import { getAuctionsCount } from 'store/auctions/action-creators'

const web3 = new Web3(Web3.givenProvider)

function LoadingMetaMask () {
  const [isMetaMask, setIsMetaMask] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('Please install MetaMask!')
  const dispatch = useDispatch()

  const ethereum = window.ethereum

  const initMetamask = async () => {
    web3.eth.getAccounts(async (err, accounts) => {
      if (err != null) {
        setIsMetaMask(LOAD_TYPES.error)
        setErrorMessage('Please install MetaMask!')
      } else if (!accounts.length) {
        setIsMetaMask(LOAD_TYPES.notLogged)
      } else {
        const { ethereum } = window
        window.web3 = new Web3(ethereum)
        window.web3.eth.handleRevert = true
        const addresses = await window.web3.eth.getAccounts()
        dispatch(setUserAddress(addresses[0]))
        initAccount()
      }
    })
    ethereum?.on('accountsChanged', (accounts) => {
      window.location.reload()
    })
    ethereum?.on('chainChanged', (networkId) => {
      window.location.reload()
    })
    web3.eth.net.getNetworkType((err, netId) => {
      if (err) {
        console.error(err)
      }
      if (netId !== 'private') {
        setErrorMessage('Choose the correct network!')
        setIsMetaMask(LOAD_TYPES.error)
      }
    })
    if (ethereum?.isMetaMask) {
      try {
        await new Promise((resolve, reject) => {
          ethereum.enable()
        })
      } catch (error) {
        setIsMetaMask(LOAD_TYPES.initError)
      }
    }
  }

  const initAccount = async () => {
    try {
      await getContractRegistryInstance()
      dispatch(getNumberAllProposals())
      dispatch(getAuctionsCount())
      setIsMetaMask(LOAD_TYPES.loaded)
    } catch {
      setIsMetaMask(LOAD_TYPES.initError)
    }
  }

  useEffect(() => {
    initMetamask()
  }, [web3, ethereum])

  switch (isMetaMask) {
    case LOAD_TYPES.notLogged:
      return <StartConfigurations error="Waiting for login in MetaMask!" />
    case LOAD_TYPES.error:
      return <StartConfigurations error={errorMessage} />
    case LOAD_TYPES.initError:
      return <WrapContainer>Can\'t load account data. Please reload app</WrapContainer>
    case LOAD_TYPES.loaded:
      return <App />
    default:
      return (
                <WrapContainer>
                    <LoadingSpinner type="light" />
                </WrapContainer>
      )
  }
}

export default LoadingMetaMask
