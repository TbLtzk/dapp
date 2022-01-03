import React, { useState } from 'react'
import Tooltip from 'components/Base/Tooltip'
import { useAccordionToggle } from 'react-bootstrap'
import Button from 'components/Base/Buttons/Button'
import CopyToClipboard from 'react-copy-to-clipboard'

function CustomCardButtons ({ eventKey, shareText, open, setOpen = () => {}, onePage }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {})
  const [copy, setCopy] = useState(false)

  function handleOpen () {
    decoratedOnClick()
    setOpen()
  }

  const handleCopy = () => {
    setCopy(true)
    const timer = setTimeout(() => {
      setCopy(false)
      clearTimeout(timer)
    }, 3000)
  }

  return (
        <>
            <Tooltip copy={true} disabled={false} additionalInfo={`${copy ? 'Copied!' : 'Copy'}`}>
                <CopyToClipboard onCopy={handleCopy} text={shareText}>
                    <div>
                        <Button title="Share" icon="share" />
                    </div>
                </CopyToClipboard>
            </Tooltip>
            {onePage ? null : <div style={{ width: '20px' }} />}
            {onePage
              ? null
              : (
                <Button iconFontSize="16px" handleButton={handleOpen} icon={`chevron-${open ? 'up' : 'down'}`} />
                )}
        </>
  )
}

export default CustomCardButtons
