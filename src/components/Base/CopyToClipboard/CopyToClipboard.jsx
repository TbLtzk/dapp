import React, { useState } from 'react'
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard'
import Tooltip from '../Tooltip'

function CopyToClipboard ({ valueToCopy, children }) {
  const [copy, setCopy] = useState(false)

  const handleCopy = () => {
    setCopy(true)
    const timer = setTimeout(() => {
      setCopy(false)
      clearTimeout(timer)
    }, 3000)
  }

  return (
        <Tooltip additionalInfo={copy ? 'Copied!' : 'Copy'}>
            <Copy text={valueToCopy}>
                <span onClick={handleCopy} style={{ cursor: 'pointer', maxWidth: 'min-content' }}>
                    {children}
                </span>
            </Copy>
        </Tooltip>
  )
}

export default CopyToClipboard
