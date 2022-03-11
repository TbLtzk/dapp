import React, { useState } from 'react'
import Button from 'components/Base/Buttons/Button'
import { LOAD_TYPES } from 'constants/statuses'
import { networkParameters } from 'constants/config'

import { getParametersDependsOnUrl } from 'func/useful'
import { useSelector } from 'react-redux'
import { loadTypeSelector, networkSelector } from 'store/user-inf/selectors'
import { ethereum } from 'components/Custom/LoadingMetaMask/LoadingMetaMask'
import InstallMetamask from './InstallMetamask'

async function requestConnect (params) {
  params = networkParameters[params.name]

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

async function requestLogin () {
  await ethereum.request({ method: 'eth_requestAccounts' })
}

function ConnectButton () {
  const loadType = useSelector(loadTypeSelector)
  const network = useSelector(networkSelector)
  const params = getParametersDependsOnUrl()

  const [modalShow, setModalShow] = useState(false)

  function handleModalShow () {
    setModalShow(!modalShow)
  }

  const isSameNetwork = Number(network) === params.chainId

  switch (loadType) {
    case LOAD_TYPES.loaded:
      return null
    case LOAD_TYPES.wrongNetwork:
    case LOAD_TYPES.notLogged:
      return (
                <Button
                    alwaysEnabled
                    handleButton={() => (isSameNetwork ? requestLogin() : requestConnect(params))}
                    title="Connect to wallet"
                    margin="0 0 0 20px"
                />
      )
    default:
      return (
                <>
                    <Button alwaysEnabled handleButton={handleModalShow} title="Install Metamask" margin="0 0 0 20px" />
                    <InstallMetamask modalShow={modalShow} setModalShow={handleModalShow} />
                </>
      )
  }
}

export default ConnectButton
