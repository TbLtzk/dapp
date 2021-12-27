import Button from 'components/Base/Buttons/Button'
import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/user-inf/selectors'

function CopyAddress () {
  const userAddress = useSelector(userAddressMetamask)
  const [copy, setCopy] = useState(false)

  function handleCopy () {
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 3000)
  }

  return (
        <CopyToClipboard text={userAddress}>
            <span title={userAddress}>
                <Button
                    width="100%"
                    type="white"
                    title={copy ? 'Copied!' : userAddress}
                    icon="content-copy"
                    handleButton={handleCopy}
                />
            </span>
        </CopyToClipboard>
  )
}

export default CopyAddress
