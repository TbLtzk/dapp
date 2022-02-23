import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { AccordionElementsWrapper } from './styles'

function AccordionElements ({ title, children, margin }) {
  const key = title.toLowerCase()

  const [isOpen, setIsOpen] = useState(localStorage.getItem(key) ? '' : '0')

  function handleSelect (state) {
    if (state) {
      setIsOpen('0')
      localStorage.setItem(key, '')
    } else {
      setIsOpen('')
      localStorage.setItem(key, '0')
    }
  }

  return (
        <AccordionElementsWrapper margin={margin} state={isOpen}>
            <Accordion defaultActiveKey={isOpen} style={{ width: '100%' }} onSelect={handleSelect}>
                <Accordion.Toggle eventKey="0">
                    <div className="accordion__header">
                        <div className="accordion__title">{title}</div>
                        <div className="accordion__icon">
                            <i className="mdi mdi-chevron-down" />
                        </div>
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <div>{children}</div>
                </Accordion.Collapse>
            </Accordion>
        </AccordionElementsWrapper>
  )
}

export default AccordionElements
