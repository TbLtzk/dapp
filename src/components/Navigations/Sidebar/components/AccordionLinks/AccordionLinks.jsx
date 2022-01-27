import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { AccordionIcon, LinkGroup } from '../../styles'

function AccordionLinks ({ children, headerLink, type }) {
  const [isOpen, setIsOpen] = useState(localStorage.getItem(type) ? '' : '0')

  const handleOpen = (state) => {
    if (state) {
      setIsOpen('0')
      localStorage.setItem(type, '')
    } else {
      setIsOpen('')
      localStorage.setItem(type, '0')
    }
  }
  return (
        <Accordion activeKey={isOpen ? '0' : '1'} style={{ width: '100%' }} onSelect={handleOpen}>
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
