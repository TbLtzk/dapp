import React from 'react';

import { AccordionLbl, LinkGroup, LinkStyle } from '../../styles';

function CommonLinks ({
  linkTo,
  count = 0,
  linkTitle,
  type,
  exact = true
}) {
  return (
    <LinkGroup>
      <LinkStyle
        exact={exact}
        activeClassName={type === 'accordion' ? null : 'highlight'}
        to={linkTo}
      >
        {linkTitle}
      </LinkStyle>
      {count <= 0 ? null : <AccordionLbl activeClassName="highlight">{count}</AccordionLbl>}
    </LinkGroup>
  );
}

export default CommonLinks;
