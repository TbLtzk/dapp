import React, { useState } from 'react'
import PropTypes from 'prop-types'

import AlertMessage from 'components/Base/AlertMessage'
import { ButtonCustom } from '../../Base/Buttons/Button/styles'

function ConnectMetaMaskButton (props) {
  const { title } = props
  const [alertShow, setAlertShow] = useState(false)
  const ethereum = window.ethereum

  const requestConnect = async () => {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{ chainId: '0x8A72', chainName: 'Q Dev net', rpcUrls: ['https://35.161.73.158:8545'], nativeCurrency: {
                name: 'Q',
                symbol: 'Q',
                decimals: 18,
              }}],
            })
            console.log('inside try/succesful add');
          } catch (addError) {
            console.log('couldnt add chain')
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
