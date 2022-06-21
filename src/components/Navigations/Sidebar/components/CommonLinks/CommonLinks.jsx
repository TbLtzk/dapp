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
        {count > 0 && <AccordionLbl activeClassName="highlight">{count}</AccordionLbl>}
      </LinkStyle>
    </LinkGroup>
  );
}

export default CommonLinks;
