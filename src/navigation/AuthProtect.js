import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

import { detectEthereumProvider } from 'store/user-auth/action-creators'
import { getCheckIsUserRootNode } from 'store/root-node/action-creators'
import { userAddressMetamask } from 'store/user-inf/selectors'
import ErrorBoundary from 'components/Custom/ErrorBoundary'

export function AuthProtect (ProtectComponent, additionalProps = {}) {
  function ProtectRoute (props) {
    const ethereum = window.ethereum
    const dispatch = useDispatch()

    const userAddress = useSelector(userAddressMetamask)

    useEffect(() => {
      if (userAddress) {
        dispatch(getCheckIsUserRootNode(userAddress))
      }
    }, [userAddress, dispatch])

    useEffect(() => {
      if (ethereum) {
        ethereum.on('accountsChanged', function (accounts) {
          dispatch(detectEthereumProvider())
        })
      }
    }, [ethereum, dispatch])

    const prop = { ...props, ...additionalProps }
    if (!ethereum) {
      return (
        <ErrorBoundary>
          <Redirect to="/start-configurations">
            <ProtectComponent {...prop} />
          </Redirect>
        </ErrorBoundary>
      )
    } else {
      return (
        <ErrorBoundary>
          <ProtectComponent {...prop} />
        </ErrorBoundary>
      )
    }
  }
  return ProtectRoute
}
