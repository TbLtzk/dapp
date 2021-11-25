import React, { useState } from 'react'
import Tooltip from 'components/Base/Tooltip'
import { useAccordionToggle } from 'react-bootstrap'
import Button from 'components/Base/Buttons/Button'

function CustomHeaderButtons ({ eventKey, shareText }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {})
  const [copy, setCopy] = useState(false)
  const [open, setOpen] = useState(false)

  function handleOpen () {
    decoratedOnClick()
    setOpen(!open)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopy(true)
    const timer = setTimeout(() => {
      setCopy(false)
      clearTimeout(timer)
    }, 3000)
  }

  return (
        <>
            <Tooltip copy={true} disabled={false} additionalInfo={`${copy ? 'Copied!' : 'Copy'}`}>
                <Button handleButton={handleCopy} title="Share" icon="share" margin="0 20px 0 0" />
            </Tooltip>
            <Button iconFontSize="16px" handleButton={handleOpen} icon={`chevron-${open ? 'up' : 'down'}`} />
        </>
  )
}

export default CustomHeaderButtons
