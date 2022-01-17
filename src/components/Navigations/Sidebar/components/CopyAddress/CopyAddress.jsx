import Button from 'components/Base/Buttons/Button'
import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSelector } from 'react-redux'
import { networkSelector, userAddressMetamask } from 'store/user-inf/selectors'
import { CopyAddressContainer } from '../../styles'

const networks = { 35443: 'Testnet', 35442: 'Devnet', 35441: 'Mainnet' }

function CopyAddress () {
  const userAddress = useSelector(userAddressMetamask)
  const network = useSelector(networkSelector)

  const [copy, setCopy] = useState(false)

  function handleCopy () {
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 3000)
  }

  const title = (
        <CopyAddressContainer>
            {copy
              ? (
                <span className="copied">
                    <i className="mdi mdi-content-copy" /> Copied!
                </span>
                )
              : (
                <span>
                    <i className="mdi mdi-content-copy" /> {userAddress.substring(0, 22) + '...'}
                </span>
                )}
            <span className="network">{networks[network]}</span>
        </CopyAddressContainer>
  )

  return (
        <CopyToClipboard text={userAddress}>
            <div title={userAddress}>
                <Button icon="copy" width="100%" type="white" title={title} handleButton={handleCopy} />
            </div>
        </CopyToClipboard>
  )
}

export default CopyAddress
