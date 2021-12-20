import React, { useState } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard'
import colors from 'constants/colors'

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
        <OverlayTrigger
            key="top"
            placement="top"
            overlay={
                <Popover id="popover-basic">
                    <Popover.Content
                        style={{
                          background: colors.neonGreen
                        }}
                    >
                        {copy ? 'Copied!' : 'Copy'}
                    </Popover.Content>
                </Popover>
            }
        >
            <Copy text={valueToCopy}>
                <span onClick={handleCopy} style={{ cursor: 'pointer' }}>
                    {children}
                </span>
            </Copy>
        </OverlayTrigger>
  )
}

export default CopyToClipboard
