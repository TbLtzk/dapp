import React, { useState } from 'react'
import PropTypes from 'prop-types'

import AlertMessage from 'components/Base/AlertMessage'
import { ButtonCustom } from '../../Base/Buttons/Button/styles'

function ConnectMetaMaskButton (props) {
  const { title } = props
  const [alertShow, setAlertShow] = useState(false)
  const { ethereum } = window

  const requestConnect = async () => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x8a73' }]
      })
    } catch (error) {
      if (error.code === 4902) {
        try {
          const chain = {
            chainId: '0x8a73',
            chainName: 'Q testnet',
            rpcUrls: ['https://rpc.qtestnet.org'],
            nativeCurrency: {
              name: 'Q ',
              symbol: 'Q ',
              decimals: 18
            }
          }

          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [chain]
          })
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
  return (
        <>
            <ButtonCustom type="white" title={title} onClick={requestConnect}>
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
