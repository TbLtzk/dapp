import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

import { detectEthereumProvider } from 'store/user-auth/action-creators'
import { getCheckIsUserRootNode } from 'store/root-node/action-creators'
import { userAddressMetamask } from 'store/user-inf/selectors'

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
    }, [ethereum])

    const prop = { ...props, ...additionalProps }
    if (!ethereum) {
      return <Redirect
        to="/start-configurations"
      >
        <ProtectComponent {...prop} />
      </Redirect>
    } else {
      return <ProtectComponent {...prop} />
    }
  }

  return ProtectRoute
}
