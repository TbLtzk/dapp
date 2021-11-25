import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ListCardWrp, ListCardHeader, ListCardBody } from './styles'
import { Accordion, useAccordionToggle } from 'react-bootstrap'

import { theme } from 'store/theme/selectors'
import Button from 'components/Base/Buttons/Button'
import Tooltip from 'components/Base/Tooltip'

function CustomButtons ({ eventKey, shareText }) {
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
            <Tooltip additionalInfo={`${copy ? 'Copied!' : 'Copy'}`}>
                <Button handleButton={handleCopy} title="Share" icon="share" margin="0 20px 0 0" />
            </Tooltip>
            <Button iconFontSize="16px" handleButton={handleOpen} icon={`chevron-${open ? 'up' : 'down'}`} />
        </>
  )
}

function ListCard ({ headerLeftSide, id, content, collapsedContent, shareText }) {
  const currentTheme = useSelector(theme)

  return (
        <ListCardWrp palette={currentTheme}>
            <Accordion defaultActiveKey="0">
                <ListCardHeader>
                    <div>{headerLeftSide}</div>
                    <div>
                        <CustomButtons shareText={shareText} eventKey={id} />
                    </div>
                </ListCardHeader>
                <ListCardBody>
                    {content}
                    <Accordion.Collapse eventKey={id}>{collapsedContent}</Accordion.Collapse>
                </ListCardBody>
            </Accordion>
        </ListCardWrp>
  )
}

export default ListCard
