import React, { useEffect, useState, useCallback } from 'react'

import { initAddresses } from 'contracts/mapping/contract-to-address'

import LoadingSpinner from 'components/Base/LoadingSpinner'

import { WrapContainer } from './styles'
import { getContractRegistryInstance, initGovernenceInstances } from 'contracts/contract-instance'

const STATES = {
  loading: 'loading',
  error: 'error',
  loaded: 'loaded'
}

function InitApp () {
  const [appState, setAppState] = useState(STATES.loading)
  const [errorMessage] = useState("Can't load addresses. Please reload app")
  const [appComponent, setAppComponent] = useState({})

  useEffect(async () => {
    try {
      await Promise.all([getContractRegistryInstance(), initAddresses(), initGovernenceInstances()])
      setAppComponent(await import('components/Base/App'))
      setAppState(STATES.loaded)
    } catch (e) {
      console.error(e)
      setAppState(STATES.error)
    }
  }, [])

  const accountHandler = useCallback(() => {
    switch (appState) {
      case STATES.loaded:
        return appComponent.default()
      case 'error':
        return <WrapContainer>{errorMessage}</WrapContainer>
      case 'loading':
        return (
                    <WrapContainer>
                        <LoadingSpinner />
                    </WrapContainer>
        )
      default:
        return (
                    <WrapContainer>
                        <LoadingSpinner />
                    </WrapContainer>
        )
    }
  }, [appState])

  return <>{accountHandler()}</>
}

export default InitApp
