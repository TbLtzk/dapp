import React, { useEffect, useState } from 'react'
import Web3 from 'web3'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import StartConfigurations from 'pages/StartConfigurations'

import { WrapContainer } from './styles'

import { getContractRegistryInstance } from 'contracts/contract-instance'
import { useDispatch, useSelector } from 'react-redux'
import App from 'components/Base/App'
import { setNetwork, setUserAddress } from 'store/user-inf/action-creators'
import { AUCTIONS_TYPES, LOAD_TYPES } from 'constants/statuses'
import { getNumberAllProposals } from 'store/voting/proposals/action-creators'
import { getAuctions } from 'store/auctions/action-creators'
import { mode } from 'store/dashboard-mode/selectors'
import { MODE } from 'components/Base/DashboardMode/DashboardMode'

const web3 = new Web3(Web3.givenProvider)
const { ethereum } = window

export let address = ''

function LoadingMetaMask () {
  const dispatch = useDispatch()
  const appMode = useSelector(mode)

  const [isMetaMask, setIsMetaMask] = useState(LOAD_TYPES.loading)
  const [errorMessage, setErrorMessage] = useState('Please install MetaMask!')

  const loadAdditionalInfo = () => {
    if (appMode === MODE.advanced) {
      dispatch(getAuctions(AUCTIONS_TYPES.all))
    }
    dispatch(getNumberAllProposals())
  }

  const initMetamask = async () => {
    try {
      const networks = ['35443', '35442', '35441']
      if (!ethereum) {
        setErrorMessage('Please install MetaMask!')
        setIsMetaMask(LOAD_TYPES.error)
      } else {
        const networkId = await new Promise((resolve) => { /* Fix issue with first Metamask launch. */
          const timeout = setTimeout(() => {
            window.location.reload()
          }, 5000)
          ethereum.request({ method: 'net_version' }).then((netId) => {
            clearTimeout(timeout)
            resolve(netId)
          })
        })
        if (!networks.includes(networkId)) {
          setErrorMessage('Choose the correct network!')
          setIsMetaMask(LOAD_TYPES.error)
        } else {
          const accounts = await web3.eth.getAccounts()
          if (accounts.length) {
            window.web3 = new Web3(ethereum)
            window.web3.eth.handleRevert = true
            dispatch(setUserAddress(accounts[0]))
            dispatch(setNetwork(networkId))
            address = accounts[0]
            await getContractRegistryInstance()
            loadAdditionalInfo()
            setIsMetaMask(LOAD_TYPES.loaded)
          } else {
            setErrorMessage('Waiting for login in MetaMask!')
            setIsMetaMask(LOAD_TYPES.notLogged)
            await ethereum.request({ method: 'eth_requestAccounts' })
            window.location.reload()
          }
        }
      }

      ethereum?.on('accountsChanged', () => {
        window.location.reload()
      })

      ethereum?.on('chainChanged', () => {
        window.location.reload()
      })
    } catch (err) {
      setIsMetaMask(LOAD_TYPES.initError)
      console.error(err)
    }
  }

  useEffect(() => {
    initMetamask()
  }, [web3, ethereum])

  switch (isMetaMask) {
    case LOAD_TYPES.notLogged:
      return <StartConfigurations error={errorMessage} />
    case LOAD_TYPES.error:
      return <StartConfigurations error={errorMessage} />
    case LOAD_TYPES.initError:
      return <WrapContainer>Can\'t load account data. Please reload app</WrapContainer> // can add refresh after 5 seconds
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
