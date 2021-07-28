import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Base/Buttons/Button'
import AlertMessage from 'components/Base/AlertMessage'

function ConnectMetaMaskButton (props) {
  const { title } = props
  const [alertShow, setAlertShow] = useState(false)
  const ethereum = window.ethereum

  const requestConnect = () => {
    // console.log('ethereum', ethereum);
    setAlertShow(false)
    if (ethereum) {
      ethereum.request({ method: 'eth_requestAccounts' })
    } else {
      setAlertShow(true)
    }
  }

  return (
        <>
            <Button
                type="white"
                title={title}
                handleButton={requestConnect}
            />
            <AlertMessage
                type="danger"
                header="Error"
                content="Install MetaMask"
                show={alertShow}
                onClose={() => {
                  setAlertShow(false)
                }}
            />
        </>
  )
}

ConnectMetaMaskButton.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  handleButton: PropTypes.func
}

ConnectMetaMaskButton.defaultProps = {
  type: 'danger'
}

export default ConnectMetaMaskButton
