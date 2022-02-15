import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { AccordionIcon, LinkGroup } from '../../styles'

function AccordionLinks ({ children, headerLink, type }) {
  const [isOpen, setIsOpen] = useState(localStorage.getItem(type))

  const handleOpen = (state) => {
    if (state) {
      setIsOpen('0')
      localStorage.setItem(type, '0')
    } else {
      setIsOpen('')
      localStorage.setItem(type, '')
    }
  }
  return (
        <Accordion activeKey={isOpen} style={{ width: '240px' }} onSelect={handleOpen}>
            <LinkGroup>
                {headerLink}
                <Accordion.Toggle eventKey="0">
                    <AccordionIcon state={isOpen}>
                        <i className="mdi mdi-chevron-down" />
                    </AccordionIcon>
                </Accordion.Toggle>
            </LinkGroup>
            <Accordion.Collapse eventKey="0">{children}</Accordion.Collapse>
        </Accordion>
  )
}

export default AccordionLinks
