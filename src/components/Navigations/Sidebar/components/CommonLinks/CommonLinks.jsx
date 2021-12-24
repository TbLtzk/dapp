import React from 'react'
import { AccordionLbl, LinkGroup, LinkStyle } from '../../styles'

function CommonLinks ({ linkTo, count = 0, linkTitle, onClick, highlight }) {
  return (
        <LinkGroup>
            <LinkStyle onClick={onClick} to={linkTo} className="nav-link" highlight={highlight}>
                {linkTitle}
            </LinkStyle>
            {count <= 0 ? null : <AccordionLbl highlight={highlight}>{count}</AccordionLbl>}
        </LinkGroup>
  )
}

export default CommonLinks
