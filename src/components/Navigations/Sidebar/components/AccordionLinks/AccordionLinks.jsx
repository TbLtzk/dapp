import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { AccordionIcon, LinkGroup } from '../../styles'

function AccordionLinks ({ children, headerLink }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
        <Accordion
            defaultActiveKey="0"
            style={{ width: '100%' }}
            onSelect={(state) => (state ? setIsOpen(true) : setIsOpen(false))}
        >
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
