import React, { useState } from 'react'
import PropTypes from 'prop-types'

import AlertMessage from 'components/Base/AlertMessage'
import { ButtonCustom } from '../../Base/Buttons/Button/styles'

function ConnectMetaMaskButton (props) {
  const { title } = props
  const [alertShow, setAlertShow] = useState(false)
  const ethereum = window.ethereum

  const requestConnect = () => {
    setAlertShow(false)
    if (ethereum) {
      ethereum.request({ method: 'eth_requestAccounts' })
    } else {
      setAlertShow(true)
    }
  }

  return (
        <>
            <ButtonCustom
                type="white"
                title={title}
                onClick={requestConnect}
            >
              {title}
            </ButtonCustom>
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
