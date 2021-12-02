import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setUserAddress } from 'store/user-inf/action-creators'

import LoadingSpinner from 'components/Base/LoadingSpinner'

import { WrapContainer } from './styles'

const STATES = {
  loading: 'loading',
  error: 'error',
  loaded: 'loaded'
}

function LoadingAccount ({ children }) {
  const [loadingStatus, setLoadingStatus] = useState(STATES.loading)
  const [errorMessage] = useState("Can't load account data. Please reload app")

  const dispatch = useDispatch()

  useEffect(() => {
    handleLoadAccount()
  }, [])

  async function handleLoadAccount () {
    try {
      const accounts = await window.web3.eth.getAccounts()
      const addressId = accounts[0]
      dispatch(setUserAddress(addressId))
      setLoadingStatus(STATES.loaded)
    } catch (e) {
      console.error(e)
      setLoadingStatus(STATES.error)
    }
  }

  const accountHandler = useCallback(() => {
    switch (loadingStatus) {
      case STATES.loaded:
        return children
      case STATES.loading:
        return (
                    <WrapContainer>
                        <LoadingSpinner />
                    </WrapContainer>
        )
      case 'error':
        return <WrapContainer>{errorMessage}</WrapContainer>
      default:
        return (
                    <WrapContainer>
                        <LoadingSpinner />
                    </WrapContainer>
        )
    }
  }, [loadingStatus])

  return accountHandler()
}

export default LoadingAccount
