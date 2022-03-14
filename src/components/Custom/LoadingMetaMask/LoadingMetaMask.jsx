import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import LoadingSpinner from 'components/Base/LoadingSpinner'

import { WrapContainer } from './styles'

import { getContractRegistryInstance } from 'contracts/contract-instance'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadType, setNetwork, setUserAddress } from 'store/user-inf/action-creators'
import { AUCTIONS_TYPES, LOAD_TYPES } from 'constants/statuses'
import { getNumberAllProposals } from 'store/voting/proposals/action-creators'
import { getAuctions } from 'store/auctions/action-creators'
import { mode } from 'store/dashboard-mode/selectors'
import { MODE } from 'components/Base/DashboardMode/DashboardMode'
import { getCheckIsUserRootNode } from 'store/root-node/action-creators'
import { getParametersDependsOnUrl } from 'func/useful'
import Routes from 'navigation/Routes'
import { networks } from 'constants/config'

const web3 = new Web3(Web3.givenProvider)

export const { ethereum } = window
export let address = '0x0000000000000000000000000000000000000000'

function LoadingMetaMask () {
  const dispatch = useDispatch()
  const appMode = useSelector(mode)
  const networkParams = getParametersDependsOnUrl()
  const [isMetaMask, setIsMetaMask] = useState(LOAD_TYPES.loading)

  async function loadAdditionalInfo () {
    if (appMode === MODE.advanced) {
      dispatch(getAuctions(AUCTIONS_TYPES.all))
    }
    dispatch(getNumberAllProposals())
    dispatch(getCheckIsUserRootNode(address))
  }

  async function initMetamask () {
    try {
      if (!ethereum) {
        // user withoout metamask
        window.web3 = new Web3(new Web3.providers.HttpProvider(networkParams?.rpc || 'https://rpc.qtestnet.org'))
        dispatch(setLoadType(LOAD_TYPES.notInstalled))
      } else {
        // user with metamask
        ethereum?.on('accountsChanged', () => {
          window.location.reload()
        })

        ethereum?.on('chainChanged', () => {
          window.location.reload()
        })

        const networkId = await new Promise((resolve) => {
          // check network id
          /* Fix issue with first Metamask launch. */
          const timeout = setTimeout(() => {
            window.location.reload()
          }, 5000)
          ethereum.request({ method: 'net_version' }).then((netId) => {
            clearTimeout(timeout)
            resolve(netId)
          })
        })
        if (!networks[networkId]) {
          // wrong network
          window.web3 = new Web3(new Web3.providers.HttpProvider(networkParams.rpc))
          dispatch(setLoadType(LOAD_TYPES.wrongNetwork))
        } else {
          // right network
          const accounts = await web3.eth.getAccounts()

          if (accounts.length) {
            // logged in
            address = accounts[0]
            window.web3 = new Web3(ethereum)
            dispatch(setUserAddress(accounts[0]))
            dispatch(setLoadType(LOAD_TYPES.loaded))
          } else {
            // not logged
            window.web3 = new Web3(ethereum)
            dispatch(setLoadType(LOAD_TYPES.notLogged))
          }
          dispatch(setNetwork(networkId))
        }
      }
      await getContractRegistryInstance()
      await loadAdditionalInfo()
      setIsMetaMask(LOAD_TYPES.loaded)
    } catch (error) {
      console.log(error)
      setIsMetaMask(LOAD_TYPES.initError)
    }
  }

  useEffect(() => {
    initMetamask()
  }, [dispatch, web3, ethereum])

  switch (isMetaMask) {
    case LOAD_TYPES.initError:
      return <WrapContainer height='100vh'>Can\'t load account data. Please reload app</WrapContainer>
    case LOAD_TYPES.loaded:
      return <Routes />
    case LOAD_TYPES.loading:
    default:
      return (
                <WrapContainer height='100vh'>
                    <LoadingSpinner type="light" />
                </WrapContainer>
      )
  }
}

export default LoadingMetaMask
